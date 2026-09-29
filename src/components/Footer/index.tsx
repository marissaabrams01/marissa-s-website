const Footer = () => {
  return (
    <footer className="portfolio-footer">
      <div className="portfolio-wrap portfolio-footer-inner">
        <p data-reveal>© {new Date().getFullYear()} Marissa Abrams</p>
        <nav className="portfolio-footer-links" aria-label="Footer navigation">
          <a href="mailto:whyphy.abrams@gmail.com" data-reveal>
            Email
          </a>
          <a href="/#home" data-reveal>
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;