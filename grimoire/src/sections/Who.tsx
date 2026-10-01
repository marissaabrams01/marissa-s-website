import { Feather, UserRound } from 'lucide-react';
import { content } from '../content';
import { GhostPhoto, NextPill } from '../components';

export default function Who() {
  return (
    <section
      id={content.who.id}
      data-section
      className='who section-shell section-wrap'
    >
      <GhostPhoto src='/images/letters.svg' className='ghost-who' />
      <p className='traits-line' data-reveal>
        {content.who.traits.map((trait) => (
          <span className={trait.accent ? 'fuchsia-text' : ''} key={trait.text}>
            {trait.text}{' '}
          </span>
        ))}
      </p>
      <div className='who-columns'>
        <article className='who-column' data-reveal>
          <div className='section-title-with-icon'>
            <UserRound
              className='line-icon'
              size={28}
              strokeWidth={1}
              aria-hidden='true'
            />
            <div>
              <h2>{content.who.profileHeading}</h2>
              <p className='mono-kicker'>{content.who.profileSubheading}</p>
            </div>
          </div>
          <p>{content.who.bio}</p>
          <p className='fine-print'>{content.who.profileFine}</p>
        </article>
        <article className='who-column' data-reveal>
          <div className='section-title-with-icon'>
            <Feather
              className='line-icon'
              size={28}
              strokeWidth={1}
              aria-hidden='true'
            />
            <div>
              <h2>{content.who.currentHeading}</h2>
              <p className='mono-kicker'>{content.who.currentSubheading}</p>
            </div>
          </div>
          <p>{content.who.currentBody}</p>
          <p className='fine-print'>{content.who.currentFine}</p>
        </article>
      </div>
      <NextPill href={`#${content.work.id}`} label={content.labels.work} />
    </section>
  );
}
