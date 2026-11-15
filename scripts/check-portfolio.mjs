import assert from 'node:assert/strict';
import { grainientAtScroll, grainientPreset, grainientEndColors } from '../src/config/grainient.ts';
import { portfolio, statGroups, filterPortfolio, matchesDimension } from '../src/data/portfolio.ts';

assert.deepEqual(grainientAtScroll(0, 4000, 1000).colors, grainientPreset.colors);
assert.deepEqual(grainientAtScroll(3000, 4000, 1000).colors, grainientEndColors);
assert.equal(grainientAtScroll(1500, 4000, 1000).angle, 55);
assert.equal(grainientAtScroll(3000, 4000, 1000).angle, 55);
assert.deepEqual(grainientAtScroll(-100, 4000, 1000), grainientAtScroll(0, 4000, 1000));
assert.deepEqual(grainientAtScroll(9000, 4000, 1000), grainientAtScroll(3000, 4000, 1000));
assert.equal(grainientAtScroll(0, 1000, 1000).angle, 55);
assert.deepEqual(grainientAtScroll(1500, 4000, 1000).colors,
  ['#ffffff', '#c1c1c1', '#aaabaa', '#9b949b', '#91768f']);
assert.equal(grainientAtScroll(3000, 4000, 1000).flow, 2);

assert.equal(filterPortfolio({}).length, 24);
assert.deepEqual(portfolio.slice(0,7).map(company=>company.id),
  ['anthropic','startup-geeks','up2you','zappyrent','kampaay','timeflow','bezel']);
assert.deepEqual(filterPortfolio({country:'Italy', macroSector:'Financial Services', industry:'FinTech'}).map(s=>s.id), ['evenfi']);
assert.equal(filterPortfolio({country:'Switzerland', industry:'CleanTech'})[0].id, 'gemateg');
assert.equal(filterPortfolio({country:'Sweden', macroSector:'Enterprise Software'})[0].id, 'kampaay');
assert.deepEqual(filterPortfolio({country:'Sweden', industry:'FinTech'}), []);
// A facet's options are evaluated against the other two filters, allowing changes.
assert.deepEqual(filterPortfolio({country:'Sweden', industry:'FinTech'}, 'industry').map(s=>s.id), ['kampaay']);
assert.equal(filterPortfolio({industry:'CleanTech'}).filter(s=>matchesDimension(s,'country','Italy')).length, 2);
assert.deepEqual(['country', 'macroSector', 'industry'].map(d=>statGroups(d).length), [8, 9, 15]);
assert.equal(portfolio.filter(s=>s.status==='lessons-learned').length, 4);
assert.ok(portfolio.filter(s=>s.status==='lessons-learned').every(s=>s.website===null));
assert.ok(portfolio.find(s=>s.status==='exit').website);
console.log('PASS: scroll palettes/angle, clamps, compound filters, multi-country matching, facet totals and failed-company link removal.');

// Render the real grid through filter changes: every match must appear exactly once.
const {readFileSync} = await import('node:fs');
const {createRequire} = await import('node:module');
const require = createRequire(import.meta.url);
const ts = require('typescript');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const gridSource = readFileSync(new URL('../src/components/PortfolioGrid.tsx',import.meta.url),'utf8');
const compiledGrid = ts.transpileModule(gridSource,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
const gridModule = {exports:{}};
new Function('require','module','exports',compiledGrid)(require,gridModule,gridModule.exports);
const PortfolioGrid = gridModule.exports.default;
for (const filters of [{},{country:'Italy'},{country:'Italy',industry:'FinTech'},{country:'Sweden'},
  {country:'Sweden',industry:'FinTech'},{},{country:'USA'},{}]) {
  const companies = filterPortfolio(filters);
  const html = renderToStaticMarkup(React.createElement(PortfolioGrid,{companies}));
  const ids = [...html.matchAll(/data-company="([^"]+)"/g)].map(match=>match[1]);
  assert.deepEqual(ids,companies.map(company=>company.id));
  assert.equal(new Set(ids).size,ids.length);
  assert.equal([...html.matchAll(/<img /g)].length,companies.length);
}
for (const company of portfolio) {
  const html = renderToStaticMarkup(React.createElement(PortfolioGrid,{companies:[company]}));
  assert.ok(html.includes(company.image));
  assert.ok(html.includes('<h3>'));
  assert.ok(html.includes('company-card-details'));
  if(company.status==='lessons-learned'){
    assert.ok(!html.includes('<a '));
    assert.ok(html.includes('Lessons learned'));
  } else assert.ok(html.includes('<a '));
  if(company.status==='exit')assert.ok(html.includes('company-badge-exit'));
}
console.log('PASS: full/filter/empty/reset grid renders, unique cards, all SVGs, metadata, status badges and failed-company links.');
