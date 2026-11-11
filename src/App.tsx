import { useState } from 'react';
import Threads from './components/reactbits/Threads';
const Arrow = () => <span aria-hidden="true">↗</span>;
export default function App() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="header">
        <a className="wordmark" href="#main" aria-label="RoundX home">round<span>x</span></a>
        <span className="header-note">Independent minds.<br />Shared ambition.</span>
        <a className="contact-link" href="mailto:info@roundx.io">Let’s talk <Arrow /></a>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-art" aria-hidden="true">
            <Threads color="#d18b63" accentColor="#f4d4a9" amplitude={1.2} distance={0.24}
              angle={-18} lineCount={65} thickness={0.8} softness={0.6}
              speed={0.28} waves={0.8} split={0.1} fray={0.6} brightness={1.5}
              opacity={0.85} enableMouseInteraction paused={paused} />
          </div>
          <div className="hero-wash" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow"><span /> MICRO VENTURE. MACRO AMBITION.</p>
            <h1 id="hero-title">Beyond the<br /><strong>obvious</strong>,<br />before the <strong>crowd</strong></h1>
            <div className="hero-bottom">
              <div className="intro">
                <h2>A <strong>micro venture</strong> fund born as a startup, investing in startups – we understand the journey because we’re on it too</h2>
                <a className="primary-link" href="mailto:info@roundx.io">Start a conversation <Arrow /></a>
              </div>
              <div className="art-caption"><span className="caption-line" />Different paths.<br />Uncommon possibilities.</div>
            </div>
          </div>
          <div className="hero-footer">
            <span>EARLY STAGE. OPEN HORIZONS.</span>
            <button className="motion-toggle" type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}>
              <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span> {paused ? 'Resume motion' : 'Pause motion'}
            </button>
            <span>MILANO · EVERYWHERE</span>
          </div>
        </section>
      </main>
      <footer className="page-footer"><span>© {new Date().getFullYear()} RoundX</span><a href="mailto:info@roundx.io">info@roundx.io <Arrow /></a></footer>
    </div>
  );
}
