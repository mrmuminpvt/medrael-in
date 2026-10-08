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

const SIGNALS = [
  'AI crawler accessibility',
  'Structured data',
  'Content quality and readability',
  'Brand visibility',
  'Trust signals',
  'Content freshness',
  'AI and LLM visibility',
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
              Seven dimensions of AI readiness
            </h2>
            <p className="signals__text">
              Each analysis checks the signals AI systems rely on to find,
              interpret, and trust a website. Every dimension contributes to the
              overall score and grade.
            </p>
          </div>

          <ol className="signals__list">
            {SIGNALS.map((signal, i) => (
              <li key={signal} className="signals__item">
                <span className="signals__item-index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{signal}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
