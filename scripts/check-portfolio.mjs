import assert from 'node:assert/strict';
import { grainientAtScroll, grainientPreset, grainientEndColors } from '../src/config/grainient.ts';
import { portfolio, statGroups, filterPortfolio, matchesDimension } from '../src/data/portfolio.ts';

assert.deepEqual(grainientAtScroll(0, 4000, 1000).colors, grainientPreset.colors);
assert.deepEqual(grainientAtScroll(3000, 4000, 1000).colors, grainientEndColors);
assert.equal(grainientAtScroll(1500, 4000, 1000).angle, 72.5);
assert.equal(grainientAtScroll(3000, 4000, 1000).angle, 90);
assert.deepEqual(grainientAtScroll(-100, 4000, 1000), grainientAtScroll(0, 4000, 1000));
assert.deepEqual(grainientAtScroll(9000, 4000, 1000), grainientAtScroll(3000, 4000, 1000));
assert.equal(grainientAtScroll(0, 1000, 1000).angle, 55);
assert.deepEqual(grainientAtScroll(1500, 4000, 1000).colors,
  ['#ffffff', '#c1c1c1', '#aaabaa', '#9b949b', '#91768f']);
assert.equal(grainientAtScroll(3000, 4000, 1000).flow, 2);

assert.equal(filterPortfolio({}).length, 24);
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
