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
src/data/portfolio.ts contains the 24 entities and exact macro-sector, industry and outcome classifications supplied by RoundX.
There are 19 active entities, 1 EXIT and 4 Lessons learned. Display language avoids FAILED; logo colors are never desaturated to represent an outcome.
Country/code are null until supplied by the user. The geography card explicitly shows awaiting confirmation, without carrying forward the old 8 demo countries.
Geography, macro-sector and industry are derived from one dataset. Selecting a chip highlights related values across all three cards; selecting it again or clearing the selection restores everything. Once countries are added to the records, geography cross-highlighting works with the same logic.
Portfolio websites and logo provenance are in src/data/portfolio-assets.ts and PORTFOLIO_ASSETS.md.
Logos use native vector originals where available and transparent raster-in-SVG containers otherwise. Every logo is rendered with its original alpha, without a white or dark rectangular fill. No brand marks were invented or approximated.
Circular Gallery supports dragging, horizontal wheel and keyboard navigation.
Normal vertical scrolling is preserved.
All landscape placeholders have been replaced in the rendered portfolio with company logos.

## Motion and fallbacks
Grainient from the official free React Bits repository is the fixed full-viewport background. The user's original white/beige/copper preset has been restored in src/config/grainient.ts. There are no added white text panels or logo backplates.
Scroll linearly maps angle 55 to 360 and flow 0.8 to 2 (the maxima exposed in the official demo controls). The maximum is reached at the document bottom, with clamping for overscroll and resize/layout updates.
The original component registers window-level pointermove and pointerdown handlers, so interactive stirring and clickSwirl remain active over page sections. Its canvas does not intercept links or drag gestures.
Reduce motion disables autonomous speed, animated grain, cursor effects and intro animation; scroll-linked settings remain deterministic.
Gallery has no automatic scrolling. Both components stop when offscreen/in background tabs.
Gallery captions are anchored from their top edge 18px below the rotated image edge. Image click/tap opens the company URL; dragging is ignored as a click. Keyboard links use real anchors with noopener/noreferrer.
Logos are contained rather than cropped. EXIT gets a gold outline and milestone badge; Lessons learned gets a subdued dashed outline and badge, while retaining each logo's original colors.
Without WebGL2 a native horizontal card list replaces the WebGL gallery.
No analytics, forms, databases, localStorage or application cookies are added.
The private preview host has its own authentication and infrastructure behavior.
GitHub Pages itself logs visitor IP addresses for security.

## Publication
Development noindex stays enabled. Review portfolio data, company legal information and privacy notice before production.
No live-domain/DNS changes are included.
