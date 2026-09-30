import LetterGlitch from "./LetterGlitch";
import PaperCrumple from "./PaperCrumple";

const glitchColors = ["#f4b8ef", "#ff38ca", "#ff66eb"];

const experience = [
  {
    period: "Oct 2022 - Present",
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
    period: "2022 - 9 months",
    role: "Nanny",
    organization: "Private Family",
    description:
      "Provided dependable daily care in a safe, structured environment, managing schedules, activities, and communication with parents.",
    details: [],
  },
  {
    period: "2018 - 2020",
    role: "Cashier - Cook - Prep Team",
    organization: "Your Pie",
    location: "Grovetown, GA",
    description:
      "Served customers and prepared orders in a fast-paced restaurant while keeping work areas clean, stocked, and organized.",
    details: [],
  },
];

const skills = [
  {
    command: "$ credentials --html-css",
    label: "HTML & CSS",
    description: "HTML & CSS certification.",
  },
  {
    command: "$ credentials --javascript",
    label: "JavaScript",
    description: "JavaScript certification.",
  },
  {
    command: "$ learning --full-stack",
    label: "Full-stack development",
    description: "Developer program in progress through Vet Bross.",
  },
  {
    command: "$ systems --inventory",
    label: "Inventory management",
    description: "Managing equipment, supplies, and records.",
  },
  {
    command: "$ systems --logistics",
    label: "Logistics",
    description: "Coordinating changing operational needs.",
  },
  {
    command: "$ systems --accountability",
    label: "Property accountability",
    description: "Safeguarding equipment and resolving discrepancies.",
  },
  {
    command: "$ workflow --records",
    label: "Recordkeeping",
    description: "Maintaining supply documentation and accurate records.",
  },
  {
    command: "$ people --service",
    label: "Customer service",
    description: "Supporting customers in a fast-paced environment.",
  },
  {
    command: "$ people --teamwork",
    label: "Team collaboration",
    description: "Coordinating with leadership and teammates.",
  },
  {
    command: "$ workflow --organization",
    label: "Organization & time management",
    description: "Balancing priorities and deadlines.",
  },
  {
    command: "$ process --problem-solving",
    label: "Problem-solving",
    description: "Working through shortages and record discrepancies.",
  },
  {
    command: "$ people --communication",
    label: "Communication",
    description: "Sharing clear updates with families, customers, and teams.",
  },
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

function SpiderWeb({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 0v120M0 0h120M0 0l120 120M0 0l60 120M0 0l120 60" />
      <path d="M0 18c10 0 18 8 18 18 0 10 8 18 18 18 10 0 18 8 18 18 0 10 8 18 18 18 10 0 18 8 18 18" />
      <path d="M0 38c22 0 40 18 40 40 0 22 18 40 40 40M0 62c10 0 18 8 18 18 0 10 8 18 18 18" />
      <path d="M18 0c0 10 8 18 18 18 10 0 18 8 18 18 0 10 8 18 18 18 10 0 18 8 18 18 0 10 8 18 18 18" />
    </svg>
  );
}

function HangingSpider({ className }: { className: string }) {
  return (
    <div className={className} aria-hidden="true">
      <span className="portfolio-spider-thread" />
      <svg viewBox="0 0 32 30" fill="none" focusable="false">
        <path d="M16 1v7M16 11 5 7M16 11 3 14M16 13 6 21M16 11l11-4M16 11l13 3M16 13l10 8" />
        <circle cx="16" cy="9" r="2.5" />
        <ellipse cx="16" cy="17" rx="4" ry="5.5" />
      </svg>
    </div>
  );
}

function SkillsSection() {
  return (
    <section id="learning" className="portfolio-section portfolio-learning">
      <div className="portfolio-wrap">
        <SectionHeading
          index="02"
          label="Skills & strengths"
          title="What I bring to the work."
        />
        <p className="portfolio-skill-intro" data-reveal>
          A mix of technical foundations, steady operational habits, and
          people-first work built across different roles.
        </p>
        <div className="portfolio-skill-grid">
          {skills.map((skill) => (
            <article
              className="portfolio-skill-card"
              key={skill.label}
              data-reveal
              tabIndex={0}
            >
              <span className="portfolio-skill-command">{skill.command}</span>
              <h3>{skill.label}</h3>
              <p>{skill.description}</p>
            </article>
          ))}
        </div>
      </div>
      <HangingSpider className="portfolio-spider portfolio-spider-skills" />
      <SpiderWeb className="portfolio-web portfolio-web-skills" />
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="portfolio-section portfolio-experience">
      <div className="portfolio-wrap">
        <div className="portfolio-experience-surface">
          <SectionHeading
            index="03"
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
                  {item.location && (
                    <p className="portfolio-job-location">{item.location}</p>
                  )}
                  <p className="portfolio-job-description">
                    {item.description}
                  </p>
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

          <div className="portfolio-education">
            <SectionHeading
              index="04"
              label="Learning & education"
              title="A strong foundation, with plenty still ahead."
            />
            <div className="portfolio-education-grid">
              <div className="portfolio-education-item" data-reveal>
                <span className="portfolio-education-mark">01</span>
                <div>
                  <p>Full Stack Developer Program</p>
                  <span>Vet Bross · In progress</span>
                </div>
              </div>
              <div className="portfolio-education-item" data-reveal>
                <span className="portfolio-education-mark">02</span>
                <div>
                  <p>Bachelor&apos;s in Health Management</p>
                  <span>
                    University of Maryland Global Campus · In progress
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SpiderWeb className="portfolio-web portfolio-web-experience" />
    </section>
  );
}

export default function PortfolioHome() {
  return (
    <main id="home" className="portfolio-main">
      <section className="portfolio-hero" aria-labelledby="hero-title">
        <div className="portfolio-glitch-layer" aria-hidden="true">
          <LetterGlitch
            glitchColors={glitchColors}
            glitchSpeed={115}
            centerVignette={false}
            outerVignette
            smooth
            backgroundColor="transparent"
          />
        </div>
        <SpiderWeb className="portfolio-web portfolio-web-hero" />
        <HangingSpider className="portfolio-spider portfolio-spider-hero" />
        <div className="portfolio-architecture" aria-hidden="true">
          <span />
        </div>
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
              <a
                className="portfolio-button portfolio-button-primary"
                href="#experience"
              >
                Explore my experience <span aria-hidden="true">↘</span>
              </a>
              <a
                className="portfolio-text-link"
                href="mailto:whyphy.abrams@gmail.com"
              >
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
            <h2>
              careful work
              <br />
              and curious thinking.
            </h2>
            <ol className="portfolio-path-list">
              <li>
                <span className="portfolio-path-number">01</span>
                <span>Operations</span>
                <span className="portfolio-path-detail">
                  Army supply · 2022—now
                </span>
              </li>
              <li>
                <span className="portfolio-path-number">02</span>
                <span>Foundations</span>
                <span className="portfolio-path-detail">
                  HTML · CSS · JavaScript
                </span>
              </li>
              <li>
                <span className="portfolio-path-number">03</span>
                <span>What&apos;s next</span>
                <span className="portfolio-path-detail">
                  Full-stack program · in progress
                </span>
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
        <div className="portfolio-wrap">
          <div className="portfolio-about-layout">
            <div className="portfolio-about-grid">
              <SectionHeading
                index="01"
                label="A little about me"
                title="From keeping systems running to learning how to build them."
              />
              <div className="portfolio-about-copy">
                <p data-reveal>
                  For the past few years, my work has centered on making sure
                  the details are right: equipment accounted for, records
                  current, and people supported. As a Unit Supply Specialist in
                  the U.S. Army, I&apos;ve learned to stay organized, adapt when
                  priorities shift, and follow a problem through.
                </p>
                <p data-reveal>
                  Now I&apos;m bringing that same mindset to web development.
                  I&apos;m earning my full-stack foundations through the Vet
                  Bross program, building on certifications in HTML, CSS, and
                  JavaScript while pursuing a bachelor&apos;s degree in Health
                  Management.
                </p>
                <a className="portfolio-text-link" href="#learning" data-reveal>
                  What I&apos;m learning <span aria-hidden="true">↘</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SkillsSection />
      <ExperienceSection />

      <section id="contact" className="portfolio-contact">
        <div className="portfolio-wrap portfolio-contact-grid">
          <div className="portfolio-contact-inner">
            <p className="portfolio-kicker" data-reveal>
              <span>05</span> THE NEXT CHAPTER
            </p>
            <h2 data-reveal>
              Let&apos;s make something
              <br />
              <em>thoughtful.</em>
            </h2>
            <p data-reveal>
              I&apos;m growing as a developer and always glad to connect with
              people who care about good work.
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
          <figure className="portfolio-crumple-exhibit portfolio-contact-print" data-reveal>
            <PaperCrumple
              src="/images/portfolio/paper-crumple-print.svg"
              alt="Marissa Abrams contact note with email and Colorado Springs location"
              width={210}
              height={280}
              sceneHeight={318}
              imageFit="contain"
              releaseBehavior="restore"
              crumpleAmount={0.72}
              crumpleDuration={0.65}
              releaseDuration={0.6}
              foldCount={4}
              foldSharpness={0.64}
              wrinkleDepth={0.52}
              paperColor="#f7f1f5"
              paperTexture={0.04}
              lightAngle={-35}
              shadow
              shadowOpacity={0.18}
              draggable
              dragRotation={7}
              dragRadius={48}
              returnToOrigin
              detail={36}
            />
            <figcaption className="portfolio-crumple-caption">
              <span aria-hidden="true">$</span> contact / Marissa Abrams
            </figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}