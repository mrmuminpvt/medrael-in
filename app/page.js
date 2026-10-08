'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { HeroAnalyzer } from '@/components/hero-analyzer';
import { Capabilities } from '@/components/capabilities';
import { ScanningView, SCAN_STEPS } from '@/components/scanning-view';
import { ReportView } from '@/components/report-view';

const STEP_DELAY_MS = 2500;

export default function Home() {
  const [view, setView] = useState('landing'); // 'landing' | 'scanning' | 'report'
  const [scanUrl, setScanUrl] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [scanError, setScanError] = useState('');
  const [completedSteps, setCompletedSteps] = useState(0);

  // Refs to manage the animation/API race
  const apiResultRef = useRef(null);
  const apiDoneRef = useRef(false);
  const animationDoneRef = useRef(false);
  const stepTimersRef = useRef([]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      stepTimersRef.current.forEach(clearTimeout);
    };
  }, []);

  const showReport = useCallback((result) => {
    setScanResult(result);
    setScanError('');
    setView('report');
  }, []);

  const showError = useCallback((errorMsg) => {
    setScanError(errorMsg);
    setView('landing');
  }, []);

  const startScan = useCallback(
    (url) => {
      // Reset state
      setScanUrl(url);
      setScanError('');
      setScanResult(null);
      setCompletedSteps(0);
      apiResultRef.current = null;
      apiDoneRef.current = false;
      animationDoneRef.current = false;
      stepTimersRef.current.forEach(clearTimeout);
      stepTimersRef.current = [];

      setView('scanning');

      // Start the API call immediately
      fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.status === 429) {
            throw new Error("You've reached the scan limit. Try again in an hour.");
          }
          if (!res.ok || !data.success) {
            throw new Error(data.error || 'Scan failed. Please try again.');
          }
          apiResultRef.current = data;
          apiDoneRef.current = true;

          // If animation is already done, show the report
          if (animationDoneRef.current) {
            showReport(data);
          }
        })
        .catch((err) => {
          apiDoneRef.current = true;
          apiResultRef.current = null;

          if (animationDoneRef.current) {
            showError(err.message || 'Something went wrong. Please try again.');
          }
        });

      // Start step animation with theatrical delays
      // Steps 0-4 complete on schedule. Step 5 (last) waits for API if needed.
      for (let i = 0; i < SCAN_STEPS.length; i++) {
        const timer = setTimeout(() => {
          setCompletedSteps(i + 1);

          // After the last step completes
          if (i === SCAN_STEPS.length - 1) {
            // Add a small final pause for polish
            const finishTimer = setTimeout(() => {
              animationDoneRef.current = true;

              if (apiDoneRef.current) {
                if (apiResultRef.current) {
                  showReport(apiResultRef.current);
                } else {
                  showError('Scan failed. Please try again.');
                }
              }
              // If API isn't done yet, the API callback will handle it
            }, 600);
            stepTimersRef.current.push(finishTimer);
          }
        }, STEP_DELAY_MS * (i + 1));

        stepTimersRef.current.push(timer);
      }
    },
    [showReport, showError]
  );

  const handleScanAgain = useCallback(() => {
    setView('landing');
    setScanResult(null);
    setScanUrl('');
    setScanError('');
    setCompletedSteps(0);
    stepTimersRef.current.forEach(clearTimeout);
    stepTimersRef.current = [];
  }, []);

  let content;
  if (view === 'scanning') {
    content = <ScanningView url={scanUrl} completedSteps={completedSteps} />;
  } else if (view === 'report' && scanResult) {
    content = <ReportView scanResult={scanResult} onScanAgain={handleScanAgain} />;
  } else {
    content = (
      <>
        <HeroAnalyzer onScan={startScan} />
        <Capabilities />
      </>
    );
  }

  return (
    <div className="page">
      <SiteHeader onHome={view !== 'landing' ? handleScanAgain : undefined} />
      <main className="page__main">{content}</main>
      <SiteFooter />

      {view === 'landing' && scanError && (
        <div className="toast" role="alert">
          <div className="analyzer__error">{scanError}</div>
        </div>
      )}
    </div>
  );
}
