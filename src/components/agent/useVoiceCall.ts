'use client';

import { useCallback, useRef, useState } from 'react';
import { spellNumbersForSpeech } from './speech';

/**
 * Browser side of the voice channel.
 *
 * Design note — the realtime model is deliberately kept as EARS AND A MOUTH
 * ONLY. It is configured with `create_response: false`, so it never answers on
 * its own. The loop is:
 *
 *   mic → realtime transcribes the visitor
 *       → we send that text to /api/agent/answer (the same core the text chat
 *         uses, grounded in the knowledge base)
 *       → we hand the answer back as `response.create` instructions and the
 *         model simply speaks it
 *
 * That makes it impossible for the spoken answer to drift from the knowledge
 * base, and keeps voice and text answers identical.
 */

export type CallStatus = 'idle' | 'connecting' | 'live' | 'thinking' | 'error';

export interface Transcript {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Spoken the moment the call connects. Browsers block autoplay audio, so this
 * is the earliest a visitor can actually hear her — pressing the call button
 * IS the gesture that unlocks it.
 */
const GREETING: Record<string, string> = {
  ar: 'أهلا وسهلا فيك! أنا ليلى، مساعدة عبدالرحيم السقا. تفضّل، كيف بقدر أساعدك؟',
  en: "Welcome! I'm Zyn, Abdulraheem Alsaka's assistant. How can I help you?",
};

/** Short interjections we should not treat as questions. */
const FILLERS = ['اه', 'آه', 'ام', 'مم', 'همم', 'اها', 'ها', 'هم', 'ايه', 'أه', 'uh', 'um', 'hmm', 'ok'];

export function useVoiceCall(locale: string) {
  const [status, setStatus] = useState<CallStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  /** The model's outgoing audio — the avatar analyses this to move its mouth. */
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);

  /** True while the assistant is thinking or speaking — we ignore mic input then,
   *  otherwise its own voice echoes back in as a new "question". */
  const busyRef = useRef(false);
  /** Responses WE asked for, so we can cancel any the model starts by itself. */
  const pendingCreatesRef = useRef(0);

  const hangUp = useCallback(() => {
    dcRef.current?.close();
    dcRef.current = null;

    pcRef.current?.getSenders().forEach((s) => s.track?.stop());
    pcRef.current?.close();
    pcRef.current = null;

    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;

    if (audioRef.current) {
      audioRef.current.srcObject = null;
      audioRef.current.remove();
      audioRef.current = null;
    }

    busyRef.current = false;
    pendingCreatesRef.current = 0;
    setRemoteStream(null);
    setStatus('idle');
  }, []);

  /** Ask the model to speak a specific piece of text, verbatim. */
  const speak = useCallback(
    (text: string) => {
      const dc = dcRef.current;
      if (!dc || dc.readyState !== 'open') return;

      // Digits read right on screen and wrong in the ear — see speech.ts.
      const spoken = spellNumbersForSpeech(text, locale);

      pendingCreatesRef.current += 1;
      busyRef.current = true;
      dc.send(
        JSON.stringify({
          type: 'response.create',
          response: {
            instructions: `Say exactly this, naturally and without adding anything: ${spoken}`,
          },
        })
      );
    },
    [locale]
  );

