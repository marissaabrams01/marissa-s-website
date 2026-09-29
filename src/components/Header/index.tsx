"use client";

import { useState } from "react";

const navigation = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Learning", href: "/#learning" },
];

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);

  return (
    <header className="portfolio-header">
      <div className="portfolio-header-inner">
        <a className="portfolio-brand" href="/#home" data-reveal>
          <span className="portfolio-brand-mark" aria-hidden="true">
            MA
          </span>
          <span className="portfolio-brand-copy">
            <strong>Marissa Abrams</strong>
            <small>DEVELOPER IN TRAINING</small>
          </span>
        </a>

        <button
          className="portfolio-menu-toggle"
          type="button"
          aria-label={navigationOpen ? "Close navigation" : "Open navigation"}
          aria-controls="portfolio-navigation"
          aria-expanded={navigationOpen}
          onClick={() => setNavigationOpen((open) => !open)}
        >
          <span aria-hidden="true" />
        </button>

        <nav
          id="portfolio-navigation"
          className={`portfolio-nav${navigationOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              data-reveal
              onClick={() => setNavigationOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            className="portfolio-nav-contact"
            href="/#contact"
            data-reveal
            onClick={() => setNavigationOpen(false)}
          >
            Contact <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;