'use client';

import { useEffect, useRef } from 'react';
import './LetterGlitch.css';

const FALLBACK = { r: 255, g: 184, b: 239 };
const DEFAULT_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789';

function parseHex(hex) {
  if (typeof hex !== 'string') return null;
  const shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const expanded = hex.replace(shorthand, (_, red, green, blue) => red + red + green + green + blue + blue);
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(expanded);
  return match
    ? { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16) }
    : null;
}

const mix = (from, to, amount) => ({
  r: Math.round(from.r + (to.r - from.r) * amount),
  g: Math.round(from.g + (to.g - from.g) * amount),
  b: Math.round(from.b + (to.b - from.b) * amount),
});

export default function LetterGlitch({
  glitchColors = ['#f4b8ef', '#ff7ad9', '#ff66eb'],
  className = '',
  glitchSpeed = 80,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  lightMode = false,
  backgroundColor = 'transparent',
  characters = DEFAULT_CHARACTERS,
  style = {},
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const context = canvas?.getContext('2d');
    if (!canvas || !parent || !context) return undefined;

    const charList = Array.from(characters || DEFAULT_CHARACTERS);
    const colorList = (glitchColors || []).map(parseHex).filter(Boolean);
    const colors = colorList.length ? colorList : [FALLBACK];
    const charWidth = 10;
    const charHeight = 20;
    const fontSize = 15;
    let columns = 0;
    let rows = 0;
    let letters = [];
    let frame = 0;
    let lastGlitch = 0;
    let inView = true;
    let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let disposed = false;

    const randomChar = () => charList[Math.floor(Math.random() * charList.length)] || '·';
    const randomColor = () => colors[Math.floor(Math.random() * colors.length)] || FALLBACK;
    const asCss = (rgb) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

    function draw() {
      if (!context || !canvas) return;
      const rect = parent.getBoundingClientRect();
      context.clearRect(0, 0, rect.width, rect.height);
      context.font = `${fontSize}px ui-monospace, monospace`;
      context.textBaseline = 'top';
      letters.forEach((letter, index) => {
        context.fillStyle = asCss(letter.rgb);
        context.fillText(letter.char, (index % columns) * charWidth, Math.floor(index / columns) * charHeight);
      });
    }

    function resize() {
      const rect = parent.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(rect.width * ratio));
      canvas.height = Math.max(1, Math.round(rect.height * ratio));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      columns = Math.max(1, Math.ceil(rect.width / charWidth));
      rows = Math.max(1, Math.ceil(rect.height / charHeight));
      letters = Array.from({ length: columns * rows }, () => {
        const color = randomColor();
        return { char: randomChar(), rgb: color, from: color, to: color, progress: 1 };
      });
      draw();
    }

    function scramble() {
      const count = Math.max(1, Math.floor(letters.length * 0.018));
      for (let index = 0; index < count; index += 1) {
        const letter = letters[Math.floor(Math.random() * letters.length)];
        if (!letter) continue;
        letter.char = randomChar();
        letter.from = letter.rgb;
        letter.to = randomColor();
        letter.progress = smooth && !reducedMotion ? 0 : 1;
        if (letter.progress === 1) letter.rgb = letter.to;
      }
    }

    function tick(time) {
      frame = 0;
      if (disposed || reducedMotion || !inView || document.hidden) return;
      let redraw = false;
      if (time - lastGlitch >= Math.max(40, glitchSpeed)) {
        scramble();
        lastGlitch = time;
        redraw = true;
      }
      if (smooth) {
        letters.forEach((letter) => {
          if (letter.progress < 1) {
            letter.progress = Math.min(1, letter.progress + 0.13);
            letter.rgb = mix(letter.from, letter.to, letter.progress);
            redraw = true;
          }
        });
      }
      if (redraw) draw();
      frame = requestAnimationFrame(tick);
    }

    function start() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      if (!reducedMotion && inView && !document.hidden) {
        frame = requestAnimationFrame(tick);
      } else {
        draw();
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotion = () => {
      reducedMotion = media.matches;
      start();
    };
    const handleVisibility = () => start();
    const resizeObserver = new ResizeObserver(resize);

    resize();
    observer.observe(parent);
    resizeObserver.observe(parent);
    media.addEventListener('change', handleMotion);
    document.addEventListener('visibilitychange', handleVisibility);
    start();

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      media.removeEventListener('change', handleMotion);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [characters, glitchColors, glitchSpeed, smooth]);

  return (
    <div
      className={`letter-glitch ${className}`}
      style={{ backgroundColor: backgroundColor || (lightMode ? '#fff' : '#000'), ...style }}
    >
      <canvas ref={canvasRef} className="letter-glitch-canvas" aria-hidden="true" />
      {outerVignette && <span className={`letter-glitch-vignette${lightMode ? ' is-light' : ''}`} />}
      {centerVignette && <span className={`letter-glitch-center${lightMode ? ' is-light' : ''}`} />}
    </div>
  );
}
