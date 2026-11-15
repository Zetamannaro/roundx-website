# RoundX — one-page preview
React + TypeScript + Vite. Development branch: design/roundx-home.
Node.js 22.12+ or current supported LTS. Run npm ci, then npm run dev.
Build: npm run build. Regression checks: npm test. Static output: dist/. Base paths are relative for GitHub Pages.

## Sections
Hero, unified portfolio, contacts and footer. The portfolio heading matches the Contacts font and size; compact geography/macro-sector/industry filters sit below it, followed by a static overview grid. Light typography update: all text is black, section titles are centered, H1 sizes are 115% of the previous sizes.
The sticky header switches the original vector logo to monochrome after 24px of scrolling. The logo SVG has clean paths and padded bounds; the favicon contains only the symbol.
Brand colors: blue #00A6FF, coral #FF7D7D, navy #141427, extracted from the supplied Illustrator/PDF logo.
The supplied logo is exported to clean, padded SVG paths with original dark lettering.
Poppins is bundled locally through @fontsource/poppins; no Google Fonts requests.

## Single source of portfolio data
src/data/portfolio.ts contains the 24 entities and exact macro-sector, industry and outcome classifications supplied by RoundX.
There are 19 active entities, 1 EXIT and 4 Lessons learned. Display language avoids FAILED; logo colors are never desaturated to represent an outcome.
Geography follows the user table: 8 countries. Kampaay belongs to Italy and Sweden; GemaTEG to USA, Italy and Switzerland. Each company is counted once in company totals and in every applicable country.
The three compact select filters combine with AND semantics. Option counts respond to the other two filters, and zero-match options are disabled. The label totals stay at the dataset maxima: 8 geographies, 9 macro-sectors, 15 industries. Multi-country companies match each applicable country without duplicating company totals. Clearing filters restores all 24 companies.
Portfolio websites and logo provenance are in src/data/portfolio-assets.ts and PORTFOLIO_ASSETS.md.
All 24 logos are real vector SVGs without embedded raster images. Official native geometry is preferred; other marks are reconstructed as Bezier paths from original references. Colors and transparent backgrounds are preserved. Reconstructed contours inherit source-detail limits; see PORTFOLIO_ASSETS.md. PortfolioGrid displays SVGs directly as contained images; no canvas rasterization or logo backplates are used.
PortfolioGrid is a plain React list and CSS grid, preserving the transparent rounded cards and internal name, country, macro-sector, industry and status badges. Every matching company renders once. There is no perspective transform, animation loop, cloned track, internal scrolling, viewport mask or measured column layout. Five columns on desktop are centered and keep exactly the previous six-column card width; responsive breakpoints use four, three or two columns. Filtered results retain the same column sizing. Lessons learned records expose no website URL and render as non-link articles.
Normal vertical scrolling is preserved.
All landscape placeholders have been replaced in the rendered portfolio with company logos.

## Motion and fallbacks
Grainient from the official free React Bits repository remains the fixed full-viewport background. Scroll interpolates the original white/beige/copper palette to the user-supplied white/blue/purple palette, with exact endpoints. There are no added white text panels or logo backplates.
The angle is fixed at 55 degrees; scroll retains flow 0.8 to 2. The final flow and cool palette are reached at the document bottom, with clamping for overscroll and resize/layout updates. The CSS background fallback follows the same palette and angle.
The original component registers window-level pointermove and pointerdown handlers, so interactive stirring and clickSwirl remain active over page sections. Its canvas does not intercept links or drag gestures.
Mouse stirring and click swirl remain enabled at all times. The footer motion checkbox is removed. OS reduced-motion preferences still limit autonomous animation; they no longer disable user-driven pointer effects. Scroll-linked settings remain deterministic.
The portfolio is always static. EXIT and Lessons learned card fills are 70% opaque (30% transparent); logos and text retain full opacity.
Active and EXIT cards use real anchors with noopener/noreferrer. All matches are present in document flow, with no hidden copies or focus-driven layout changes. Metadata includes name, every country, macro-sector and industry.
Logos are contained rather than cropped. EXIT gets a pale yellow card, gold outline and larger badge; Lessons learned gets a pale gray card, subdued dashed outline and larger badge, while retaining each logo's original colors.
The portfolio grid needs no WebGL; only Grainient uses WebGL2. If WebGL2 is unavailable, the dynamic CSS gradient stays visible.
No analytics, forms, databases, localStorage or application cookies are added.
The private preview host has its own authentication and infrastructure behavior.
GitHub Pages itself logs visitor IP addresses for security.

## Publication
Development noindex stays enabled. Review portfolio data, company legal information and privacy notice before production.
No live-domain/DNS changes are included.

Display order starts with Anthropic, Startup Geeks, Up2You, Zappyrent, Kampaay, TimeFlow and Bezel; the remaining relative order is preserved. The Contacts title has no final dot. The former Reduce motion footer checkbox is removed; pointer-driven background effects are always enabled.
