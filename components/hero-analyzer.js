'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

function normalizeUrl(input) {
  let url = input.trim();
  if (!url) return '';
  if (!/^https?:\/\//i.test(url) && !/^\w+:\/\//.test(url)) {
    url = `https://${url}`;
  }
  return url;
}

export function HeroAnalyzer({ onScan }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setError('');

      const trimmed = url.trim();
      if (!trimmed) {
        setError('Please enter a website URL.');
        return;
      }

      const normalized = normalizeUrl(trimmed);
      try {
        new URL(normalized);
      } catch {
        setError('Please enter a valid URL (e.g., example.com).');
        return;
      }

      setSubmitting(true);
      onScan(normalized);
    },
    [url, onScan]
  );

  return (
    <section className="hero" id="analyze">
      <div className="hero__backdrop" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__glow" />
      </div>

      <div className="container hero__inner">
        <p className="eyebrow hero__eyebrow reveal reveal--1">
          AI Search Readiness Platform
        </p>

        <h1 className="hero__headline reveal reveal--2">
          Be visible in the age of <em>AI search.</em>
        </h1>

        <p className="hero__copy reveal reveal--3">
          Analyze your website and discover how prepared your business is for
          AI-powered search, recommendations, and discovery.
        </p>

        <form
          className="analyzer reveal reveal--4"
          onSubmit={handleSubmit}
          noValidate
        >
          <label htmlFor="website-url" className="sr-only">
            Website URL
          </label>
          <div className="analyzer__shell">
            <span className="analyzer__prefix" aria-hidden="true">
              https://
            </span>
            <input
              ref={inputRef}
              id="website-url"
              type="text"
              className="analyzer__input"
              placeholder="yourwebsite.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={submitting}
              autoComplete="url"
              inputMode="url"
              spellCheck={false}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? 'website-url-error' : undefined}
            />
            <button
              type="submit"
              className="analyzer__submit"
              disabled={submitting}
            >
              {submitting ? 'Starting analysis' : 'Analyze website'}
              <svg
                className="analyzer__arrow"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {error && (
            <div id="website-url-error" className="analyzer__error" role="alert">
              {error}
            </div>
          )}

          <p className="analyzer__meta">
            <span>Free analysis</span>
            <span className="analyzer__meta-dot" aria-hidden="true" />
            <span>No signup required</span>
            <span className="analyzer__meta-dot" aria-hidden="true" />
            <span>Results in seconds</span>
          </p>
        </form>
      </div>
    </section>
  );
}
