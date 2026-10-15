'use client';

import { useEffect, useState } from 'react';

/**
 * A reserve-a-seat bar pinned to the bottom of the screen on phones.
 *
 * Most of an ad's traffic arrives on a phone and reads the page top to
 * bottom; the form is a long scroll away, and a button that is always in
 * reach is the cheapest conversion on the page. It steps aside while the form
 * itself is on screen, where it would only cover the thing it points to.
 */
export function StickyCta({ label }: { label: string }) {
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const form = document.getElementById('register');
    if (!form) return;
    const io = new IntersectionObserver(([e]) => setFormInView(e.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(form);
    return () => io.disconnect();
  }, []);

  if (formInView) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--glass-border-soft)] bg-white/90 p-3 backdrop-blur md:hidden">
      <a href="#register" className="btn-lime w-full">
        {label}
      </a>
    </div>
  );
}
