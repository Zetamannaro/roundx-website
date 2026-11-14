import { useState } from 'react';
import { portfolio,selectPortfolio,statGroups,dimensionValue,UNKNOWN_GEOGRAPHY,type StatDimension,type PortfolioSelection } from '../data/portfolio';
const dimensions: {dimension:StatDimension;title:string}[]=[{dimension:'country',title:'geography'},{dimension:'macroSector',title:'macro-sector'},{dimension:'industry',title:'industry'}];
export default function PortfolioStats(){
  const [selection,setSelection]=useState<PortfolioSelection>(null);
  const matching=selectPortfolio(selection);
  const toggle=(dimension:StatDimension,value:string)=>setSelection(previous=>previous?.dimension===dimension&&previous.value===value?null:{dimension,value});
  return <>
    <div className="linked-stats-summary" aria-live="polite"><span>{matching.length} of {portfolio.length} companies</span>
      {selection?<button type="button" className="clear-stat-selection" onClick={()=>setSelection(null)}>{selection.value} <span aria-hidden="true">×</span><span className="sr-only">Clear selection</span></button>:<span className="stats-hint">Select a category to see the connections</span>}
    </div>
    <div className="stats-grid linked-stats">{dimensions.map(({dimension,title})=>{
      const groups=statGroups(dimension);
      const confirmed=dimension==='country'?groups.filter(g=>g.value!==UNKNOWN_GEOGRAPHY).length:groups.length;
      return <article className="stat-card linked-stat-card" key={dimension} aria-labelledby={`stat-${dimension}`}>
        <div className="stat-top"><h3 id={`stat-${dimension}`}>{title}</h3><span>{String(confirmed).padStart(2,'0')}</span></div>
        {dimension==='country'&&confirmed===0&&<p className="geography-pending">Country data awaiting confirmation.</p>}
        <div className="stat-options" role="group" aria-label={`Explore ${title}`}>{groups.map(group=>{
          const related=matching.filter(p=>dimensionValue(p,dimension)===group.value).length;
          const selected=selection?.dimension===dimension&&selection.value===group.value;
          const pending=dimension==='country'&&group.value===UNKNOWN_GEOGRAPHY;
          return <button key={group.value} type="button" aria-pressed={selected}
            className={`stat-option${selected?' is-selected':''}${selection&&related>0?' is-related':''}${selection&&related===0?' is-dimmed':''}${pending?' is-pending':''}`}
            onClick={()=>toggle(dimension,group.value)}><span>{group.value}</span><small>{selection?related:group.count}</small></button>;
        })}</div>
      </article>;
    })}</div>
  </>;
}
