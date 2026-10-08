import { CheckIcon } from './icons';

export const SCAN_STEPS = [
  'Checking AI crawler access...',
  'Analyzing schema & structured data...',
  'Evaluating content structure...',
  'Searching brand presence across platforms...',
  'Reviewing citations & credibility signals...',
  'Checking content freshness & cadence...',
];

export function ScanningView({ url, completedSteps }) {
  const progress = Math.min(
    100,
    Math.round((completedSteps / SCAN_STEPS.length) * 100)
  );

  return (
    <section className="scanning" aria-live="polite" aria-busy="true">
      <div className="scanning__panel">
        <div className="scanning__header">
          <div className="scanning__status">
            <span className="scanning__dot" aria-hidden="true" />
            <span className="eyebrow">Analysis in progress</span>
          </div>
          <h2 className="scanning__title">Analyzing your website</h2>
          <p className="scanning__url">{url}</p>
        </div>

        <div
          className="scanning__progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            className="scanning__progress-fill"
            style={{ width: `${progress}%` }}
          />
          <div className="scanning__progress-sweep" aria-hidden="true" />
        </div>

        <ul className="scanning__checks">
          {SCAN_STEPS.map((step, i) => {
            const isDone = i < completedSteps;
            const isActive = i === completedSteps;

            let checkClass = 'scanning__check';
            if (isDone) checkClass += ' scanning__check--done';
            else if (isActive) checkClass += ' scanning__check--active';

            return (
              <li key={step} className={checkClass}>
                <span className="scanning__check-icon" aria-hidden="true">
                  {isDone ? (
                    <span className="scanning__check-icon--done">
                      <CheckIcon size={14} />
                    </span>
                  ) : (
                    <span
                      className={
                        isActive
                          ? 'scanning__check-icon--active'
                          : 'scanning__check-icon--pending'
                      }
                    />
                  )}
                </span>
                <span className="scanning__check-label">
                  {isDone ? step.replace('...', '') : step}
                </span>
                <span className="scanning__check-index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
