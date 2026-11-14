import { portfolioAssets } from './portfolio-assets.ts';
export type PortfolioStatus = 'active' | 'exit' | 'lessons-learned';
export type Startup = { id:string; name:string; macroSector:string; industry:string; status:PortfolioStatus; countries:string[]; country:string; code:string|null; image:string; website:string|null; darkLogoTile:boolean };
const rows: [string,string,string,string,PortfolioStatus][] = [
  [
    "up2you",
    "Up2You",
    "Climate & Sustainability",
    "ClimateTech",
    "active"
  ],
  [
    "zappyrent",
    "Zappyrent",
    "Real Estate",
    "PropTech",
    "active"
  ],
  [
    "kampaay",
    "Kampaay",
    "Enterprise Software",
    "B2B SaaS",
    "active"
  ],
  [
    "lokky",
    "Lokky",
    "Financial Services",
    "InsurTech",
    "exit"
  ],
  [
    "evenfi",
    "Evenfi",
    "Financial Services",
    "FinTech",
    "active"
  ],
  [
    "rad",
    "RAD",
    "Enterprise Software",
    "MarTech / AdTech",
    "active"
  ],
  [
    "wiseair",
    "Wiseair",
    "Climate & Sustainability",
    "CleanTech",
    "active"
  ],
  [
    "ih1",
    "IH1",
    "Financial Services",
    "Venture Building",
    "active"
  ],
  [
    "vitameals",
    "Vitameals",
    "Consumer & Food",
    "FoodTech",
    "active"
  ],
  [
    "perfekto",
    "Perfekto",
    "Consumer & Food",
    "FoodTech",
    "lessons-learned"
  ],
  [
    "textyess",
    "TextYess",
    "Enterprise Software",
    "MarTech / AdTech",
    "active"
  ],
  [
    "xworks",
    "XWorks",
    "Climate & Sustainability",
    "CleanTech",
    "lessons-learned"
  ],
  [
    "timeflow",
    "TimeFlow",
    "Enterprise Software",
    "B2B SaaS",
    "active"
  ],
  [
    "startup-geeks",
    "Startup Geeks",
    "Education",
    "EdTech",
    "active"
  ],
  [
    "gemateg",
    "GemaTEG",
    "Climate & Sustainability",
    "CleanTech",
    "active"
  ],
  [
    "moonstone",
    "Moonstone",
    "Financial Services",
    "Venture Capital",
    "active"
  ],
  [
    "cooabit",
    "Cooabit",
    "Real Estate",
    "PropTech",
    "active"
  ],
  [
    "jack-fertility",
    "Jack Fertility",
    "Healthcare",
    "Digital Health",
    "active"
  ],
  [
    "bezel",
    "Bezel",
    "Consumer & Retail",
    "E-commerce Tech",
    "active"
  ],
  [
    "picterus",
    "Picterus",
    "Healthcare",
    "MedTech",
    "active"
  ],
  [
    "cents",
    "Cents",
    "Financial Services",
    "FinTech",
    "lessons-learned"
  ],
  [
    "immobiliallasta",
    "Immobiliallasta",
    "Real Estate",
    "PropTech",
    "lessons-learned"
  ],
  [
    "climefi",
    "ClimeFi",
    "Climate & Sustainability",
    "ClimateTech",
    "active"
  ],
  [
    "anthropic",
    "Anthropic",
    "Artificial Intelligence",
    "Foundation Models",
    "active"
  ]
];
// RoundX-supplied geographies. Multi-country companies belong to each country,
// while company totals always count each company once.
const geographies: Record<string,string[]> = {
  up2you:['Italy'], zappyrent:['Italy'], kampaay:['Italy','Sweden'],
  lokky:['Italy'], evenfi:['Italy'], rad:['USA'], wiseair:['Italy'],
  ih1:['Italy'], vitameals:['Italy'], perfekto:['Mexico'], textyess:['Italy'],
  xworks:['UK'], timeflow:['Italy'], 'startup-geeks':['Italy'],
  gemateg:['USA','Italy','Switzerland'], moonstone:['Italy'], cooabit:['Italy'],
  'jack-fertility':['UK'], bezel:['USA'], picterus:['Norway'], cents:['USA'],
  immobiliallasta:['Italy'], climefi:['France'], anthropic:['USA'],
};
const countryCodes: Record<string,string> = {Italy:'it',Sweden:'se',USA:'us',Mexico:'mx',UK:'gb',Switzerland:'ch',Norway:'no',France:'fr'};
export const portfolio: Startup[] = rows.map(([id,name,macroSector,industry,status])=>({
  id,name,macroSector,industry,status,countries:geographies[id],
  country:geographies[id].join(' / '),code:countryCodes[geographies[id][0]],
  image: `./logos/${id}.svg`,
  website:portfolioAssets[id]?.website ?? null,
  darkLogoTile:portfolioAssets[id]?.darkLogoTile ?? false,
}));
export type StatDimension = 'country'|'macroSector'|'industry';
export type PortfolioSelection = {dimension:StatDimension;value:string}|null;
export function dimensionValues(startup:Startup,dimension:StatDimension):string[] { return dimension==='country' ? startup.countries : [startup[dimension]]; }
export function matchesDimension(startup:Startup,dimension:StatDimension,value:string):boolean { return dimensionValues(startup,dimension).includes(value); }
export function selectPortfolio(selection:PortfolioSelection):Startup[] { return selection ? portfolio.filter(p=>matchesDimension(p,selection.dimension,selection.value)) : portfolio; }
export function statGroups(dimension:StatDimension) {
  const counts=new Map<string,number>();
  portfolio.forEach(p=>dimensionValues(p,dimension).forEach(value=>counts.set(value,(counts.get(value)||0)+1)));
  return Array.from(counts,([value,count])=>({value,count})).sort((a,b)=>b.count-a.count||a.value.localeCompare(b.value));
}
export const countryCounts = statGroups('country').map(({value,count})=>({country:value,code:countryCodes[value],count}));
