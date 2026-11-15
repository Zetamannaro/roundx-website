import type { Startup } from '../data/portfolio';

export default function PortfolioGrid({companies}:{companies:Startup[]}) {
  return <ul className="company-grid" aria-label="Portfolio companies">
    {companies.map(company=>{
      const content = <>
        <div className="company-card-logo"><img src={company.image} alt="" loading="lazy" decoding="async" /></div>
        <h3>{company.name}</h3>
        <div className="company-card-details">
          <p>{company.country}</p>
          <p className="company-card-sector">{company.macroSector}</p>
          <p className="company-card-industry">{company.industry}</p>
        </div>
        <div className="company-card-footer">
          {company.status==='exit' && <span className="company-badge company-badge-exit">EXIT <span aria-hidden="true">↗</span></span>}
          {company.status==='lessons-learned' && <span className="company-badge company-badge-lesson">Lessons learned</span>}
        </div>
        {company.website && company.status!=='lessons-learned' && <span className="company-card-external" aria-hidden="true">↗</span>}
      </>;
      const className = `company-card company-card-${company.status}`;
      return <li key={company.id} data-company={company.id}>
        {company.website && company.status!=='lessons-learned' ?
          <a className={className} href={company.website} target="_blank" rel="noopener noreferrer">
            {content}<span className="sr-only">Visit website (opens in a new tab)</span>
          </a> : <article className={className}>{content}</article>}
      </li>;
    })}
  </ul>;
}
