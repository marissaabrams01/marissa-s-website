const experience = [
  {
    period: "Oct 2022 — Present",
    role: "Unit Supply Specialist (92Y)",
    organization: "United States Army",
    location: "Colorado Springs, CO",
    description:
      "Keep people and operations moving through careful inventory management, equipment accountability, and clear supply records.",
    details: [
      "Coordinate changing logistical needs with leadership and teammates.",
      "Track equipment, resolve record discrepancies, and safeguard property.",
      "Balance daily priorities while following established procedures.",
    ],
  },
  {
    period: "2022 · 9 months",
    role: "Nanny",
    organization: "Private Family",
    location: "Georgia",
    description:
      "Provided dependable daily care in a safe, structured environment, managing schedules, activities, and communication with parents.",
    details: [],
  },
  {
    period: "2018 — 2020",
    role: "Cashier · Cook · Prep Team",
    organization: "Your Pie",
    location: "Grovetown, GA",
    description:
      "Served customers and prepared orders in a fast-paced restaurant while keeping work areas clean, stocked, and organized.",
    details: [],
  },
];

const technicalSkills = [
  { label: "HTML & CSS", note: "Certified" },
  { label: "JavaScript", note: "Certified" },
  { label: "Full-stack development", note: "In training" },
  { label: "Web development", note: "Building foundations" },
];

const workingStyle = [
  "Systems thinking",
  "Organization",
  "Problem-solving",
  "Team collaboration",
  "Clear communication",
  "Time management",
];

function SectionHeading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <div className="portfolio-section-heading">
      <p className="portfolio-kicker" data-reveal>
        <span>{index}</span> {label}
      </p>
      <h2 data-reveal>{title}</h2>
    </div>
  );
}

