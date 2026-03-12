import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import App from './App.jsx'

// Single point of registration for all GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Global runtime error logging for debugging
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
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
        hypothesisId: 'GEN',
        location: 'main.jsx:16',
        message: 'Global error event',
        data: {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => { });
    // #endregion agent log
  });

  window.addEventListener('unhandledrejection', (event) => {
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
        hypothesisId: 'GEN',
        location: 'main.jsx:32',
        message: 'Unhandled promise rejection',
        data: {
          reason: event.reason ? String(event.reason) : null,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => { });
    // #endregion agent log
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
