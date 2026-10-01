import { ArrowDown } from 'lucide-react';
import { content, sections } from './content';

const cornerPath =
  'M2 62V18Q2 2 18 2h44M9 49V20Q9 9 20 9h28M2 35q16 0 16-17M22 2q0 15 15 15M32 2q0 8 8 8';

export function Plate({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <figure className={`plate ${className}`}>
      <img className='plate-image' src={src} alt={alt} loading='lazy' />
      <svg
        className='plate-corners'
        viewBox='0 0 64 64'
        aria-hidden='true'
        focusable='false'
      >
        <path className='corner top-left' d={cornerPath} />
        <path
          className='corner top-right'
          transform='translate(64 0) scale(-1 1)'
          d={cornerPath}
        />
        <path
          className='corner bottom-left'
          transform='translate(0 64) scale(1 -1)'
          d={cornerPath}
        />
        <path
          className='corner bottom-right'
          transform='translate(64 64) scale(-1 -1)'
          d={cornerPath}
        />
      </svg>
    </figure>
  );
}

export function GhostPhoto({
  src,
  className = '',
}: {
  src: string;
  className?: string;
}) {
  return (
    <img
      className={`section-ghost ${className}`}
      src={src}
      alt=''
      aria-hidden='true'
      loading='lazy'
    />
  );
}

export function NextPill({
  href,
  label,
  prefix = content.labels.next,
}: {
  href: string;
  label: string;
  prefix?: string;
}) {
  return (
    <a className='next-pill' href={href}>
      <span className='next-prefix'>{prefix}</span>
      <span className='next-label'>{label}</span>
      <ArrowDown size={14} strokeWidth={1.5} aria-hidden='true' />
    </a>
  );
}

export function ProgressRail({ activeId }: { activeId: string }) {
  return (
    <nav className='progress-rail' aria-label={content.labels.progress}>
      {sections.map((section) => (
        <a
          className={`progress-diamond${section.id === activeId ? 'active' : ''}`}
          href={`#${section.id}`}
          key={section.id}
          title={section.label}
          aria-label={section.label}
          aria-current={section.id === activeId ? 'location' : undefined}
        >
          <span />
        </a>
      ))}
    </nav>
  );
}

export function Sigil({ craft }: { craft: typeof content.craft }) {
  return (
    <figure className='sigil-figure'>
      <svg
        className='sigil'
        viewBox='0 0 360 360'
        role='img'
        aria-label={craft.sigil.alt}
      >
        <defs>
          <path
            id='sigil-type-ring'
            d='M180 180m-152 0a152 152 0 1 1 304 0a152 152 0 1 1-304 0'
          />
        </defs>
        <circle className='sigil-ring' cx='180' cy='180' r='152' />
        <g className='sigil-loops'>
          <path
            className='sigil-loop'
            d='M180 43C270 90 275 142 180 219 85 142 90 90 180 43Z'
          />
          <path
            className='sigil-loop'
            transform='rotate(120 180 180)'
            d='M180 43C270 90 275 142 180 219 85 142 90 90 180 43Z'
          />
          <path
            className='sigil-loop'
            transform='rotate(240 180 180)'
            d='M180 43C270 90 275 142 180 219 85 142 90 90 180 43Z'
          />
        </g>
        <circle className='sigil-orbit-dot' cx='180' cy='28' r='4' />
        <text className='sigil-label' textAnchor='middle'>
          <textPath href='#sigil-type-ring' startOffset='9%'>
            {craft.sigil.rings[0]}
          </textPath>
        </text>
        <text className='sigil-label' textAnchor='middle'>
          <textPath href='#sigil-type-ring' startOffset='43%'>
            {craft.sigil.rings[1]}
          </textPath>
        </text>
        <text className='sigil-label' textAnchor='middle'>
          <textPath href='#sigil-type-ring' startOffset='76%'>
            {craft.sigil.rings[2]}
          </textPath>
        </text>
        <rect
          className='sigil-center-backing'
          x='127'
          y='161'
          width='106'
          height='40'
        />
        <text className='sigil-center' x='180' y='178' textAnchor='middle'>
          {craft.sigil.center[0]}
        </text>
        <text className='sigil-center' x='180' y='191' textAnchor='middle'>
          {craft.sigil.center[1]}
        </text>
      </svg>
    </figure>
  );
}
