# Emmanuel Odemuyiwa — Orbital portfolio

A Next.js portfolio rebuilt as a continuous 3D scrollytelling experience. A metallic orbital assembly connects Emmanuel’s aerospace background, software projects, capabilities, and contact channels.

## Run locally

Requires Node.js 22.6+ (Node 24 recommended for the built-in TypeScript test runner).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production build:

```sh
npm test
npm run build
npm start
```

## Experience

- **Origin → perspective:** one persistent Three.js scene, reflective materials, moving camera, orbital rings, and scroll-driven disassembly.
- **Selected work:** five scroll beats for Compbuy, HandyTrust, AppMD, Batch Image & Collage Studio, and AeroCAD. Project dots and previous/next controls jump to the corresponding beat. Every project includes story, architecture, features, source excerpt, tags, metrics, and original links.
- **Capabilities:** expandable categories preserve every skill and its existing self-assessment.
- **Explore:** working command terminal, searchable command menu (Ctrl/⌘ K), and browser-local guestbook.
- **Connect:** GitHub, LinkedIn, X, and email links with recognizable inline SVG icons; direct email and copy-email actions.
- **Accessibility:** native modal dialogs, focus restoration, skip link, labeled controls, reduced-motion support, pause and wireframe controls, adaptive renderer resolution, and a CSS fallback for unavailable/lost WebGL contexts.

## Edit content and choreography

- `data/portfolio-data.ts` remains the original content source. Existing project URLs, project claims, statistics, skills, and guestbook examples are preserved as supplied, not independently verified.
- `components/PortfolioExperience.tsx` contains the narrative, dialogs, project viewer, terminal, and guestbook.
- `components/OrbitalScene.tsx` owns scene construction, camera movement, motion preferences, and GPU resource cleanup.
- `lib/scroll-timeline.ts` provides the shared scroll mapping; tests cover navigation round trips, boundaries, and camera continuity.
- `app/globals.css` defines the dark graphite, silver, and pale green visual system and responsive layouts.
- `public/fonts/` self-hosts Space Grotesk with its OFL license. No font CDN is needed at build or runtime.

The previous UI components remain in the repository for reference; the new page uses `PortfolioExperience`.

## Reference and validation notes

The supplied 24-second video informed the dark atmosphere, floating metallic forms, restrained navigation, large typography, and scroll transitions. The Pinterest short link could not be opened in this environment and was not inspected.

The original project “live” URLs all point to the portfolio repository and the project GitHub links point to the profile. The interface accurately labels them as repository references/profile links. Replace them in the data file when actual project-specific URLs are available.

Guestbook entries are saved in the visitor’s browser only. No shared backend or email-sending service is configured. Email links open the visitor’s mail application.

Validation: production compilation, TypeScript/lint checks, and scroll mapping tests. Visual browser QA remains outstanding: the cloud browser could not access localhost, and a local Chromium download was unavailable. Review at desktop and mobile widths before merging or publishing, including scroll transitions, modal keyboard focus, reduced motion, and WebGL fallback.