export default function PortfolioHome() {
  return (
    <main id="home" className="portfolio-main">
      <section className="portfolio-hero" aria-labelledby="hero-title">
        <div className="portfolio-wrap portfolio-hero-grid">
          <div className="portfolio-hero-copy">
            <p className="portfolio-kicker" data-reveal>
              <span className="portfolio-status-dot" /> COLORADO SPRINGS, CO
              <span className="portfolio-kicker-divider">/</span> DEVELOPER IN
              TRAINING
            </p>
            <h1 id="hero-title" data-reveal>
              Thoughtful systems.
              <br />
              <em>Curious code.</em>
            </h1>
            <p className="portfolio-hero-intro" data-reveal>
              I&apos;m Marissa, a full-stack developer in training with a
              background in Army logistics. I bring care, structure, and a
              steady eye for detail to everything I build.
            </p>
            <div className="portfolio-actions" data-reveal>
              <a className="portfolio-button portfolio-button-primary" href="#experience">
                Explore my experience <span aria-hidden="true">↘</span>
              </a>
              <a className="portfolio-text-link" href="mailto:whyphy.abrams@gmail.com">
                Get in touch <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="portfolio-hero-note" data-reveal>
              HTML &amp; CSS certified <span>·</span> JavaScript certified
            </p>
          </div>

          <div className="portfolio-journey" data-reveal>
            <div className="portfolio-journey-header">
              <span>FIELD NOTES</span>
              <span>01 / 03</span>
            </div>
            <div className="portfolio-monogram" aria-hidden="true">
              MA
            </div>
            <p className="portfolio-journey-caption">A path built on</p>
            <h2>careful work<br />and curious thinking.</h2>
            <ol className="portfolio-path-list">
              <li>
                <span className="portfolio-path-number">01</span>
                <span>Operations</span>
                <span className="portfolio-path-detail">Army supply · 2022—now</span>
              </li>
              <li>
                <span className="portfolio-path-number">02</span>
                <span>Foundations</span>
                <span className="portfolio-path-detail">HTML · CSS · JavaScript</span>
              </li>
              <li>
                <span className="portfolio-path-number">03</span>
                <span>What&apos;s next</span>
                <span className="portfolio-path-detail">Full-stack program · in progress</span>
              </li>
            </ol>
            <span className="portfolio-journey-stamp">IN PROGRESS</span>
          </div>
        </div>
        <a className="portfolio-scroll-cue" href="#about" data-reveal>
          <span aria-hidden="true" /> Scroll to explore
        </a>
      </section>

      <section id="about" className="portfolio-section portfolio-about">
        <div className="portfolio-wrap portfolio-about-grid">
          <SectionHeading
            index="01"
            label="A little about me"
            title="From keeping systems running to learning how to build them."
          />
          <div className="portfolio-about-copy">
            <p data-reveal>
              For the past few years, my work has centered on making sure the
              details are right: equipment accounted for, records current, and
              people supported. As a Unit Supply Specialist in the U.S. Army,
              I&apos;ve learned to stay organized, adapt when priorities shift,
              and follow a problem through.
            </p>
            <p data-reveal>
              Now I&apos;m bringing that same mindset to web development. I&apos;m
              earning my full-stack foundations through the Vet Bross program,
              building on certifications in HTML, CSS, and JavaScript while
              pursuing a bachelor&apos;s degree in Health Management.
            </p>
            <a className="portfolio-text-link" href="#learning" data-reveal>
              What I&apos;m learning <span aria-hidden="true">↘</span>
            </a>
          </div>
        </div>
      </section>

      <section id="experience" className="portfolio-section portfolio-experience">
        <div className="portfolio-wrap">
          <SectionHeading
            index="02"
            label="Experience"
            title="Good work is built on showing up."
          />
          <div className="portfolio-timeline">
            {experience.map((item, index) => (
              <article className="portfolio-job" key={item.role} data-reveal>
                <div className="portfolio-job-period">
                  <span className="portfolio-timeline-dot" />
                  <span>{item.period}</span>
                </div>
                <div className="portfolio-job-main">
                  <p className="portfolio-job-org">{item.organization}</p>
                  <h3>{item.role}</h3>
                  <p className="portfolio-job-location">{item.location}</p>
                  <p className="portfolio-job-description">{item.description}</p>
                  {item.details.length > 0 && (
                    <ul>
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <span className="portfolio-job-index">0{index + 1}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="learning" className="portfolio-section portfolio-learning">
        <div className="portfolio-wrap">
          <SectionHeading
            index="03"
            label="Learning & strengths"
            title="A strong foundation, with plenty still ahead."
          />
          <div className="portfolio-learning-grid">
            <div className="portfolio-learning-column">
              <h3 data-reveal>Technical foundations</h3>
              <div className="portfolio-skill-list">
                {technicalSkills.map((skill) => (
                  <div className="portfolio-skill-row" key={skill.label} data-reveal>
                    <span>{skill.label}</span>
                    <span>{skill.note}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="portfolio-learning-column portfolio-education">
              <h3 data-reveal>In progress</h3>
              <div className="portfolio-education-item" data-reveal>
                <span className="portfolio-education-mark">01</span>
                <div>
                  <p>Full Stack Developer Program</p>
                  <span>Vet Bross</span>
                </div>
                <span className="portfolio-status-pill">Studying</span>
              </div>
              <div className="portfolio-education-item" data-reveal>
                <span className="portfolio-education-mark">02</span>
                <div>
                  <p>Bachelor&apos;s in Health Management</p>
                  <span>University of Maryland Global Campus</span>
                </div>
                <span className="portfolio-status-pill">Studying</span>
              </div>
            </div>
          </div>
          <div className="portfolio-strengths" data-reveal>
            <p className="portfolio-kicker">HOW I WORK</p>
            <ul>
              {workingStyle.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="portfolio-contact">
        <div className="portfolio-wrap portfolio-contact-inner">
          <p className="portfolio-kicker" data-reveal>
            <span>04</span> THE NEXT CHAPTER
          </p>
          <h2 data-reveal>
            Let&apos;s make something
            <br />
            <em>thoughtful.</em>
          </h2>
          <p data-reveal>
            I&apos;m growing as a developer and always glad to connect with people
            who care about good work.
          </p>
          <a
            className="portfolio-button portfolio-button-contact"
            href="mailto:whyphy.abrams@gmail.com"
            data-reveal
          >
            Email Marissa <span aria-hidden="true">↗</span>
          </a>
          <span className="portfolio-contact-flower" aria-hidden="true">
            ✳
          </span>
        </div>
      </section>
    </main>
  );
}