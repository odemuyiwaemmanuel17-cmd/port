# Emmanuel Odemuyiwa — 3D portfolio

A Next.js/Three.js portfolio rebuilt around the supplied 24-second video reference.

## Reference sequence

1. Centered two-line headline, thin outlined buttons, diagonal chrome/glass structures and an arched track.
2. A large reflective dark sculpture with staggered text on the left and right, rotating with scroll.
3. Centered gradient heading followed by the reference's asymmetric, thin-bordered grid: coins, circular marketplace motif, glowing chrome spheres, skill symbols, keyboard keys, an engineering wave and a browser studio.
4. An opening black cube and illuminated sphere above the closing invitation.

The design follows the video's black background, white sans-serif typography, magenta/blue accents, compact navigation, scene order and layout proportions. Geometry is recreated procedurally; the original site's 3D models, textures and source animation files are not contained in the supplied video, so these are reconstructed assets rather than pixel-identical originals.

All five projects, complete project details/source excerpts, original URLs, skills, biography, statistics, terminal commands and guestbook content remain accessible. GitHub, LinkedIn, X and email links use inline SVG icons. Guestbook additions stay in the visitor's browser; email opens their mail application.

## Development

Node 22.6+ (24 recommended).

```sh
npm ci
npm run dev
npm run build
npm test
```

- `data/portfolio-data.ts`: original portfolio content.
- `components/ReferenceExperience.tsx`: reference-led composition and interactions.
- `components/ReferenceScene.tsx`: six distinct procedural 3D shots, responsive cameras, visible-scene rendering, reduced motion and resource cleanup.
- `components/PortfolioExperience.tsx`: reused project dialogs, terminal and guestbook; the prior orbital composition is retained as unused source history.
- `app/globals.css`: desktop/mobile presentation.

The production branch is connected to Vercel. Current production URL: https://portfolio-smoky-one-8w5itm22k4.vercel.app/

The original supplied project claims and links are preserved, not independently verified. Project “live” links currently point to this repository and are labeled accordingly. The Pinterest short link was inaccessible; the attached video is the inspected visual reference.
