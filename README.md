# Emmanuel Odemuyiwa — Optical Archive

A continuous, blue-eye scrollytelling portfolio built with Next.js and Three.js. The confirmed reference is [High Tech Logo V04 Eye](https://in.pinterest.com/pin/661395895259111847/). Its optical rings, cyan circuitry, dark lens and technical atmosphere are recreated procedurally for an interactive website. No original template assets are redistributed.

## Scroll journey

Vision → background and skills → Compbuy → HandyTrust → AppMD → Batch Image & Collage Studio → AeroCAD → contact.

One persistent eye changes ring alignment, depth, aperture and camera framing with scroll. Clicking the lens opens the current project or background. A matching vector lens follows the same scroll choreography when WebGL is unavailable. Chapter navigation, ordinary links and reduced motion provide direct access to every section.

All original project descriptions, architecture notes, features, code excerpts, skills, statistics, biography, social links, terminal commands and guestbook content are preserved. GitHub, LinkedIn, X and email use their SVG symbols. Guestbook additions are local to the visitor's browser. Project repository links and original claims are retained with their existing labels.

## Development

Node 22.6+.

```sh
npm ci
npm run dev
npm run build
npm test
```

- `components/EyeExperience.tsx`: eight chapters, scroll progression, lens actions, dialogs and navigation.
- `components/EyeScene.tsx`: procedural Three.js lens, instanced ring ticks, circuitry, cleanup, context-loss fallback and SVG equivalent.
- `lib/eye-timeline.ts`: bounded scene choreography shared by WebGL and fallback.
- `data/portfolio-data.ts`: original content.
- `components/PortfolioExperience.tsx`: reusable project, guestbook and terminal panels. Older compositions remain as unused source history.

## Hosting and validation

Production: https://portfolio-smoky-one-8w5itm22k4.vercel.app/

The main branch deploys through the existing Vercel connection. Build includes TypeScript and lint validation. The cloud review browser does not offer WebGL, so its visual review exercises the vector fallback; hardware WebGL rendering still needs a GPU browser check.
