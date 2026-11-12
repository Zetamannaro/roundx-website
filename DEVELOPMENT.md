# RoundX — one-page preview
React + TypeScript + Vite. Development branch: design/roundx-home.
Node.js 22.12+ or current supported LTS. Run npm ci, then npm run dev.
Build: npm run build. Static output: dist/. Base paths are relative for GitHub Pages.

## Sections
Hero, stats, portfolio, contacts and footer. Light typography update: all text is black, section titles are centered, H1 sizes are 115% of the previous sizes.
The sticky header switches the original vector logo to monochrome after 24px of scrolling. The logo SVG has clean paths and padded bounds; the favicon contains only the symbol.
Brand colors: blue #00A6FF, coral #FF7D7D, navy #141427, extracted from the supplied Illustrator/PDF logo.
The supplied logo is exported to clean, padded SVG paths with original dark lettering.
Poppins is bundled locally through @fontsource/poppins; no Google Fonts requests.

## Single source of portfolio data
Edit src/data/portfolio.ts to replace the 25 placeholder positions.
Every entry has name, country/code, industry, image and website. Demo links cycle through example.com, Wikipedia and Mozilla; replace them with the real startup URLs.
Country counts, sector distribution and startup count derive from this array.
The 8 countries and 6 industries are ILLUSTRATIVE, not verified RoundX claims.
The site visibly discloses the demonstration data.
Hover, tap or use keyboard arrow keys to explore the native radio groups.
Circular Gallery supports dragging, horizontal wheel and keyboard navigation.
Normal vertical scrolling is preserved.
Eight local landscape placeholder photos are reused across 25 positions until real logos are supplied.

## Motion and fallbacks
Grainient from the official free React Bits repository is now the fixed full-viewport background. Exact preset: src/config/grainient.ts.
Scroll linearly maps angle 55 to 360 and flow 0.8 to 2 (the maxima exposed in the official demo controls). The maximum is reached at the document bottom, with clamping for overscroll and resize/layout updates.
The original component registers window-level pointermove and pointerdown handlers, so interactive stirring and clickSwirl remain active over page sections. Its canvas does not intercept links or drag gestures.
Reduce motion disables autonomous speed, animated grain, cursor effects and intro animation; scroll-linked settings remain deterministic.
Gallery has no automatic scrolling. Both components stop when offscreen/in background tabs.
Gallery captions are anchored from their top edge 18px below the rotated image edge. Image click/tap opens the demo URL; dragging is ignored as a click. Keyboard links use real anchors with noopener/noreferrer.
Without WebGL2 a native horizontal card list replaces the WebGL gallery.
No analytics, forms, databases, localStorage or application cookies are added.
The private preview host has its own authentication and infrastructure behavior.
GitHub Pages itself logs visitor IP addresses for security.

## Publication
Development noindex stays enabled. Review portfolio data, company legal information and privacy notice before production.
No live-domain/DNS changes are included.
