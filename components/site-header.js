import { BrandMark } from './brand-mark';

export function SiteHeader({ onHome }) {
  return (
    <header className="header">
      <div className="container header__inner">
        <a
          href="/"
          className="brand"
          aria-label="Medrael AI home"
          onClick={(e) => {
            if (onHome) {
              e.preventDefault();
              onHome();
            }
          }}
        >
          <BrandMark className="brand__mark" />
          <span className="brand__text">
            <span className="brand__name">Medrael AI</span>
            <span className="brand__descriptor">AI Visibility Intelligence</span>
          </span>
        </a>

        <nav className="nav" aria-label="Primary">
          <a className="nav__link" href="#capabilities">
            Capabilities
          </a>
          <a className="nav__cta" href="#analyze">
            Analyze a website
          </a>
        </nav>
      </div>
    </header>
  );
}
