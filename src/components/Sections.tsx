import { FLAGSHIP, OTHER_PROJECTS, SKILLS } from '../data/projects';

function ProjectCard({ project }: { project: (typeof FLAGSHIP)[number] }) {
  return (
    <article className="panel flex flex-col rounded-2xl p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="display text-xl font-semibold text-white">{project.name}</h3>
        <span
          className={`mono rounded-full border px-2.5 py-0.5 text-[0.6rem] uppercase tracking-[0.18em] ${
            project.status === 'live' ? 'border-ion/50 text-ion' : 'hairline text-haze'
          }`}
        >
          {project.status}
        </span>
      </div>
      <p className="display mt-1 text-sm font-medium uppercase tracking-[0.14em] text-ember">{project.tagline}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-haze">{project.description}</p>
      <ul className="mono mt-4 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <li key={s} className="rounded-full bg-white/5 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.12em] text-haze/80">
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-3">
        {project.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={`display rounded-full px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] ${
              link.label.startsWith('Open')
                ? 'bg-ion text-void hover:bg-white'
                : 'border hairline text-haze hover:text-white'
            } transition-colors`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}

export function Showcase() {
  return (
    <section id="projects" className="border-t hairline py-20">
      <div className="mx-auto max-w-7xl px-5">
        <p className="eyebrow">Flagship work · existing applications</p>
        <h2 className="display mt-2 text-3xl font-semibold text-white sm:text-4xl">
          OrbitalPulse &amp; Forge 3D
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-haze">
          These are independent, already-built applications. This portfolio presents them — it
          does not recreate them. Every link below goes to the real app or its repository.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {FLAGSHIP.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section className="border-t hairline py-20">
      <div className="mx-auto max-w-7xl px-5">
        <p className="eyebrow">AI &amp; full-stack engineering</p>
        <h2 className="display mt-2 text-3xl font-semibold text-white sm:text-4xl">More builds</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OTHER_PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="border-t hairline py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="eyebrow">About</p>
          <h2 className="display mt-2 text-3xl font-semibold text-white sm:text-4xl">
            Engineering at the intersection of flight, simulation and software
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-haze">
            <p>
              I&apos;m Odemuyiwa Emmanuel — an engineer who builds immersive, technically honest
              software: real-time 3D that can actually be interacted with, simulations whose math
              is shown rather than faked, and products that ship.
            </p>
            <p>
              This site is itself part of the portfolio: the fighter-laboratory and propulsion
              sequences are scroll-driven cinematic storytelling, while every model you can touch
              — the airframe assembly, the turbofan test cell, the airfoil and systems labs — runs
              live in your browser with working controls and published equations.
            </p>
            <p>
              My flagship work spans orbital mechanics (OrbitalPulse propagates real satellites
              with SGP4 in the browser), parametric CAD (Forge 3D), and production web platforms
              across React, TypeScript and Python.
            </p>
          </div>
        </div>
        <div id="skills">
          <p className="eyebrow">Skills &amp; tools</p>
          <div className="mt-4 flex flex-col gap-5">
            {SKILLS.map((group) => (
              <div key={group.group} className="panel rounded-2xl p-5">
                <h3 className="display text-sm font-semibold uppercase tracking-[0.18em] text-white">{group.group}</h3>
                <ul className="mono mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-full bg-white/5 px-3 py-1 text-[0.66rem] uppercase tracking-[0.12em] text-haze">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="border-t hairline py-24">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <p className="eyebrow">Contact</p>
        <h2 className="display mt-3 text-4xl font-semibold text-white sm:text-5xl">
          Let&apos;s build something that flies
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-haze">
          Open to aerospace software, real-time 3D, and full-stack/AI engineering collaborations.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:odemuyiwaemmanuel17@gmail.com"
            className="display rounded-full bg-ion px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-void transition-colors hover:bg-white"
          >
            Email me
          </a>
          <a
            href="https://github.com/odemuyiwaemmanuel17-cmd"
            target="_blank"
            rel="noreferrer"
            className="display rounded-full border hairline px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-haze transition-colors hover:text-white"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t hairline py-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5">
        <p className="mono text-[0.66rem] uppercase tracking-[0.18em] text-haze/60">
          © {new Date().getFullYear()} Odemuyiwa Emmanuel · Aerospace Engineering Portfolio
        </p>
        <p className="mono text-[0.66rem] uppercase tracking-[0.18em] text-haze/60">
          Cinematic footage: AI-generated sequences · 3D &amp; simulations: real-time, in-browser
        </p>
      </div>
    </footer>
  );
}
