import { BrandMark } from './brand-mark';

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <BrandMark className="brand__mark" />
          <span>Medrael AI &mdash; AI Visibility Intelligence</span>
        </div>
      </div>
    </footer>
  );
}
