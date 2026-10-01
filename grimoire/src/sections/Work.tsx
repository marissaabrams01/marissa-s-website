import { ArrowUpRight } from 'lucide-react';
import { content } from '../content';
import { GhostPhoto, NextPill, Plate } from '../components';

export default function Work() {
  return (
    <section
      id={content.work.id}
      data-section
      className='work section-shell section-wrap'
    >
      <GhostPhoto src='/images/raven.svg' className='ghost-work' />
      <header className='section-heading' data-reveal>
        <p className='mono-kicker'>{content.work.label}</p>
        <h2>
          {content.work.title
            .split(content.work.leadAccent)
            .map((part, index) => (
              <span key={`${part}-${index}`}>
                {part}
                {index < 1 && <em>{content.work.leadAccent}</em>}
              </span>
            ))}
        </h2>
      </header>
      <div className='hairline-ornament' aria-hidden='true'>
        <i />
        <span />
        <i />
        <span />
        <i />
      </div>
      <div className='project-list'>
        {content.work.projects.map((project, index) => (
          <article
            className={`project-row${index % 2 ? ' reverse' : ''}`}
            key={project.url}
            data-reveal
          >
            <a
              className='project-plate-link'
              href={project.url}
              target='_blank'
              rel='noreferrer'
              aria-label={`${content.labels.viewRepository}: ${project.name}`}
            >
              <Plate
                src={project.image}
                alt={project.imageAlt}
                className='project-plate'
              />
            </a>
            <div className='project-copy'>
              <div className='project-meta'>
                <span className='project-roman'>{project.roman}</span>
                <span className='mono-kicker'>{project.category}</span>
              </div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <ul className='stack-tags' aria-label={project.name}>
                {project.stack.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              <a
                className='outline-link'
                href={project.url}
                target='_blank'
                rel='noreferrer'
              >
                {content.labels.viewRepository}{' '}
                <ArrowUpRight size={15} aria-hidden='true' />
              </a>
            </div>
          </article>
        ))}
      </div>
      <a
        className='more-github'
        href={content.links.github}
        target='_blank'
        rel='noreferrer'
      >
        {content.work.more} <ArrowUpRight size={15} aria-hidden='true' />
      </a>
      <NextPill href={`#${content.craft.id}`} label={content.labels.craft} />
    </section>
  );
}
