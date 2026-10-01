import { useEffect, useState } from 'react';
import { content } from './content';
import { ProgressRail } from './components';
import Home from './sections/Home';
import Who from './sections/Who';
import Work from './sections/Work';
import Craft from './sections/Craft';
import Record from './sections/Record';
import Honours from './sections/Honours';
import Contact from './sections/Contact';

function MotionController({
  onActiveChange,
}: {
  onActiveChange: (id: string) => void;
}) {
  useEffect(() => {
    document.title = content.meta.title;
    let description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.append(description);
    }
    description.content = content.meta.description;

    const sectionNodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-section]'),
    );
    const revealNodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    );
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reduced || !('IntersectionObserver' in window)) {
      sectionNodes.forEach((node) => node.classList.add('revealed'));
      revealNodes.forEach((node) => node.classList.add('revealed'));
      return undefined;
    }

    document.documentElement.classList.add('app-ready');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -28px 0px' },
    );
    sectionNodes.forEach((node) => revealObserver.observe(node));
    revealNodes.forEach((node, index) => {
      node.style.setProperty('--reveal-delay', `${(index % 4) * 55}ms`);
      revealObserver.observe(node);
    });

    const activeObserver = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (left, right) =>
              left.boundingClientRect.top - right.boundingClientRect.top,
          )[0];
        if (current) onActiveChange((current.target as HTMLElement).id);
      },
      { rootMargin: '-18% 0px -65% 0px', threshold: 0 },
    );
    sectionNodes.forEach((node) => activeObserver.observe(node));

    return () => {
      revealObserver.disconnect();
      activeObserver.disconnect();
      document.documentElement.classList.remove('app-ready');
    };
  }, [onActiveChange]);

  return null;
}

export default function App() {
  const [activeId, setActiveId] = useState<string>(content.home.id);

  return (
    <div className='portfolio-app'>
      <MotionController onActiveChange={setActiveId} />
      <ProgressRail activeId={activeId} />
      <main>
        <Home />
        <Who />
        <Work />
        <Craft />
        <Record />
        <Honours />
        <Contact />
      </main>
    </div>
  );
}
