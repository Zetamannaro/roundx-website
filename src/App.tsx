import { lazy, Suspense, useEffect, useState } from 'react';
import PortfolioSection from './components/PortfolioSection';
import { grainientAtScroll, grainientPreset } from './config/grainient';
const Grainient = lazy(() => import('./components/reactbits/Grainient'));

export default function App() {
  const [reduced, setReduced] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [backgroundSettings, setBackgroundSettings] = useState(()=>grainientAtScroll(0, 0, 0));
  useEffect(() => {
    const heroSubtitle = document.querySelector<HTMLElement>('#hero h2');
    const portfolioTitle = document.getElementById('portfolio-title');
    if (!heroSubtitle || !portfolioTitle) return;
    let disposed = false;
    const measureSectionGap = () => {
      if (disposed) return;
      const gap = portfolioTitle.getBoundingClientRect().top - heroSubtitle.getBoundingClientRect().bottom;
      if (gap > 0) document.documentElement.style.setProperty('--section-separation', `${gap}px`);
    };
    const observer = new ResizeObserver(measureSectionGap);
    observer.observe(heroSubtitle);
    observer.observe(portfolioTitle);
    window.addEventListener('resize', measureSectionGap);
    document.fonts.ready.then(measureSectionGap);
    measureSectionGap();
    return () => { disposed = true; observer.disconnect(); window.removeEventListener('resize', measureSectionGap); document.documentElement.style.removeProperty('--section-separation'); };
  }, []);
  useEffect(() => {
    let frame = 0;
    const syncScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        setBackgroundSettings(grainientAtScroll(window.scrollY, document.documentElement.scrollHeight, window.innerHeight));
      });
    };
    syncScroll();
    window.addEventListener('scroll', syncScroll, { passive: true });
    window.addEventListener('resize', syncScroll);
    const observer = new ResizeObserver(syncScroll);
    observer.observe(document.body);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', syncScroll); window.removeEventListener('resize', syncScroll); };
  }, []);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);
    sync(); query.addEventListener('change', sync);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2');
    setWebgl(!!context); context?.getExtension('WEBGL_lose_context')?.loseContext();
    return () => query.removeEventListener('change', sync);
  }, []);
  return (
    <>
      <div className="site-background" aria-hidden="true" style={{background:`linear-gradient(${backgroundSettings.angle}deg,${backgroundSettings.colors.join(',')})`}}><Suspense fallback={null}>
        {webgl && <Grainient {...grainientPreset} {...backgroundSettings}
          speed={reduced ? 0 : grainientPreset.speed} grainAnimated={!reduced}
          interactive={!reduced} clickSwirl={!reduced} intro={!reduced} />}
      </Suspense></div>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}><div className="header-inner">
        <a href="#hero" aria-label="RoundX home"><img src="./roundx-logo.svg" className="logo" alt="RoundX" width="178" height="61" /></a>
        <nav aria-label="Page sections"><a href="#portfolio">Portfolio</a><a href="#contacts">Contacts</a></nav>
      </div></header>
      <main id="main">
        <section className="hero section" id="hero" aria-labelledby="hero-title">
          <h1 id="hero-title"><span>Beyond the <strong>obvious</strong>,</span><span>before the <strong>crowd</strong></span></h1>
          <h2>A <strong>micro venture</strong> fund born as a startup, investing in startups</h2>
        </section>

        <PortfolioSection />

        <section className="contacts section" id="contacts" aria-labelledby="contacts-title">
          <h2 id="contacts-title">Contacts</h2>
          <div className="contact-rows">
            <p><strong>Office:</strong><span>via Monte Napoleone 21, Milano (Italy) - 20121</span></p>
            <p><strong>E-mail:</strong><a href="mailto:info@roundx.io">info@roundx.io</a></p>
          </div>
          <div className="social"><p>Follow us on</p><a href="https://www.linkedin.com/company/roundx/" target="_blank" rel="noopener noreferrer" aria-label="RoundX on LinkedIn (opens in a new tab)"><span className="linkedin-icon" aria-hidden="true">in</span> LinkedIn <span aria-hidden="true">↗</span></a></div>
        </section>
      </main>
      <footer className="site-footer section"><img src="./roundx-logo.svg" alt="RoundX" width="112" height="36" /><span>© {new Date().getFullYear()} RoundX</span>
        <label className="motion-preference" title="Pause background animation and cursor effects"><input type="checkbox" checked={reduced} onChange={e => setReduced(e.target.checked)} /> Reduce motion</label>
      </footer>
    </>
  );
}
