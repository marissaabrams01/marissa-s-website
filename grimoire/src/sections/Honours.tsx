import { content } from '../content';
import { GhostPhoto, NextPill } from '../components';

export default function Honours() {
  return (
    <section
      id={content.honours.id}
      data-section
      className='honours section-shell section-wrap'
    >
      <GhostPhoto src='/images/letters.svg' className='ghost-honours' />
      <header className='section-heading' data-reveal>
        <p className='mono-kicker'>{content.honours.label}</p>
        <h2>
          {content.honours.statement
            .split(content.honours.accent)
            .map((part, index) => (
              <span key={`${part}-${index}`}>
                {part}
                {index < 1 && <em>{content.honours.accent}</em>}
              </span>
            ))}
        </h2>
      </header>
      <div className='honour-grid'>
        {content.honours.columns.map((column) => (
          <article className='honour-column' key={column.roman} data-reveal>
            <span className='honour-roman'>{column.roman}</span>
            <h3 className='mono-kicker'>{column.heading}</h3>
            <ul>
              {column.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <NextPill
        href={`#${content.contact.id}`}
        label={content.labels.contact}
      />
    </section>
  );
}
