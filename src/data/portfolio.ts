// Preview fixtures only. Replace with confirmed portfolio data before production.
export const geographies = [
  { country: 'Italy', code: 'it' }, { country: 'United States', code: 'us' },
  { country: 'United Kingdom', code: 'gb' }, { country: 'France', code: 'fr' },
  { country: 'Germany', code: 'de' }, { country: 'Spain', code: 'es' },
  { country: 'Netherlands', code: 'nl' }, { country: 'Sweden', code: 'se' },
];
export const industries = ['Healthtech', 'Fintech', 'Climate tech', 'AI & Software', 'Deep tech', 'Food & Agriculture'];
export const portfolio = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Startup ${String(i + 1).padStart(2, '0')}`,
  ...geographies[i % geographies.length],
  industry: industries[(i * 5 + Math.floor(i / 8)) % industries.length],
  image: `./images/scene-${(i * 3) % 8 + 1}.jpg`,
  placeholder: true,
}));
export type Startup = typeof portfolio[number];
export const countryCounts = geographies.map(g => ({ ...g, count: portfolio.filter(p => p.code === g.code).length }));
export const industryCounts = industries.map(industry => ({ industry, count: portfolio.filter(p => p.industry === industry).length }));
