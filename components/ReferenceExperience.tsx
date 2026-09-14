"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  ArrowDown,
  ArrowUpRight,
  Command,
  Menu,
  X,
  Pause,
  Play,
  Code2,
  Database,
  Smartphone,
  Cpu,
  Layers,
  Braces,
} from "lucide-react";
import {
  personalInfo,
  projects,
  skillCategories,
  socialLinks,
  stats,
} from "../data/portfolio-data";
import type { Project } from "../types/portfolio";
import {
  BrandIcon,
  Dialog,
  ProjectDetails,
  ConsolePanel,
  GuestbookPanel,
} from "./PortfolioExperience";
const Scene = dynamic(() => import("./ReferenceScene"), { ssr: false });
const nav = [
  { id: "home", name: "Home" },
  { id: "projects", name: "Projects" },
  { id: "about", name: "About" },
  { id: "contact", name: "Contact" },
];
export default function ReferenceExperience() {
  const [paused, setPaused] = useState(false),
    [menu, setMenu] = useState(false),
    [selected, setSelected] = useState<Project | null>(null),
    [modal, setModal] = useState<
      "terminal" | "guestbook" | "skills" | "search" | null
    >(null),
    [query, setQuery] = useState("");
  const freeze = paused || !!modal || !!selected;
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setQuery("");
        setModal((v) => (v === "search" ? null : "search"));
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  const open = (i: number) => setSelected(projects[i]);
  const jump = (id: string) => {
    setModal(null);
    setMenu(false);
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  };
  return (
    <main className="reference-portfolio">
      <a className="skip-link" href="#projects">
        Skip to projects
      </a>
      <header className="reference-nav">
        <a
          href="#home"
          className="reference-logo"
          aria-label="Emmanuel Odemuyiwa home"
        >
          <svg viewBox="0 0 30 34" aria-hidden="true">
            <path fill="#f4f4f7" d="m15 0 14 8v18l-14 8L1 26V8z" />
            <path fill="#96969d" d="m15 6 9 5-9 5-9-5z" />
            <path fill="#53535d" d="m15 16 9-5v12l-9 5z" />
            <path fill="#c8c8d0" d="m6 11 9 5v12l-9-5z" />
          </svg>
          <span>emmanuel</span>
        </a>
        <nav aria-label="Main navigation" className={menu ? "is-open" : ""}>
          {nav.map((n) => (
            <a href={`#${n.id}`} key={n.id} onClick={() => setMenu(false)}>
              {n.name}
            </a>
          ))}
          <a
            href={personalInfo.twitter}
            target="_blank"
            rel="noreferrer"
            aria-label="X profile"
          >
            <BrandIcon name="twitter" />
          </a>
          <button onClick={() => setModal("guestbook")}>Guestbook</button>
        </nav>
        <button
          className="mobile-toggle"
          aria-label="Toggle menu"
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <section id="home" className="reference-hero" data-shot="hero">
        <div className="hero-title">
          <h1>
            Engineer, Develop,
            <br />
            <span className="spectrum-text">Build what’s next.</span>
          </h1>
          <div className="hero-buttons">
            <a className="cut-button" href="#projects">
              View projects
            </a>
            <a className="cut-button" href="#contact">
              Let’s connect
            </a>
          </div>
        </div>
        <Scene variant="hero" paused={freeze} />
        <a href="#about" className="reference-scroll">
          <span>Aerospace</span>
          <ArrowDown />
          <span>Software</span>
        </a>
      </section>
      <section id="about" className="sculpture-story" data-shot="sculpture">
        <div className="sculpture-stage">
          <Scene variant="sculpture" paused={freeze} />
          <div className="story-side story-left">
            <p className="spectrum-text">For the digital world</p>
            <ol>
              <li>
                <span>01</span>
                <h2>
                  Build thoughtful web experiences
                  <br />
                  from interface to infrastructure
                </h2>
              </li>
              <li>
                <span>02</span>
                <h2>
                  Turn ambitious ideas into
                  <br />
                  full-stack and mobile platforms
                </h2>
              </li>
              <li>
                <span>03</span>
                <h2>
                  Connect modern AI tools
                  <br />
                  with practical, everyday problems
                </h2>
              </li>
            </ol>
          </div>
          <div className="story-side story-right">
            <p className="spectrum-text">For the physical world</p>
            <ol>
              <li>
                <h2>
                  Explore the science
                  <br />
                  behind flight.
                </h2>
                <span>01</span>
              </li>
              <li>
                <h2>
                  Shape ideas through
                  <br />
                  parametric 3D CAD
                  <br />
                  and engineering
                </h2>
                <span>02</span>
              </li>
              <li>
                <h2>
                  Bring an engineer’s
                  <br />
                  precision to everything
                  <br />I build
                </h2>
                <span>03</span>
              </li>
            </ol>
          </div>
          <div className="story-footnote">
            <span>EMMANUEL ODEMUYIWA</span>
            <span>{personalInfo.institution}</span>
          </div>
        </div>
      </section>
      <section id="projects" className="reference-work">
        <div className="reference-heading">
          <h2>
            Connecting Engineering
            <br />
            <span className="spectrum-text">with Digital Possibility</span>
          </h2>
          <p>
            Aerospace engineering undergraduate. Full-stack and mobile
            developer.
            <br />
            Exploring the intersection of intelligent software, thoughtful
            experiences,
            <br className="desktop-only" /> and the physical world. These are
            the things I’m building.
          </p>
        </div>
        <div className="reference-grid">
          <button
            className="feature-panel coins-panel"
            onClick={() => open(0)}
            aria-label="Explore Compbuy"
          >
            <div className="coins-caption">
              <p>
                Building trust in digital acquisitions through secure
                verification,
                <br />
                transparent financials, and connected marketplace systems.
              </p>
            </div>
            <Scene variant="coins" paused={freeze} />
            <div className="panel-bottom">
              <span>Compbuy</span>
              <ArrowUpRight />
            </div>
          </button>
          <button
            className="feature-panel trust-panel"
            onClick={() => open(1)}
            aria-label="Explore HandyTrust"
          >
            <div className="trust-orbit">
              <i />
              <i />
              <i />
              <h3>
                Trust-first
                <br />
                Service Marketplace
              </h3>
            </div>
            <div className="trust-copy">
              <h4>HandyTrust</h4>
              <p>
                Verified artisans. Protected payments.
                <br />
                Fix it now, pay when it’s done.
              </p>
            </div>
          </button>
          <button
            className="feature-panel orbs-panel"
            onClick={() => open(2)}
            aria-label="Explore AppMD"
          >
            <Scene variant="orbs" paused={freeze} />
            <div className="panel-bottom">
              <span>AppMD / APK Analysis</span>
              <ArrowUpRight />
            </div>
          </button>
          <button
            className="feature-panel skills-panel"
            onClick={() => setModal("skills")}
            aria-label="Explore all skills"
          >
            <div className="skill-system">
              <span className="system-center">
                <Cpu />
              </span>
              {[Code2, Database, Smartphone, Layers, Braces, Command].map(
                (Icon, i) => (
                  <span key={i} className={`system-node node-${i}`}>
                    <Icon />
                  </span>
                ),
              )}
              <i />
              <i />
            </div>
            <h3>Connected Disciplines</h3>
            <p>
              Web and mobile engineering, cloud systems,
              <br />
              parametric CAD, and computational science.
            </p>
          </button>
          <button
            className="feature-panel terminal-panel"
            onClick={() => setModal("terminal")}
            aria-label="Open terminal"
          >
            <div className="keyboard-keys">
              <kbd>
                <Command />
              </kbd>
              <kbd>K</kbd>
            </div>
            <h3>A Different Way to Explore</h3>
            <p>
              Open a command line into my background,
              <br />
              technical stack, projects, and ideas.
              <br />
              Or press ⌘ / Ctrl K to find your way.
            </p>
          </button>
          <button
            className="feature-panel wave-panel"
            onClick={() => open(4)}
            aria-label="Explore AeroCAD"
          >
            <h3>Engineering Beyond the Screen</h3>
            <p>
              NACA airfoil profiles, parametric geometry,
              <br />
              and the mathematics that gives flight its form.
            </p>
            <Scene variant="wave" paused={freeze} />
            <div className="panel-bottom">
              <span>AeroCAD Wing Modeler</span>
              <ArrowUpRight />
            </div>
          </button>
          <button
            className="feature-panel studio-panel"
            onClick={() => open(3)}
            aria-label="Explore Batch Image and Collage Studio"
          >
            <div className="studio-copy">
              <h3>
                A Studio
                <br />
                in the Browser
              </h3>
              <p>
                Batch image processing, precision layouts, and creative tools.
                Designed to keep everything on your device.
              </p>
            </div>
            <div className="studio-preview" aria-hidden="true">
              <div className="preview-bar">
                <i />
                <i />
                <i />
                <span>Collage Studio</span>
              </div>
              <div className="preview-layout">
                <div className="preview-sidebar">
                  <Layers />
                  <Code2 />
                  <Braces />
                </div>
                <div className="preview-main">
                  <div className="preview-labels">
                    <span>Images</span>
                    <span>Layouts</span>
                    <span>Export ↗</span>
                  </div>
                  <div className="preview-art">
                    <div className="art-fold" />
                    <div className="art-ring" />
                    <div className="art-sphere" />
                    <div className="art-wave" />
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
        <button
          className="cut-button learn-more"
          onClick={() => setModal("skills")}
        >
          More about me
        </button>
      </section>
      <section id="contact" className="cube-story" data-shot="cube">
        <div className="cube-stage">
          <Scene variant="cube" paused={freeze} />
          <div className="cube-title">
            <h2>
              <span className="spectrum-text">Explore an Idea</span>
              <br />
              Build Something Together
            </h2>
            <p>
              Have a project, an opportunity, or a possibility?
              <br />
              I’m available for engineering projects and software roles.
            </p>
            <a className="cut-button" href={`mailto:${personalInfo.email}`}>
              Start a conversation <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>
      <footer className="reference-footer">
        <a href={`mailto:${personalInfo.email}`} className="footer-email">
          {personalInfo.email}
          <ArrowUpRight />
        </a>
        <div className="footer-socials">
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target={s.icon === "mail" ? undefined : "_blank"}
              rel="noreferrer"
            >
              <BrandIcon name={s.icon} />
              <span>{s.name}</span>
            </a>
          ))}
        </div>
        <div className="footer-meta">
          <span>© {new Date().getFullYear()} Emmanuel Odemuyiwa</span>
          <span>Nigeria · Open to the world</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
      <button
        className="motion-control"
        aria-label={paused ? "Resume motion" : "Pause motion"}
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? <Play /> : <Pause />}
      </button>
      {selected && (
        <Dialog title="Project details" onClose={() => setSelected(null)}>
          <ProjectDetails project={selected} />
        </Dialog>
      )}
      {modal && (
        <Dialog
          title={
            modal === "skills"
              ? "About Emmanuel"
              : modal === "search"
                ? "Find your way"
                : modal === "guestbook"
                  ? "Guestbook"
                  : "Terminal"
          }
          onClose={() => setModal(null)}
        >
          {modal === "terminal" ? (
            <ConsolePanel />
          ) : modal === "guestbook" ? (
            <GuestbookPanel />
          ) : modal === "skills" ? (
            <>
              <h2>Engineering meets software.</h2>
              <p className="body-copy">{personalInfo.bio}</p>
              <p className="fine-print">
                {personalInfo.institution} · {personalInfo.role}
              </p>
              <div className="complete-skills">
                {skillCategories.map((c) => (
                  <details key={c.id} open>
                    <summary>{c.title}</summary>
                    <p>{c.description}</p>
                    {c.skills.map((s) => (
                      <div className="complete-skill" key={s.name}>
                        <strong>{s.name}</strong>
                        <span>
                          {s.level} · {s.proficiency}%
                        </span>
                        <small>{s.tags?.join(" · ")}</small>
                      </div>
                    ))}
                  </details>
                ))}
              </div>
              <div className="complete-stats">
                {stats.map((s) => (
                  <div key={s.label}>
                    <b>{s.number}</b>
                    <span>{s.label}</span>
                    <small>{s.subtext}</small>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2>What would you like to explore?</h2>
              <input
                className="search-input"
                aria-label="Search portfolio"
                placeholder="Projects, skills, contact…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="search-results">
                {nav
                  .filter((n) =>
                    n.name.toLowerCase().includes(query.toLowerCase()),
                  )
                  .map((n) => (
                    <button key={n.id} onClick={() => jump(n.id)}>
                      {n.name}
                      <ArrowUpRight />
                    </button>
                  ))}
                {projects
                  .filter((p) =>
                    p.title.toLowerCase().includes(query.toLowerCase()),
                  )
                  .map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setModal(null);
                        setSelected(p);
                      }}
                    >
                      {p.title}
                      <ArrowUpRight />
                    </button>
                  ))}
              </div>
            </>
          )}
        </Dialog>
      )}
    </main>
  );
}
