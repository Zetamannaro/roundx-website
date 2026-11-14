import { lazy, Suspense, useEffect, useState } from 'react';
import PortfolioStats from './components/PortfolioStats';
import { portfolio } from './data/portfolio';
import { grainientAtScroll, grainientPreset } from './config/grainient';
const Grainient = lazy(() => import('./components/reactbits/Grainient'));
const CircularGallery = lazy(() => import('./components/reactbits/CircularGallery'));
const galleryItems = portfolio.map(p => ({ image:p.image, text:p.name, description:`${p.country || 'Geography to confirm'} · ${p.industry}`, alt:`${p.name} logo`, url:p.website || undefined, outcome:p.status, darkTile:p.darkLogoTile }));
const number = (n: number) => String(n).padStart(2, '0');

export default function App() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [backgroundSettings, setBackgroundSettings] = useState({ angle: 55, flow: 0.8 });
  useEffect(() => {
    const heroSubtitle = document.querySelector<HTMLElement>('#hero h2');
    const statsTitle = document.getElementById('stats-title');
    if (!heroSubtitle || !statsTitle) return;
    let disposed = false;
    const measureSectionGap = () => {
      if (disposed) return;
      const gap = statsTitle.getBoundingClientRect().top - heroSubtitle.getBoundingClientRect().bottom;
      if (gap > 0) document.documentElement.style.setProperty('--section-separation', `${gap}px`);
    };
    const observer = new ResizeObserver(measureSectionGap);
    observer.observe(heroSubtitle);
    observer.observe(statsTitle);
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
      <div className="site-background" aria-hidden="true"><Suspense fallback={null}>
        {webgl && <Grainient {...grainientPreset} {...backgroundSettings}
          speed={reduced ? 0 : grainientPreset.speed} grainAnimated={!reduced}
          interactive={!reduced} clickSwirl={!reduced} intro={!reduced} />}
      </Suspense></div>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}><div className="header-inner">
        <a href="#hero" aria-label="RoundX home"><img src="./roundx-logo.svg" className="logo" alt="RoundX" width="178" height="61" /></a>
        <nav aria-label="Page sections"><a href="#stats">Perspectives</a><a href="#portfolio">Portfolio</a><a href="#contacts">Contacts</a></nav>
      </div></header>
      <main id="main">
        <section className="hero section" id="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
          <h1 id="hero-title"><span>Beyond the <strong>obvious</strong>,</span><span>before the <strong>crowd</strong></span></h1>
          <h2>A <strong>micro venture</strong> fund born as a startup, investing in startups</h2>
          </div>
        </section>

        <section className="stats section" id="stats" aria-labelledby="stats-title">
          <div className="section-heading"><h2 id="stats-title">Some Stats</h2></div>
          <PortfolioStats />
        </section>

        <section className="portfolio-section" id="portfolio" aria-labelledby="portfolio-title">
          <div className="section-heading section"><h2 id="portfolio-title">Portfolio</h2></div>
          <div className="gallery-shell">
            {webgl ? <Suspense fallback={<p className="gallery-loading">Loading portfolio…</p>}><CircularGallery items={galleryItems}
              bend={1.25} textColor="#000000" borderRadius={0.06} font="500 18px Poppins"
              scrollSpeed={1.5} itemSize={0.65} itemAspect={1.25} gap={0.14} wave={0.4}
              fadeEdges={0.035} autoScroll={0} openOnClick={false} intro={!reduced} dpr={1.5}
              onItemClick={item => { if (item.url) window.open(item.url, '_blank', 'noopener,noreferrer'); }}
              onActiveChange={setGalleryIndex} aria-label="RoundX portfolio. Drag horizontally or use arrow keys. Click an image to visit the company website." /></Suspense> :
              <div className="fallback-gallery">{portfolio.map(p => <article key={p.id} className={`portfolio-card outcome-${p.status}`}><a href={p.website || undefined} target="_blank" rel="noopener noreferrer" aria-label={p.website ? `Visit ${p.name} website (opens in a new tab)` : `${p.name}: website unavailable`}><div className={`logo-tile${p.darkLogoTile?' is-dark':''}`}><img src={p.image} alt={`${p.name} logo`} loading="lazy" /></div></a><h3>{p.name}</h3><p>{p.country || 'Geography to confirm'} · {p.industry}</p>{p.status!=='active' && <span className={`portfolio-outcome ${p.status}`}>{p.status==='exit'?'EXIT ↗':'Lessons learned'}</span>}</article>)}</div>}
          </div>
          <div className="gallery-meta section"><span>DRAG TO EXPLORE <span aria-hidden="true">↔</span></span><span>{number(galleryIndex + 1)} <i>/ {portfolio.length}</i></span></div>
          <p className="portfolio-note section">{portfolio.length} companies · Country information awaiting confirmation. Statuses supplied by RoundX.</p>
        </section>

        <section className="contacts section" id="contacts" aria-labelledby="contacts-title">
          <h2 id="contacts-title">Contacts<span>.</span></h2>
          <div className="contact-rows">
            <p><strong>Office:</strong><span>via Monte Napoleone 21, Milano (Italy) - 20121</span></p>
            <p><strong>E-mail:</strong><a href="mailto:info@roundx.io">info@roundx.io</a></p>
          </div>
          <div className="social"><p>Follow us on</p><a href="https://www.linkedin.com/company/roundx/" target="_blank" rel="noopener noreferrer" aria-label="RoundX on LinkedIn (opens in a new tab)"><span className="linkedin-icon" aria-hidden="true">in</span> LinkedIn <span aria-hidden="true">↗</span></a></div>
        </section>
      </main>
      <footer className="site-footer section"><img src="./roundx-logo.svg" alt="RoundX" width="112" height="36" /><span>© {new Date().getFullYear()} RoundX</span>
        <label className="motion-preference"><input type="checkbox" checked={reduced} onChange={e => setReduced(e.target.checked)} /> Reduce motion</label>
      </footer>
    </>
  );
}
