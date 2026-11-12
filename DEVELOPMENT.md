# RoundX — one-page preview
React + TypeScript + Vite. Development branch: design/roundx-home.
Node.js 22.12+ or current supported LTS. Run npm ci, then npm run dev.
Build: npm run build. Static output: dist/. Base paths are relative for GitHub Pages.

## Sections
Hero, stats, portfolio, contacts and footer. Light typography update: all text is black, section titles are centered, H1 sizes are 115% of the previous sizes.
The sticky header switches the original vector logo to monochrome after 24px of scrolling. The logo SVG has clean paths and padded bounds; the favicon contains only the symbol.
Brand colors: blue #00A6FF, coral #FF7D7D, navy #141427, extracted from the supplied Illustrator/PDF logo.
The supplied logo is exported to SVG, cropped and adapted with white lettering for the dark surface.
Poppins is bundled locally through @fontsource/poppins; no Google Fonts requests.

## Single source of portfolio data
Edit src/data/portfolio.ts to replace the 25 placeholder positions.
Every entry has name, country/code, industry and image.
Country counts, sector distribution and startup count derive from this array.
The 8 countries and 6 industries are ILLUSTRATIVE, not verified RoundX claims.
The site visibly discloses the demonstration data.
Hover, tap or use keyboard arrow keys to explore the native radio groups.
Circular Gallery supports dragging, horizontal wheel and keyboard navigation.
Normal vertical scrolling is preserved.
Eight local landscape placeholder photos are reused across 25 positions until real logos are supplied.

## Motion and fallbacks
Glowing Wave installation is pending: the official @reactbits-starter registry requires a paid license, and its source cannot be published in the public GitHub repository. No proprietary source was downloaded or substituted.
The exact user preset is saved in src/config/glowing-wave.ts. Until an authorized source and private source destination are available, the background is the requested static #ffe6f2 color. There is no wave animation or cursor interaction in this interim version.
When installing the licensed component, route window-level pointer coordinates into the fixed background so overlaid sections do not block cursor input; test movement in hero, stats and contacts. Preserve every preset value.
Gallery has no automatic scrolling. Both components stop when offscreen/in background tabs.
Without WebGL2 a native horizontal card list replaces the WebGL gallery.
No analytics, forms, databases, localStorage or application cookies are added.
The private preview host has its own authentication and infrastructure behavior.
GitHub Pages itself logs visitor IP addresses for security.

## Publication
Development noindex stays enabled. Review portfolio data, company legal information and privacy notice before production.
No live-domain/DNS changes are included.
