import { content } from '../content';
import { GhostPhoto, NextPill, Sigil } from '../components';

export default function Craft() {
  return (
    <section
      id={content.craft.id}
      data-section
      className='craft section-shell section-wrap'
    >
      <GhostPhoto src='/images/raven.svg' className='ghost-craft' />
      <div className='craft-grid'>
        <blockquote className='craft-statement' data-reveal>
          <p>
            {content.craft.statementBefore}{' '}
            <em>{content.craft.statementAccent}</em>
          </p>
        </blockquote>
        <Sigil craft={content.craft} />
        <div className='skill-columns' data-reveal>
          {content.craft.skills.map((group) => (
            <div className='skill-group' key={group.heading}>
              <h2>{group.heading}</h2>
              <ul>
                {group.items.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <NextPill href={`#${content.record.id}`} label={content.labels.record} />
    </section>
  );
}
