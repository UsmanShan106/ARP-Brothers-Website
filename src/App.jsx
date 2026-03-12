import React, { Suspense, useLayoutEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import './App.css';

// Lazily load heavy sections to reduce initial bundle size
const Hero = React.lazy(() => import('./components/Hero'));
const Methodology = React.lazy(() => import('./components/Methodology'));
const Ventures = React.lazy(() => import('./components/Ventures'));
const Architecture = React.lazy(() => import('./components/Architecture'));
const Partners = React.lazy(() => import('./components/Partners'));
const Aspiration = React.lazy(() => import('./components/Aspiration'));
const StarsBackground = React.lazy(() => import('./components/StarsBackground'));

function App() {
  // Memoized Lenis Initialization
  useLayoutEffect(() => {
    // Advanced Performance Settings for Lenis
    const lenis = new Lenis({
      duration: 1.1, // Faster duration for more responsiveness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9, // Slightly reduced for smoother engagement
      lerp: 0.1, // Direct lerp control for consistent feel
      syncTouch: true, // Improved touch performance
      touchInertiaMultiplier: 1.5,
      infinite: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // #region agent log
    fetch('http://127.0.0.1:7714/ingest/4a86ba09-f794-4c19-a298-02356a5e2b9c', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Debug-Session-Id': '9e17ce',
      },
      body: JSON.stringify({
        sessionId: '9e17ce',
        runId: 'initial',
        hypothesisId: 'H3',
        location: 'App.jsx:32',
        message: 'Lenis initialized and RAF started',
        data: {},
        timestamp: Date.now(),
      }),
    }).catch(() => { });
    // #endregion agent log

    // Optimize Window Resizing
    const handleResize = () => {
      lenis.resize();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app-container">
      {/* StarsBackground is lazy-loaded to avoid blocking first paint */}
      <Suspense fallback={null}>
        <StarsBackground />
      </Suspense>
      <Navbar />
      <main>
        <Suspense fallback={null}>
          <Hero />
          <Methodology />
          <Ventures />
          <Architecture />
          <Partners />
          <Aspiration />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
