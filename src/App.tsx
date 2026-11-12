import { lazy, Suspense, useEffect, useState, type CSSProperties } from 'react';
import GeoMap from './components/GeoMap';
import { portfolio, countryCounts, industryCounts } from './data/portfolio';
import { glowingWaveConfig } from './config/glowing-wave';
const CircularGallery = lazy(() => import('./components/reactbits/CircularGallery'));
const galleryItems = portfolio.map(p => ({ image: p.image, text: p.name, description: `${p.country} · ${p.industry}`, alt: `Placeholder image for ${p.name}` }));
const number = (n: number) => String(n).padStart(2, '0');

export default function App() {
  const [activeCountry, setActiveCountry] = useState('it');
  const [activeIndustry, setActiveIndustry] = useState(industryCounts[0].industry);
  const [activeStartup, setActiveStartup] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const syncHeader = () => setScrolled(window.scrollY > 24);
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });
    return () => window.removeEventListener('scroll', syncHeader);
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
  const currentCountry = countryCounts.find(g => g.code === activeCountry)!;
  const currentStartup = portfolio[activeStartup];
  return (
    <>
      {/* Static fallback until the licensed Glowing Wave source can be installed in a private repository. */}
      <div className="site-background" style={{ backgroundColor: glowingWaveConfig.backgroundColor }} aria-hidden="true" />
      <a href="#main" className="skip-link">Skip to content</a>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}><div className="header-inner">
        <a href="#hero" aria-label="RoundX home"><img src="./roundx-logo.svg" className="logo" alt="RoundX" width="178" height="61" /></a>
        <nav aria-label="Page sections"><a href="#stats">Perspectives</a><a href="#portfolio">Portfolio</a><a href="#contacts">Contacts</a></nav>
      </div></header>
      <main id="main">
        <section className="hero section" id="hero" aria-labelledby="hero-title">
          <h1 id="hero-title"><span>Beyond the <strong>obvious</strong>,</span><span>before the <strong>crowd</strong></span></h1>
          <h2>A <strong>micro venture</strong> fund born as a startup, investing in startups – we understand the journey because we’re on it too</h2>
        </section>

        <section className="stats section" id="stats" aria-labelledby="stats-title">
          <div className="section-heading"><p className="eyebrow">01 / PERSPECTIVES</p><h2 id="stats-title">Different worlds.<br /><span>Connected by possibility.</span></h2>
          <p className="demo-note">Preview: illustrative countries, industries and startups. Figures below are not verified RoundX portfolio data.</p></div>
          <div className="stats-grid">
            <article className="stat-card geography-card">
              <div className="stat-top"><h3>geographies</h3><span>{number(countryCounts.length)}</span></div>
              <GeoMap activeCountry={activeCountry} onExplore={setActiveCountry} />
              <div className="stat-readout" aria-live="polite"><strong>{currentCountry.country}</strong><span>{currentCountry.count} startups</span></div>
              <div className="country-grid" role="radiogroup" aria-label="Explore geographies">{countryCounts.map(g => <label key={g.code}
                className={g.code === activeCountry ? 'active' : ''} onMouseEnter={() => setActiveCountry(g.code)}><input className="sr-only" type="radio" name="geography" value={g.code} checked={g.code === activeCountry} onChange={() => setActiveCountry(g.code)} /><span>{g.country}</span><small>{number(g.count)}</small></label>)}</div>
              <p className="map-credit">Map: <a href="https://mapsvg.com/maps/world" target="_blank" rel="noopener noreferrer">MapSVG</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a> · colors adapted</p>
            </article>
            <article className="stat-card">
              <div className="stat-top"><h3>industries</h3><span>{number(industryCounts.length)}</span></div>
              <div className="industry-list" role="group" aria-label="Explore industries">{industryCounts.map(g => <label key={g.industry} className={g.industry === activeIndustry ? 'active' : ''}
                onMouseEnter={() => setActiveIndustry(g.industry)}><input className="sr-only" type="radio" name="industry" checked={g.industry === activeIndustry} onChange={() => setActiveIndustry(g.industry)} />
                <span className="industry-label"><span>{g.industry}</span><small>{number(g.count)}</small></span>
                <span className="bar-track"><span style={{ '--share': `${g.count / portfolio.length * 100}%` } as CSSProperties} /></span></label>)}</div>
              <p className="stat-footnote">Explore the sectors. Every perspective opens a different door.</p>
            </article>
            <article className="stat-card">
              <div className="stat-top"><h3>startups</h3><span>{number(portfolio.length)}</span></div>
              <div className="startup-grid" role="group" aria-label="Explore startups">{portfolio.map((p,i) => <label key={p.id} className={i === activeStartup ? 'active' : ''}
                onMouseEnter={() => setActiveStartup(i)}><input className="sr-only" type="radio" name="startup" checked={i === activeStartup} onChange={() => setActiveStartup(i)} aria-label={`${p.name}, ${p.country}, ${p.industry}`} />{number(p.id)}</label>)}</div>
              <div className="startup-readout" aria-live="polite"><strong>{currentStartup.name}</strong><span>{currentStartup.country}</span><small>{currentStartup.industry}</small></div>
              <p className="stat-footnote">Every square, a different journey.<br />Hover, tap or use arrow keys to explore.</p>
            </article>
          </div>
        </section>

        <section className="portfolio-section" id="portfolio" aria-labelledby="portfolio-title">
          <div className="section-heading section"><p className="eyebrow">02 / PORTFOLIO</p><h2 id="portfolio-title">The next wave<br /><span>starts with them.</span></h2>
            <p className="section-subtitle">Different ideas. Different origins. A shared drive to build.</p></div>
          <div className="gallery-shell">
            {webgl ? <Suspense fallback={<p className="gallery-loading">Loading portfolio…</p>}><CircularGallery items={galleryItems}
              bend={1.25} textColor="#000000" borderRadius={0.06} font="500 18px Poppins"
              scrollSpeed={1.5} itemSize={0.65} itemAspect={1.25} gap={0.14} wave={0.4}
              fadeEdges={0.035} autoScroll={0} openOnClick={false} intro={!reduced} dpr={1.5}
              onActiveChange={setGalleryIndex} aria-label="RoundX illustrative portfolio. Drag horizontally or use arrow keys." /></Suspense> :
              <div className="fallback-gallery">{portfolio.map(p => <article key={p.id}><img src={p.image} alt={`Placeholder for ${p.name}`} loading="lazy" /><h3>{p.name}</h3><p>{p.country} · {p.industry}</p></article>)}</div>}
          </div>
          <div className="gallery-meta section"><span>DRAG TO EXPLORE <span aria-hidden="true">↔</span></span><span>{number(galleryIndex + 1)} <i>/ {portfolio.length}</i></span></div>
          <p className="portfolio-note section">25 placeholder positions · sample imagery, countries and industries to be replaced with confirmed portfolio data.</p>
        </section>

        <section className="contacts section" id="contacts" aria-labelledby="contacts-title">
          <p className="eyebrow">03 / CONTACTS</p><h2 id="contacts-title">Contacts<span>.</span></h2>
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
