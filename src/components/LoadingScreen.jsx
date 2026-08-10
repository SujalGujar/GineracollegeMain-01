import React from 'react';
import { createPortal } from 'react-dom';
import gineraLogo2 from '../images/ginera-logo2.png';

// Render into document.body so page animation/stacking contexts can never
// cover this loader. It is deliberately high-contrast and visible on every
// navigation while the destination page is fetching its API data.
const LoadingScreen = () => createPortal(
  <div
    role="status"
    aria-live="polite"
    aria-label="Loading page data"
    style={{
      position: 'fixed', inset: 0, zIndex: 2147483647,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(15, 23, 42, 0.92)', backdropFilter: 'blur(5px)',
    }}
  >
    <div style={{ width: 'min(440px, calc(100vw - 40px))', textAlign: 'center', color: '#fff' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 90, height: 90, borderRadius: 24, background: '#fff', boxShadow: '0 18px 50px rgba(0,0,0,.35)' }}>
        <img src={gineraLogo2} alt="Ginera College" style={{ width: 70, height: 70, objectFit: 'contain' }} />
      </div>
      <div style={{ margin: '24px auto 14px', width: 48, height: 48, border: '5px solid rgba(255,255,255,.28)', borderTopColor: '#f59e0b', borderRadius: '50%', animation: 'ginera-loader-spin .8s linear infinite' }} />
      <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>Loading page data…</h2>
      <p style={{ margin: '9px 0 24px', color: '#cbd5e1', fontSize: 15 }}>Please wait while we load the latest information.</p>
      <div style={{ display: 'grid', gap: 10 }}>
        {[100, 82, 68].map((width, index) => (
          <div key={index} style={{ width: `${width}%`, height: 13, margin: '0 auto', borderRadius: 99, background: 'linear-gradient(90deg, #334155 25%, #64748b 50%, #334155 75%)', backgroundSize: '200% 100%', animation: `ginera-skeleton 1.2s ease-in-out ${index * .12}s infinite` }} />
        ))}
      </div>
    </div>
    <style>{`@keyframes ginera-loader-spin { to { transform: rotate(360deg); } } @keyframes ginera-skeleton { from { background-position: 200% 0; } to { background-position: -200% 0; } }`}</style>
  </div>,
  document.body,
);

export default LoadingScreen;
