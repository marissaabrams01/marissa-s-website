import { ArrowUpRight, Code2, FileText } from 'lucide-react';
import { content } from '../content';
import { NextPill, Plate } from '../components';

export default function Home() {
  return (
    <header id={content.home.id} data-section className='home section-shell'>
      <nav className='home-links' aria-label={content.home.navLabel}>
        <a href={content.links.github} target='_blank' rel='noreferrer'>
          <Code2 size={14} aria-hidden='true' /> {content.labels.github}
        </a>
        <a href={content.links.resume} target='_blank' rel='noreferrer'>
          <FileText size={14} aria-hidden='true' /> {content.labels.resume}
        </a>
      </nav>
      <div className='home-collage' aria-hidden='true'>
        {content.home.photos.map((photo) => (
          <Plate
            key={photo.src}
            src={photo.src}
            alt=''
            className={`home-photo ${photo.className}`}
          />
        ))}
      </div>
      <div className='home-shade' aria-hidden='true' />
      <div className='home-copy'>
        <p className='eyebrow' data-reveal>
          {content.home.eyebrow}
        </p>
        <h1 className='home-name' data-reveal>
          <span>{content.home.nameFirst}</span>
          <span>{content.home.nameLast}</span>
        </h1>
        <p className='home-tagline' data-reveal>
          {content.home.tagline.map((line, index) => (
            <span
              className={
                index === content.home.tagline.length - 1 ? 'rose-text' : ''
              }
              key={line}
            >
              {line}
            </span>
          ))}
        </p>
        <div className='home-project-links' data-reveal>
          <span className='terminal-command'>
            $ {content.home.terminalCommand}
          </span>
          <ul>
            {content.home.terminalProjects.map((name, index) => (
              <li key={name}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {name}
              </li>
            ))}
          </ul>
        </div>
        <a className='home-more-link' href='#work' data-reveal>
          {content.work.more} <ArrowUpRight size={15} aria-hidden='true' />
        </a>
      </div>
      <aside
        className='repo-terminal'
        aria-label={content.home.terminalReposLabel}
        data-reveal
      >
        <div className='terminal-titlebar'>
          <span className='terminal-lights' aria-hidden='true'>
            <i />
            <i />
            <i />
          </span>
          <span>{content.home.terminalReposLabel}</span>
          <span className='terminal-status'>●</span>
        </div>
        <p className='terminal-command'>$ {content.home.terminalCommand}</p>
        <ul>
          {content.work.projects.map((project) => (
            <li key={project.roman}>
              <span>{project.roman}</span>
              {project.name}
            </li>
          ))}
        </ul>
      </aside>
      <NextPill href={`#${content.who.id}`} label={content.labels.who} />
    </header>
  );
}
