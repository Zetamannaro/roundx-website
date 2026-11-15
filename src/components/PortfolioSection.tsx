import { lazy, Suspense, useMemo, useState } from 'react';
import PortfolioStats from './PortfolioStats';
import { portfolio, filterPortfolio, type PortfolioFilters } from '../data/portfolio';
const DriftWall = lazy(()=>import('./reactbits/DriftWall'));

export default function PortfolioSection({reduced}:{reduced:boolean}) {
  const [filters,setFilters] = useState<PortfolioFilters>({});
  const matching = useMemo(()=>filterPortfolio(filters),[filters]);
  const items = useMemo(()=>matching.map(startup=>({
    id:startup.id, image:startup.image, title:startup.name,
    href:startup.website || undefined, status:startup.status,
    geography:startup.country, macroSector:startup.macroSector, industry:startup.industry,
  })),[matching]);
  const filtered = Object.values(filters).some(Boolean);
  return <section className="portfolio-section" id="portfolio" aria-labelledby="portfolio-title">
    <div className="section-heading section"><h2 id="portfolio-title">Portfolio</h2></div>
    <div className="portfolio-explorer section">
      <PortfolioStats filters={filters} onChange={setFilters} />
      <div className="portfolio-results">
        <p role="status" aria-live="polite">{matching.length} of {portfolio.length} companies</p>
        {filtered && <button type="button" onClick={()=>setFilters({})}>Clear filters <span aria-hidden="true">×</span></button>}
      </div>
      <div id="portfolio-wall" className="portfolio-wall" aria-label="Filtered portfolio">
        {matching.length ? <Suspense fallback={<p className="wall-loading">Loading portfolio…</p>}>
          <DriftWall items={items} columns={4} tileWidth={270} tileHeight={300} gap={20}
            tilt={8} turn={-8} depth={65} perspective={1500} speed={24}
            parallax={0.4} pauseOnHover={false} lift={35} fade={0.12} dim={1}
            overlayColor="transparent" reducedMotion={reduced} />
        </Suspense> : <p className="portfolio-empty">No companies match these filters. Clear a filter to explore more.</p>}
      </div>
    </div>
  </section>;
}
