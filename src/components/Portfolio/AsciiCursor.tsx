'use client';

import { useEffect, useRef } from 'react';

const GLYPHS = ['>', '_', '/', '+', '*', ':', '0', '1', '{', '}'];

export default function AsciiCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!cursor || !finePointer.matches || reducedMotion.matches) return;

    const root = document.documentElement;
    const trail = Array.from(
      cursor.querySelectorAll<HTMLElement>('[data-trail]'),
    );
    root.classList.add('ascii-cursor-active');

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      cursor.style.setProperty('--cursor-x', `${event.clientX}px`);
      cursor.style.setProperty('--cursor-y', `${event.clientY}px`);
      cursor.classList.add('is-visible');

      trail.forEach((glyph, index) => {
        const distance = index + 1;
        const direction = distance % 2 === 0 ? 1 : -1;
        glyph.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        glyph.style.transform = `translate3d(${-distance * 9}px, ${direction * distance * 3}px, 0)`;
        glyph.style.opacity = String(Math.max(0.12, 0.58 - index * 0.08));
      });

      cursor.classList.toggle(
        'is-interactive',
        event.target instanceof Element &&
          Boolean(event.target.closest('a, button, [role="button"]')),
      );
    };
    const handleLeave = () => cursor.classList.remove('is-visible');

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handleLeave);

    return () => {
      root.classList.remove('ascii-cursor-active');
      window.removeEventListener('pointermove', handleMove);
      document.documentElement.removeEventListener('pointerleave', handleLeave);
    };
  }, []);

  return (
    <div className='ascii-cursor' aria-hidden='true' ref={cursorRef}>
      <span className='ascii-cursor-glyph ascii-cursor-core'>&gt;</span>
      <span className='ascii-cursor-glyph' data-trail />
      <span className='ascii-cursor-glyph' data-trail />
      <span className='ascii-cursor-glyph' data-trail />
      <span className='ascii-cursor-glyph' data-trail />
    </div>
  );
}
