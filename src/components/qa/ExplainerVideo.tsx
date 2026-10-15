'use client';

import { useRef } from 'react';
import { fbqTrack } from '@/lib/metaPixel';

/**
 * The course explainer, played in place.
 *
 * It does not autoplay: browsers mute or block autoplay with sound, and a
 * silent explainer is not the one that was made. `preload="metadata"` keeps
 * the 7 MB file off the visitor's mobile data until they press play, and the
 * poster stands in until then. The first play is reported to Meta once, so the
 * campaign can tell who actually watched from who only scrolled past.
 */
export function ExplainerVideo({ label }: { label: string }) {
  const reported = useRef(false);

  return (
    <div className="glass overflow-hidden rounded-glass p-2 sm:p-3">
      <video
        className="aspect-video w-full rounded-[18px] bg-black"
        controls
        playsInline
        preload="metadata"
        poster="/media/qa-course-explainer-poster.jpg"
        aria-label={label}
        onPlay={() => {
          if (reported.current) return;
          reported.current = true;
          fbqTrack('ViewContent', { content_name: 'qa-course-explainer' });
        }}
      >
        <source src="/media/qa-course-explainer.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
