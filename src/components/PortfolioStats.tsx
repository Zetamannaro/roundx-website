import { useId } from 'react';
import { filterPortfolio, statGroups, matchesDimension, type StatDimension, type PortfolioFilters } from '../data/portfolio';

const dimensions: {dimension:StatDimension;title:string;all:string}[] = [
  {dimension:'country',title:'Geography',all:'All geographies'},
  {dimension:'macroSector',title:'Macro-sector',all:'All macro-sectors'},
  {dimension:'industry',title:'Industry',all:'All industries'},
];

export default function PortfolioStats({filters,onChange}:{filters:PortfolioFilters;onChange:(next:PortfolioFilters)=>void}) {
  const id = useId();
  return <div className="portfolio-filters" role="group" aria-label="Filter portfolio">
    {dimensions.map(({dimension,title,all}) => {
      const groups = statGroups(dimension);
      const related = filterPortfolio(filters,dimension);
      return <div className="portfolio-filter" key={dimension}>
        <label htmlFor={`${id}-${dimension}`}>{title}<span aria-label={`${groups.length} total`}>{String(groups.length).padStart(2,'0')}</span></label>
        <select id={`${id}-${dimension}`} value={filters[dimension] || ''} aria-controls="portfolio-grid"
          onChange={event=>onChange({...filters,[dimension]:event.target.value})}>
          <option value="">{all}</option>
          {groups.map(({value})=>{
            const count = related.filter(startup=>matchesDimension(startup,dimension,value)).length;
            return <option key={value} value={value} disabled={count===0 && filters[dimension]!==value}>{value} ({count})</option>;
          })}
        </select>
      </div>;
    })}
  </div>;
}
