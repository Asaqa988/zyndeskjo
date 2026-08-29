'use client';

import { useCallback, useRef, useState } from 'react';

/**
 * Browser side of the voice channel.
 *
 * Flow:
 *   1. ask our server for a short-lived realtime token
 *   2. open a WebRTC peer connection straight to OpenAI with that token
 *   3. stream the microphone up, play the model's audio back
 *   4. when the model calls `answer_from_knowledge`, resolve it against
 *      /api/agent/answer and hand the result back over the data channel
 *
 * The model never answers from its own weights — step 4 is where every real
 * answer comes from, which is what keeps voice and text consistent.
 */

export type CallStatus = 'idle' | 'connecting' | 'live' | 'error';

export interface Transcript {
  role: 'user' | 'assistant';
  content: string;
}

export function useVoiceCall(locale: string) {
  const [status, setStatus] = useState<CallStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const channelRef = useRef<RTCDataChannel | null>(null);

  const hangUp = useCallback(() => {
    channelRef.current?.close();
    channelRef.current = null;

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
    setStatus('idle');
  }, []);

  /** Resolve the model's tool call against our own answering core. */
  const resolveToolCall = useCallback(
    async (channel: RTCDataChannel, callId: string, rawArgs: string) => {
      let question = '';
      try {
        question = (JSON.parse(rawArgs) as { question?: string }).question ?? '';
      } catch {
        /* malformed args — fall through with an empty question */
      }

      let answer =
        locale === 'ar'
          ? 'ما قدرت أجيب المعلومة حالياً. جرّب تسأل مرة ثانية أو تواصل معنا من صفحة الاتصال.'
          : "I couldn't retrieve that just now. Please try again or use the contact page.";

      try {
        const res = await fetch('/api/agent/answer', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ question, locale }),
        });
        const data = (await res.json()) as { ok?: boolean; answer?: string };
        if (data.ok && data.answer) answer = data.answer;
      } catch {
        /* keep the fallback answer */
      }

      if (channel.readyState !== 'open') return;
      channel.send(
        JSON.stringify({
          type: 'conversation.item.create',
          item: { type: 'function_call_output', call_id: callId, output: answer },
        })
      );
      // Tell the model to speak the tool result.
      channel.send(JSON.stringify({ type: 'response.create' }));
    },
    [locale]
  );

  const call = useCallback(async () => {
    setError(null);
    setTranscripts([]);
    setStatus('connecting');

    try {
      const sessionRes = await fetch('/api/agent/session', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ locale }),
      });
      const session = (await sessionRes.json()) as {
        ok?: boolean;
        token?: string;
        model?: string;
      };
      if (!session.ok || !session.token) throw new Error('session');

      const mic = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = mic;

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // Play whatever the model speaks.
      const audio = document.createElement('audio');
      audio.autoplay = true;
      audioRef.current = audio;
      pc.ontrack = (event) => {
        audio.srcObject = event.streams[0];
      };

      mic.getTracks().forEach((track) => pc.addTrack(track, mic));

      const channel = pc.createDataChannel('oai-events');
      channelRef.current = channel;

      channel.addEventListener('message', (event) => {
        let msg: Record<string, unknown>;
        try {
          msg = JSON.parse(event.data as string);
        } catch {
          return;
        }

        switch (msg.type) {
          case 'response.function_call_arguments.done':
            void resolveToolCall(
              channel,
              String(msg.call_id ?? ''),
              String(msg.arguments ?? '{}')
            );
            break;

          // What the visitor said.
          case 'conversation.item.input_audio_transcription.completed': {
            const text = String(msg.transcript ?? '').trim();
            if (text) setTranscripts((t) => [...t, { role: 'user', content: text }]);
            break;
          }

          // What the assistant said.
          case 'response.audio_transcript.done': {
            const text = String(msg.transcript ?? '').trim();
            if (text) setTranscripts((t) => [...t, { role: 'assistant', content: text }]);
            break;
          }

          case 'error':
            console.error('[voice] realtime error', msg);
            break;
        }
      });

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const model = session.model ?? 'gpt-realtime-2.1';
      const sdpRes = await fetch(
        `https://api.openai.com/v1/realtime?model=${encodeURIComponent(model)}`,
        {
          method: 'POST',
          body: offer.sdp,
          headers: {
            authorization: `Bearer ${session.token}`,
            'content-type': 'application/sdp',
          },
        }
      );
      if (!sdpRes.ok) throw new Error('sdp');

      await pc.setRemoteDescription({ type: 'answer', sdp: await sdpRes.text() });
      setStatus('live');
    } catch (err) {
      console.error('[voice] could not start call:', err);
      const denied = err instanceof DOMException && err.name === 'NotAllowedError';
      setError(denied ? 'mic_denied' : 'connect_failed');
      setStatus('error');
      hangUp();
      setStatus('error');
    }
  }, [locale, hangUp, resolveToolCall]);

  return { status, error, transcripts, call, hangUp };
}
