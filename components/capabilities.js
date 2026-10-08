const CAPABILITIES = [
  {
    index: '01',
    title: 'AI Visibility',
    text: 'Understand how discoverable and understandable your brand is to AI-powered search systems.',
  },
  {
    index: '02',
    title: 'Technical Readiness',
    text: 'Find technical signals, structured data, crawler issues, and other barriers affecting AI discovery.',
  },
  {
    index: '03',
    title: 'Action Plan',
    text: 'Get prioritized recommendations showing what to fix and where your website can improve.',
  },
];

// Mirrors the six scored categories in lib/scoring.js so the homepage and
// report always describe the same evaluation.
const SIGNALS = [
  { name: 'Crawler Access', text: 'Can AI crawlers reach and read your pages?' },
  { name: 'Structured Data', text: 'Is your business described in machine-readable schema?' },
  { name: 'Content Readability', text: 'Can AI systems extract clear answers from your content?' },
  { name: 'Brand Footprint', text: 'Does your brand appear where AI engines look for sources?' },
  { name: 'Trust Signals', text: 'Do citations, data, and authorship establish credibility?' },
  { name: 'Content Freshness', text: 'Is your site visibly active and recently updated?' },
];

export function Capabilities() {
  return (
    <>
      <section className="capabilities" id="capabilities">
        <div className="container">
          <div className="capabilities__intro">
            <p className="eyebrow">What Medrael AI does</p>
            <h2 className="capabilities__title">
              One analysis. A clear picture of how AI systems see your business.
            </h2>
            <p className="capabilities__lede">
              Medrael AI reads your website the way AI search engines do, then
              translates what it finds into a score, a breakdown, and a
              prioritized plan.
            </p>
          </div>

          <div className="capabilities__grid">
            {CAPABILITIES.map((item) => (
              <article key={item.index} className="capability">
                <span className="capability__index">
                  {item.index} &mdash; {item.title}
                </span>
                <div className="capability__body">
                  <h3 className="capability__title">{item.title}</h3>
                  <p className="capability__text">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="signals" aria-labelledby="signals-title">
        <div className="container signals__inner">
          <div className="signals__heading">
            <p className="eyebrow">Signals evaluated</p>
            <h2 id="signals-title" className="signals__title">
              Six dimensions of AI readiness
            </h2>
            <p className="signals__text">
              Each analysis scores the six signals AI systems rely on to find,
              interpret, and trust a website. Together they make up your AI
              Visibility Score and grade.
            </p>
          </div>

          <ul className="signals__list">
            {SIGNALS.map((signal) => (
              <li key={signal.name} className="signals__item">
                <span className="signals__item-name">{signal.name}</span>
                <span className="signals__item-text">{signal.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
