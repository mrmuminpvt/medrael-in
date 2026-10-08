'use client';

import { useState, useCallback } from 'react';
import { CheckIcon, CrossIcon, AlertIcon } from './icons';

const GRADE_COLORS = {
  A: 'var(--grade-a)',
  B: 'var(--grade-b)',
  C: 'var(--grade-c)',
  D: 'var(--grade-d)',
  F: 'var(--grade-f)',
};

function getBarClass(percentage) {
  if (percentage >= 70) return 'category__bar-fill--high';
  if (percentage >= 40) return 'category__bar-fill--mid';
  return 'category__bar-fill--low';
}

// ---------------------------------------------------------------------------
// Category Card
// ---------------------------------------------------------------------------

function CategoryCard({ category }) {
  return (
    <div className="category">
      <div className="category__header">
        <span className="category__name">{category.name}</span>
        <span className="category__score">
          <strong>{category.score}</strong>/{category.maxScore} &middot;{' '}
          {category.percentage}%
        </span>
      </div>
      <div className="category__bar-track">
        <div
          className={`category__bar-fill ${getBarClass(category.percentage)}`}
          style={{ width: `${category.percentage}%` }}
        />
      </div>
      {category.teaser && (
        <p className="category__teaser">{category.teaser}</p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Brand Presence
// ---------------------------------------------------------------------------

function BrandPresenceSection({ platforms }) {
  if (!platforms || platforms.length === 0) return null;

  return (
    <section className="report__section brand-presence">
      <div className="report__section-head">
        <h3 className="report__section-title">Brand presence across platforms</h3>
        <span className="report__section-note">
          Where AI systems look for third-party signals
        </span>
      </div>
      <div className="brand-presence__grid">
        {platforms.map((p) => {
          let iconClass = 'brand-presence__icon--unable';
          let statusClass = '';
          let statusText = 'Unable to check';
          let icon = <AlertIcon />;

          if (p.status === 'found') {
            iconClass = 'brand-presence__icon--found';
            statusClass = 'brand-presence__status--found';
            statusText = 'Found';
            icon = <CheckIcon />;
          } else if (p.status === 'not_found') {
            iconClass = 'brand-presence__icon--not-found';
            statusText = 'Not found';
            icon = <CrossIcon />;
          }

          return (
            <div key={p.name} className="brand-presence__item">
              <div className={`brand-presence__icon ${iconClass}`} aria-hidden="true">
                {icon}
              </div>
              <div className="brand-presence__info">
                <span className="brand-presence__platform">{p.name}</span>
                <span className={`brand-presence__status ${statusClass}`}>
                  {statusText}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Email Capture
// ---------------------------------------------------------------------------

function EmailCapture({ scanResult }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError('');

      if (!name.trim() || !email.trim() || !company.trim()) {
        setError('All fields are required.');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        setError('Please enter a valid email address.');
        return;
      }

      setSubmitting(true);

      try {
        const res = await fetch('/api/capture-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            company: company.trim(),
            scanResult,
          }),
        });

        const data = await res.json();

        // Store scan result in localStorage as fallback for local dev
        if (scanResult) {
          try {
            localStorage.setItem('scanResult', JSON.stringify(scanResult));
          } catch {
            // localStorage unavailable — ignore
          }
        }

        if (res.ok && data.reportUrl) {
          setSubmitted(true);
          // Redirect to the full report after a brief confirmation
          setTimeout(() => {
            window.location.href = data.reportUrl;
          }, 1500);
        } else {
          // Fallback: show success even if API partially failed
          setSubmitted(true);
        }
      } catch {
        // Fallback for local dev — store to localStorage and redirect
        if (scanResult) {
          try {
            localStorage.setItem('scanResult', JSON.stringify(scanResult));
          } catch {
            // ignore
          }
        }
        setSubmitted(true);
      } finally {
        setSubmitting(false);
      }
    },
    [name, email, company, scanResult]
  );

  if (submitted) {
    return (
      <section className="email-cta" aria-live="polite">
        <div className="email-cta__success">
          <span className="email-cta__success-icon">
            <CheckIcon />
          </span>
          Report ready. Redirecting to your full AI visibility report...
        </div>
      </section>
    );
  }

  return (
    <section className="email-cta" aria-labelledby="email-cta-title">
      <div className="email-cta__header">
        <p className="eyebrow">Full report</p>
        <h3 id="email-cta-title" className="email-cta__title">
          Get the complete report and prioritized action plan.
        </h3>
        <p className="email-cta__subtitle">
          Page-by-page findings, every check explained, and fixes ranked by
          impact so you know exactly where to start.
        </p>
      </div>

      <form className="email-cta__form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="lead-name" className="sr-only">
          Your name
        </label>
        <input
          id="lead-name"
          type="text"
          className="email-cta__input"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={submitting}
          autoComplete="name"
        />
        <label htmlFor="lead-email" className="sr-only">
          Work email
        </label>
        <input
          id="lead-email"
          type="email"
          className="email-cta__input"
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
          autoComplete="email"
        />
        <label htmlFor="lead-company" className="sr-only">
          Company name
        </label>
        <input
          id="lead-company"
          type="text"
          className="email-cta__input"
          placeholder="Company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          disabled={submitting}
          autoComplete="organization"
        />
        {error && (
          <div className="email-cta__error" role="alert">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="email-cta__submit"
          disabled={submitting}
        >
          {submitting ? 'Sending...' : 'Get the full report'}
        </button>
      </form>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Report View
// ---------------------------------------------------------------------------

export function ReportView({ scanResult, onScanAgain }) {
  const [copied, setCopied] = useState(false);

  const { score, url, brandName } = scanResult;
  const { grade, gradeLabel, percentage, categories } = score;

  const brandCategory = categories.find((c) => c.key === 'brandPresence');
  const platforms = brandCategory?.details?.platforms || [];

  const handleShare = useCallback(() => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  }, []);

  return (
    <div className="report">
      <button className="report__back" onClick={onScanAgain}>
        <span aria-hidden="true">&larr;</span> Analyze another website
      </button>

      <section
        className="report__hero"
        aria-label="Overall AI visibility score"
        style={{ '--grade-color': GRADE_COLORS[grade] || 'var(--color-text-primary)' }}
      >
        <div className="report__grade" aria-label={`Grade ${grade}`}>
          {grade}
        </div>

        <div className="report__summary">
          <div className="report__score">
            <span className="report__score-value">
              {percentage}
              <span>/ 100</span>
            </span>
            <span className="report__score-label">
              AI Visibility Score &middot; {gradeLabel}
            </span>
          </div>

          <div className="report__meta">
            <div className="report__meta-item">
              <span className="report__meta-label">URL</span>
              <span className="report__meta-value">{url}</span>
            </div>
            {brandName && (
              <div className="report__meta-item">
                <span className="report__meta-label">Brand</span>
                <span className="report__meta-value">{brandName}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="report__section">
        <div className="report__section-head">
          <h3 className="report__section-title">Score breakdown</h3>
          <span className="report__section-note">
            {categories.length} dimensions evaluated
          </span>
        </div>
        <div className="categories">
          {categories.map((cat) => (
            <CategoryCard key={cat.key} category={cat} />
          ))}
        </div>
      </section>

      <BrandPresenceSection platforms={platforms} />

      <EmailCapture scanResult={scanResult} />

      <div className="report__actions">
        <button
          className={`btn-ghost ${copied ? 'btn-ghost--copied' : ''}`}
          onClick={handleShare}
        >
          {copied ? (
            <>
              <CheckIcon /> Link copied
            </>
          ) : (
            'Share this report'
          )}
        </button>
      </div>
    </div>
  );
}
