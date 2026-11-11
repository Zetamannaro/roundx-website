# RoundX — React hero proposal

React + TypeScript + Vite. Development branch: `design/roundx-home`.

## Run

Requires Node.js 22.12+ (or a current supported LTS).

```sh
npm ci
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

Build runs TypeScript checks and emits the static site into `dist/`.
Vite uses relative asset paths so the output works on a repository subpath or a custom domain.
Deploy `dist/`, not the raw React sources. For GitHub Pages use a build/deploy Actions workflow after choosing the preview/live setup.
No deployment, domain, or DNS changes are part of this proposal. Two branches alone do not create separate hosted environments.

## Hero concept

Charcoal background, warm copper Threads, large editorial typography.
The original H1 and H2 are preserved, highlighting obvious, crowd, and micro venture.
Additional short labels are proposed copy, subject to review. The typographic wordmark is provisional.
Threads is the actual React Bits TypeScript/CSS component; see THIRD_PARTY_NOTICES.md and licenses/react-bits-LICENSE.md.
It pauses offscreen and in background tabs, respects reduced motion at initialization, and has a visible pause control.
Without WebGL2 the text and CSS background remain usable.
Fonts are loaded from Google Fonts with local sans-serif fallbacks.

## Before production

Remove the development `noindex, nofollow` directive, confirm the final brand/logo and copy, add the remaining site sections and legal pages, and configure the chosen hosting environment.