  /** Visitor asked something — resolve it against the knowledge core, then speak it. */
  const handleQuestion = useCallback(
    async (question: string) => {
      setStatus('thinking');
      setTranscripts((t) => [...t, { role: 'user', content: question }]);

      let answer =
        locale === 'ar'
          ? 'ما قدرت أجيب المعلومة حالياً. جرّب مرة ثانية.'
          : "I couldn't retrieve that just now. Please try again.";

      try {
        const res = await fetch('/api/agent/answer', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ question, locale }),
        });
        const data = (await res.json()) as { ok?: boolean; answer?: string };
        if (data.ok && data.answer) answer = data.answer;
      } catch {
        /* keep the fallback */
      }

      setTranscripts((t) => [...t, { role: 'assistant', content: answer }]);
      setStatus('live');
      speak(answer);
    },
    [locale, speak]
  );

  const onServerEvent = useCallback(
    (event: MessageEvent) => {
      let msg: Record<string, unknown>;
      try {
        msg = JSON.parse(event.data as string);
      } catch {
        return;
      }

      switch (msg.type) {
        case 'conversation.item.input_audio_transcription.completed': {
          const q = String(msg.transcript ?? '').trim();
          // Ignore anything heard while the assistant is talking — that's echo.
          if (busyRef.current) return;
          const letters = q.replace(/[^\p{L}\p{N}]/gu, '');
          if (letters.length < 3 || FILLERS.includes(letters.toLowerCase())) return;
          void handleQuestion(q);
          break;
        }

        case 'response.created':
          if (pendingCreatesRef.current > 0) {
            pendingCreatesRef.current -= 1;
          } else {
            // The model tried to answer by itself — kill it, the knowledge core
            // is the only allowed source.
            dcRef.current?.send(
              JSON.stringify({
                type: 'response.cancel',
                response_id: (msg.response as { id?: string } | undefined)?.id,
              })
            );
          }
          break;

        case 'response.done':
          busyRef.current = false;
          break;

        case 'error':
          console.error('[voice] realtime error', msg);
          busyRef.current = false;
          break;
      }
    },
    [handleQuestion]
  );

  const call = useCallback(async () => {
    setError(null);
    setTranscripts([]);
    setStatus('connecting');

    try {
      const sessionRes = await fetch('/api/agent/session', { method: 'POST' });
      const session = (await sessionRes.json()) as {
        ok?: boolean;
        token?: string;
        voice?: string;
      };
      if (!session.ok || !session.token) throw new Error('session');

      const mic = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      streamRef.current = mic;

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      const audio = document.createElement('audio');
      audio.autoplay = true;
      audioRef.current = audio;
      pc.ontrack = (e) => {
        audio.srcObject = e.streams[0];
        setRemoteStream(e.streams[0]);
      };

      mic.getTracks().forEach((t) => pc.addTrack(t, mic));

      const dc = pc.createDataChannel('oai-events');
      dcRef.current = dc;

      dc.onopen = () => {
        dc.send(
          JSON.stringify({
            type: 'session.update',
            session: {
              type: 'realtime',
              instructions:
                'You are a voice interface only. Never answer from your own knowledge. ' +
                'Only speak text you are explicitly given in response instructions.',
              audio: {
                output: { voice: session.voice ?? 'marin' },
                input: {
                  transcription: {
                    model: 'gpt-transcribe',
                    language: locale === 'ar' ? 'ar' : 'en',
                  },
                  turn_detection: {
                    type: 'server_vad',
                    threshold: 0.8,
                    prefix_padding_ms: 300,
                    silence_duration_ms: 900,
                    create_response: false,
                    interrupt_response: false,
                  },
                },
              },
            },
          })
        );

        const hello = GREETING[locale === 'ar' ? 'ar' : 'en'];
        setTranscripts((t) => [...t, { role: 'assistant', content: hello }]);
        speak(hello);
      };
      dc.onmessage = onServerEvent;

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const callRes = await fetch('https://api.openai.com/v1/realtime/calls', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${session.token}`,
          'content-type': 'application/sdp',
        },
        body: offer.sdp,
      });
      if (!callRes.ok) throw new Error(`calls ${callRes.status}`);

      await pc.setRemoteDescription({ type: 'answer', sdp: await callRes.text() });
      setStatus('live');
    } catch (err) {
      console.error('[voice] could not start call:', err);
      const denied = err instanceof DOMException && err.name === 'NotAllowedError';
      hangUp();
      setError(denied ? 'mic_denied' : 'connect_failed');
      setStatus('error');
    }
  }, [locale, hangUp, onServerEvent, speak]);

  return { status, error, transcripts, remoteStream, call, hangUp };
}
