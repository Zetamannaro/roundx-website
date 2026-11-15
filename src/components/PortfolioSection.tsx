import { useMemo, useState } from 'react';
import PortfolioStats from './PortfolioStats';
import PortfolioGrid from './PortfolioGrid';
import { portfolio, filterPortfolio, type PortfolioFilters } from '../data/portfolio';

export default function PortfolioSection() {
  const [filters,setFilters] = useState<PortfolioFilters>({});
  const matching = useMemo(()=>filterPortfolio(filters),[filters]);
  const filtered = Object.values(filters).some(Boolean);
  return <section className="portfolio-section" id="portfolio" aria-labelledby="portfolio-title">
    <div className="section-heading section"><h2 id="portfolio-title">Portfolio</h2></div>
    <div className="portfolio-explorer section">
      <PortfolioStats filters={filters} onChange={setFilters} />
      <div className="portfolio-results">
        <p role="status" aria-live="polite">{matching.length} of {portfolio.length} companies</p>
        {filtered && <button type="button" onClick={()=>setFilters({})}>Clear filters <span aria-hidden="true">×</span></button>}
      </div>
      <div id="portfolio-grid" className="portfolio-grid-container" aria-label="Filtered portfolio">
        {matching.length ? <PortfolioGrid companies={matching} /> :
          <p className="portfolio-empty">No companies match these filters. Clear a filter to explore more.</p>}
      </div>
    </div>
  </section>;
}
