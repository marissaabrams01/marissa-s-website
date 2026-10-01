import { content } from '../content';
import { GhostPhoto, NextPill, Plate } from '../components';

export default function Record() {
  const record = content.record;
  return (
    <section
      id={record.id}
      data-section
      className='record section-shell section-wrap'
    >
      <GhostPhoto src='/images/candles.svg' className='ghost-record' />
      <header className='section-heading' data-reveal>
        <p className='mono-kicker'>{record.label}</p>
        <h2>
          {record.title.split(record.titleAccent).map((part, index) => (
            <span key={`${part}-${index}`}>
              {part}
              {index < 1 && <em>{record.titleAccent}</em>}
            </span>
          ))}
        </h2>
      </header>
      <article className='featured-record' data-reveal>
        <div className='featured-copy'>
          <p className='mono-kicker'>{record.featured.organization}</p>
          <h3>{record.featured.role}</h3>
          <p className='featured-meta'>
            {record.featured.rank} <span>·</span> {record.featured.period}
          </p>
          <ul className='service-points'>
            {record.featured.duties.map((duty) => (
              <li key={duty}>{duty}</li>
            ))}
          </ul>
        </div>
        <Plate
          src={record.featured.image}
          alt={record.featured.imageAlt}
          className='record-plate'
        />
      </article>
      <div className='hairline-ornament' aria-hidden='true'>
        <i />
        <span />
        <i />
        <span />
        <i />
      </div>
      <div className='other-jobs'>
        {record.otherJobs.map((job) => (
          <article className='job-note' key={job.organization} data-reveal>
            <Plate src={job.image} alt={job.imageAlt} className='job-plate' />
            <p className='mono-kicker'>{job.period}</p>
            <h3>{job.organization}</h3>
            <p>{job.role}</p>
          </article>
        ))}
      </div>
      <NextPill
        href={`#${content.honours.id}`}
        label={content.labels.honours}
      />
    </section>
  );
}
