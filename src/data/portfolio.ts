import { portfolioAssets } from './portfolio-assets.ts';
export type PortfolioStatus = 'active' | 'exit' | 'lessons-learned';
export type Startup = { id:string; name:string; macroSector:string; industry:string; status:PortfolioStatus; country:string|null; code:string|null; image:string; website:string|null; darkLogoTile:boolean };
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
// Countries intentionally unassigned: the user-supplied table contains no geography.
export const portfolio: Startup[] = rows.map(([id,name,macroSector,industry,status])=>({
  id,name,macroSector,industry,status,country:null,code:null,
  image: `./logos/${id}.svg`,
  website:portfolioAssets[id]?.website ?? null,
  darkLogoTile:portfolioAssets[id]?.darkLogoTile ?? false,
}));
export type StatDimension = 'country'|'macroSector'|'industry';
export type PortfolioSelection = {dimension:StatDimension;value:string}|null;
export const UNKNOWN_GEOGRAPHY='To be confirmed';
export function dimensionValue(startup:Startup,dimension:StatDimension):string { return startup[dimension] || UNKNOWN_GEOGRAPHY; }
export function selectPortfolio(selection:PortfolioSelection):Startup[] { return selection ? portfolio.filter(p=>dimensionValue(p,selection.dimension)===selection.value) : portfolio; }
export function statGroups(dimension:StatDimension) {
  const counts=new Map<string,number>();
  portfolio.forEach(p=>{const value=dimensionValue(p,dimension);counts.set(value,(counts.get(value)||0)+1);});
  return Array.from(counts,([value,count])=>({value,count})).sort((a,b)=>b.count-a.count||a.value.localeCompare(b.value));
}
// Compatibility for the retained, unused legacy map: no invented demo geographies.
export const countryCounts: {country:string;code:string;count:number}[]=[];
