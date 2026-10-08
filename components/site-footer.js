import { BrandMark } from './brand-mark';

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <BrandMark className="brand__mark" />
          <span>Medrael AI &mdash; AI Visibility Intelligence</span>
        </div>

        <p className="footer__attribution">
          <span>
            Built on the open-source{' '}
            <a
              className="footer__link"
              href="https://github.com/Almontas/ai-visibility-audit"
              target="_blank"
              rel="noopener noreferrer"
            >
              AI Visibility Audit
            </a>
          </span>
          <span aria-hidden="true">&middot;</span>
          <span>MIT License</span>
        </p>
      </div>
    </footer>
  );
}
