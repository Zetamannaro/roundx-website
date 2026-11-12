import { useEffect, useRef, useState } from 'react';
import { countryCounts } from '../data/portfolio';
type MapData = { viewBox: string; locations: { id: string; name: string; path: string }[] };

export default function GeoMap({ activeCountry, onExplore }: { activeCountry: string; onExplore: (code: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<MapData | null>(null);
  useEffect(() => {
    let alive = true;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      observer.disconnect();
      import('@svg-maps/world').then(m => { if (alive) setMap(m.default); });
    }, { rootMargin: '250px' });
    if (ref.current) observer.observe(ref.current);
    return () => { alive = false; observer.disconnect(); };
  }, []);
  return <div ref={ref} className="map-shell">{map && <svg viewBox={map.viewBox} className="world-map" role="img" aria-label={`Illustrative portfolio geographies. Selected: ${countryCounts.find(c => c.code === activeCountry)?.country}`}>
    {map.locations.map(location => <path key={location.id} d={location.path}
      className={location.id === activeCountry ? 'selected' : countryCounts.some(g => g.code === location.id) ? 'represented' : ''}
      onMouseEnter={() => countryCounts.some(g => g.code === location.id) && onExplore(location.id)} />)}
  </svg>}</div>;
}
