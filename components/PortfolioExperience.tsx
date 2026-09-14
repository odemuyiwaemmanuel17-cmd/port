"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Pause,
  Play,
  Box,
  X,
  Terminal as TerminalIcon,
  Check,
  Copy,
  Menu,
  Command,
} from "lucide-react";
import {
  personalInfo,
  projects,
  skillCategories,
  socialLinks,
  stats,
  guestbookEntries,
  terminalCommands,
} from "../data/portfolio-data";
import { projectAtScroll, scrollForProject } from "../lib/scroll-timeline";
import type { Project, GuestbookEntry } from "../types/portfolio";
const OrbitalScene = dynamic(() => import("./OrbitalScene"), { ssr: false });
const chapters = [
  { id: "hero", label: "Origin" },
  { id: "about", label: "Perspective" },
  { id: "projects", label: "Selected work" },
  { id: "skills", label: "Capabilities" },
  { id: "contact", label: "Contact" },
];
export function BrandIcon({ name }: { name: string }) {
  if (name === "github") return <Github aria-hidden="true" />;
  if (name === "linkedin") return <Linkedin aria-hidden="true" />;
  if (name === "mail") return <Mail aria-hidden="true" />;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932zM17.61 20.644h2.039L6.486 3.24H4.298z" />
    </svg>
  );
}
function Dialog({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const focus = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    el.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      el.close();
      document.body.style.overflow = overflow;
      focus?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="studio-dialog"
      aria-label={title}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <div className="dialog-heading">
          <span className="eyebrow">{title}</span>
          <button
            className="icon-button"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <X />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
function ProjectDetails({ project }: { project: Project }) {
  const [tab, setTab] = useState("Story");
  return (
    <>
      <p className="eyebrow accent">
        PROJECT {project.id} / {project.category}
      </p>
      <h2>{project.title}</h2>
      <p className="body-copy">{project.subtitle}</p>
      <div className="tabs" role="tablist" aria-label="Project details">
        {["Story", "Architecture", "Features", "Code"].map((t) => (
          <button
            id={`tab-${t}`}
            aria-controls="project-tab-panel"
            role="tab"
            aria-selected={tab === t}
            key={t}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div
        className="tab-content"
        role="tabpanel"
        id="project-tab-panel"
        aria-labelledby={`tab-${tab}`}
        tabIndex={0}
      >
        {tab === "Story" ? (
          <>
            <p>{project.longDescription}</p>
            <div className="project-stats">
              {project.stats?.map((s) => (
                <div key={s.label}>
                  <small>{s.label}</small>
                  <strong>{s.value}</strong>
                </div>
              ))}
            </div>
          </>
        ) : tab === "Code" ? (
          <>
            <p className="eyebrow">{project.codeSnippet?.filename}</p>
            <pre>
              <code>{project.codeSnippet?.code}</code>
            </pre>
          </>
        ) : (
          <ol>
            {(tab === "Architecture"
              ? project.architectureHighlights
              : project.keyFeatures
            ).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        )}
      </div>
      <div className="tag-list">
        {project.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="dialog-links">
        <a
          className="pill"
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Github /> GitHub profile <ArrowUpRight />
        </a>
        <a
          className="text-link"
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
        >
          Repository reference <ArrowUpRight />
        </a>
      </div>
      <p className="fine-print">
        Project URLs currently point to the profile and portfolio repository
        supplied in the source.
      </p>
    </>
  );
}
function ConsolePanel() {
  const [value, setValue] = useState("");
  const [logs, setLogs] = useState<{ cmd: string; output: ReactNode }[]>([]);
  const output = useRef<HTMLDivElement>(null);
  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setValue("");
    if (cmd === "clear") {
      setLogs([]);
      return;
    }
    let result: ReactNode;
    switch (cmd) {
      case "help":
        result = terminalCommands.map((c) => (
          <p key={c.command}>
            <b>{c.command}</b> — {c.description}
          </p>
        ));
        break;
      case "bio":
        result = personalInfo.bio;
        break;
      case "stack":
        result = skillCategories.map((c) => (
          <p key={c.id}>
            <b>{c.title}</b>
            <br />
            {c.skills.map((s) => s.name).join(" · ")}
          </p>
        ));
        break;
      case "projects":
        result = projects.map((p) => (
          <p key={p.id}>
            {p.id} / {p.title} — {p.subtitle}
          </p>
        ));
        break;
      case "cad":
        result = skillCategories[2].skills.map((s) => s.name).join(" · ");
        break;
      case "contact":
        result = (
          <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
        );
        break;
      case "socials":
        result = socialLinks.map((s) => (
          <a
            className="console-social"
            key={s.name}
            href={s.url}
            target={s.icon === "mail" ? undefined : "_blank"}
            rel="noreferrer"
          >
            <BrandIcon name={s.icon} />
            {s.name} ↗
          </a>
        ));
        break;
      case "whoami":
        result = "You are a visitor exploring Emmanuel’s portfolio.";
        break;
      case "quote":
        result =
          "“Aerodynamics is the art of giving physics a form that dances with the sky. Software is the soul that navigates it.” — Emmanuel Odemuyiwa";
        break;
      default:
        result = `Unknown command: ${raw}. Type help to explore.`;
    }
    setLogs((old) => [...old, { cmd: raw, output: result }]);
  };
  useEffect(() => {
    output.current?.scrollTo({ top: output.current.scrollHeight });
  }, [logs]);
  return (
    <>
      <h2>A different way in.</h2>
      <p className="body-copy">Explore my work from the command line.</p>
      <div ref={output} className="console-output" aria-live="polite">
        <p>
          Welcome. Type <b>help</b> to get started.
        </p>
        {logs.map((l, i) => (
          <div key={i}>
            <p className="accent">guest ~ % {l.cmd}</p>
            <div>{l.output}</div>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(value);
        }}
        className="console-input"
      >
        <span>~ %</span>
        <input
          aria-label="Terminal command"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type a command…"
          autoComplete="off"
        />
        <button className="icon-button" aria-label="Run command">
          <ArrowRight />
        </button>
      </form>
      <div className="tabs">
        {["help", "bio", "projects", "stack", "socials", "clear"].map((c) => (
          <button key={c} onClick={() => run(c)}>
            {c}
          </button>
        ))}
      </div>
    </>
  );
}
function GuestbookPanel() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(guestbookEntries);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      const data = JSON.parse(
        localStorage.getItem("eo_guestbook_entries") || "null",
      );
      if (
        Array.isArray(data) &&
        data.every(
          (e) => typeof e?.name === "string" && typeof e?.message === "string",
        )
      )
        setEntries(data);
    } catch {
      /* Existing examples remain available. */
    }
  }, []);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name")).trim(),
      message = String(data.get("message")).trim();
    if (!name || !message) {
      setNotice("Please enter your name and a message.");
      return;
    }
    const next = [
      {
        id: crypto.randomUUID(),
        name,
        role: "Visitor",
        message,
        timestamp: "Just now",
        avatarInitials: name.slice(0, 2).toUpperCase(),
      },
      ...entries,
    ];
    setEntries(next);
    try {
      localStorage.setItem("eo_guestbook_entries", JSON.stringify(next));
      setNotice("Saved on this browser. Thank you for stopping by.");
    } catch {
      setNotice("Added for this visit. Browser storage is unavailable.");
    }
    form.reset();
  };
  return (
    <>
      <h2>Leave a little signal.</h2>
      <p className="body-copy">
        A guestbook for fellow builders. New notes are saved only in this
        browser; the original repository entries are shown below.
      </p>
      <form className="guest-form" onSubmit={submit}>
        <label>
          Your name
          <input name="name" maxLength={80} required placeholder="Name" />
        </label>
        <label>
          Your message
          <textarea
            name="message"
            maxLength={600}
            required
            rows={3}
            placeholder="What are you building?"
          />
        </label>
        <button className="pill primary">
          Leave a note <ArrowUpRight />
        </button>
        <p role="status">{notice}</p>
      </form>
      <div className="guest-entries">
        {entries.map((e) => (
          <article key={e.id}>
            <blockquote>“{e.message}”</blockquote>
            <span>{e.name}</span>
            <small>
              {e.role} {e.company ? `/ ${e.company}` : ""}
            </small>
          </article>
        ))}
      </div>
    </>
  );
}
export default function PortfolioExperience() {
  const [chapter, setChapter] = useState("hero");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState<
    "terminal" | "guestbook" | "search" | null
  >(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const p = projects[index];
  useEffect(() => {
    let queued = false;
    const update = () => {
      queued = false;
      const y = scrollY;
      const work = document.getElementById("projects")!;
      const travel = work.offsetHeight - innerHeight;
      setIndex(projectAtScroll(y, work.offsetTop, travel, projects.length));
      const current = [...chapters]
        .reverse()
        .find(
          (c) =>
            document.getElementById(c.id)!.offsetTop <= y + innerHeight * 0.4,
        );
      setChapter(current?.id || "hero");
      progressRef.current?.style.setProperty(
        "--progress",
        String(
          y / Math.max(1, document.documentElement.scrollHeight - innerHeight),
        ),
      );
    };
    const scroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setModal((v) => (v === "search" ? null : "search"));
        setQuery("");
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      window.removeEventListener("keydown", key);
    };
  }, []);
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    setMenu(false);
    setModal(null);
  };
  const goProject = (i: number) => {
    const el = document.getElementById("projects")!;
    window.scrollTo({
      top: scrollForProject(
        i,
        el.offsetTop,
        el.offsetHeight - innerHeight,
        projects.length,
      ),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };
  return (
    <main>
      <a className="skip-link" href="#about">
        Skip introduction
      </a>
      <OrbitalScene
        paused={paused || !!modal || !!selected}
        wireframe={wireframe}
      />
      <div className="grain" aria-hidden="true" />
      <div className="scroll-progress" ref={progressRef} />
      <header className="site-header">
        <a
          href="#hero"
          className="wordmark"
          aria-label="Emmanuel Odemuyiwa — home"
        >
          <span className="monogram">
            e<span>o</span>
            <i />
          </span>
          <span>
            EMMANUEL
            <br />
            ODEMUYIWA
          </span>
        </a>
        <nav aria-label="Main navigation" className={menu ? "nav-open" : ""}>
          {chapters
            .filter((c) => c.id !== "hero")
            .map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                onClick={() => setMenu(false)}
                aria-current={chapter === c.id ? "location" : undefined}
              >
                {c.label}
              </a>
            ))}
        </nav>
        <div className="header-actions">
          <button
            className="command-button"
            onClick={() => setModal("search")}
            aria-label="Open command menu"
          >
            <Command />
            <span>K</span>
          </button>
          <a className="availability" href={`mailto:${personalInfo.email}`}>
            <i /> AVAILABLE FOR WORK
          </a>
          <button
            className="mobile-menu icon-button"
            onClick={() => setMenu(!menu)}
            aria-label="Toggle navigation"
            aria-expanded={menu}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <section id="hero" className="hero chapter">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="tiny-dot" /> ENGINEERING × CODE × CURIOSITY
          </p>
          <h1>
            Grounded in
            <br />
            science.
            <br />
            <span>Built to go</span>
            <br />
            <em>beyond.</em>
          </h1>
          <p className="hero-description">
            I’m Emmanuel. Aerospace engineering student.
            <br />
            Full-stack & mobile developer. Connecting
            <br className="desktop-break" /> physical possibilities with digital
            experiences.
          </p>
          <a href="#projects" className="pill primary">
            Explore my work <ArrowUpRight />
          </a>
        </div>
        <div className="object-caption">
          <span className="caption-line" />
          <span>
            01 / THE ORIGIN
            <br />
            <b>One mind. Connected disciplines.</b>
          </span>
        </div>
        <div className="hero-bottom">
          <a href="#about">
            <span className="scroll-circle">
              <ArrowDown />
            </span>{" "}
            SCROLL TO CONNECT THE DOTS
          </a>
          <span>NIGERIA · OPEN TO THE WORLD</span>
          <span className="edition">PORTFOLIO / 2026</span>
        </div>
      </section>
      <section id="about" className="about chapter">
        <div className="about-copy">
          <p className="eyebrow accent">01 / A DIFFERENT PERSPECTIVE</p>
          <h2>
            Two worlds.
            <br />
            One way
            <br />
            of <em>thinking.</em>
          </h2>
          <p className="body-copy">{personalInfo.bio}</p>
          <p className="body-copy muted">
            From the geometry of a wing to the architecture of an app, I’m drawn
            to the same question: how can this work better?
          </p>
          <div className="education">
            <span className="cross-mark">+</span>
            <div>
              <strong>{personalInfo.institution}</strong>
              <small>Aerospace Engineering Undergraduate</small>
            </div>
          </div>
          <a className="text-link" href="#projects">
            Follow the ideas into practice <ArrowDown />
          </a>
        </div>
        <span className="background-word" aria-hidden="true">
          CONNECT.
        </span>
      </section>
      <section id="projects" className="work-journey">
        <div className="work-sticky">
          <div className="work-top">
            <p className="eyebrow accent">02 / IDEAS IN THE REAL WORLD</p>
            <span className="eyebrow">SELECTED WORK — {p.id} / 05</span>
          </div>
          <div className="project-copy" key={p.id}>
            <span className="project-number">
              {p.id}
              <span> / 05</span>
            </span>
            <p className="eyebrow">{p.category}</p>
            <h2>{p.title}</h2>
            <p className="body-copy">{p.subtitle}</p>
            <p className="project-description">{p.description}</p>
            <div className="tag-list">
              {p.tags.slice(0, 4).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <button className="pill primary" onClick={() => setSelected(p)}>
              Explore project <ArrowUpRight />
            </button>
          </div>
          <button
            className="object-hotspot"
            onClick={() => setSelected(p)}
            aria-label={`Inspect ${p.title}`}
          >
            <span>+</span>
            <small>
              {p.title}
              <br />
              <b>OPEN THE STORY ↗</b>
            </small>
          </button>
          <div className="work-bottom">
            <div className="project-index" aria-label="Choose a project">
              {projects.map((project, i) => (
                <button
                  key={project.id}
                  aria-label={`View ${project.title}`}
                  aria-current={index === i ? "step" : undefined}
                  onClick={() => goProject(i)}
                >
                  <span>{project.id}</span>
                  <i />
                  <small>{project.title.split(" / ")[0]}</small>
                </button>
              ))}
            </div>
            <div className="work-arrows">
              <button
                aria-label="Previous project"
                disabled={index === 0}
                onClick={() => goProject(index - 1)}
              >
                <ArrowLeft />
              </button>
              <button
                aria-label="Next project"
                disabled={index === 4}
                onClick={() => goProject(index + 1)}
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="skills" className="skills chapter">
        <div className="section-heading">
          <p className="eyebrow accent">03 / THE TOOLS BEHIND THE THINKING</p>
          <h2>
            A broad toolkit.
            <br />A <em>precise</em> approach.
          </h2>
          <p className="body-copy">
            Software, systems, and the science that connects them.
          </p>
        </div>
        <div className="skill-groups">
          {skillCategories.map((cat, i) => (
            <details key={cat.id} open={i === 0}>
              <summary>
                <span className="eyebrow">0{i + 1}</span>
                <h3>{cat.title}</h3>
                <span className="expand-mark">+</span>
              </summary>
              <div className="skill-content">
                <p>{cat.description}</p>
                <div className="skill-list">
                  {cat.skills.map((s) => (
                    <div className="skill-item" key={s.name}>
                      <strong>{s.name}</strong>
                      <small>{s.level}</small>
                      <span>{s.tags?.join(" · ")}</span>
                      <meter
                        min={0}
                        max={100}
                        value={s.proficiency}
                        aria-label={`${s.name} self-assessed proficiency`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
        <div className="repo-stats">
          {stats.map((s) => (
            <div key={s.label}>
              <strong>{s.number}</strong>
              <span>{s.label}</span>
              <small>{s.subtext}</small>
            </div>
          ))}
        </div>
      </section>
      <section className="interlude chapter" id="lab">
        <p className="eyebrow accent">04 / FOR THE CURIOUS</p>
        <div className="interlude-heading">
          <h2>
            There’s more
            <br />
            under the <em>surface.</em>
          </h2>
          <p className="body-copy">
            Look around the command line.
            <br />
            Leave a thought for the next visitor.
          </p>
        </div>
        <div className="discovery-links">
          <button onClick={() => setModal("terminal")}>
            <TerminalIcon />
            <span>
              <strong>Open the terminal</strong>
              <small>My background, stack, and work. One command away.</small>
            </span>
            <ArrowUpRight />
          </button>
          <button id="guestbook" onClick={() => setModal("guestbook")}>
            <span className="guest-symbol">✳</span>
            <span>
              <strong>Sign the guestbook</strong>
              <small>A small space for people who make things.</small>
            </span>
            <ArrowUpRight />
          </button>
        </div>
      </section>
      <section id="contact" className="contact chapter">
        <p className="eyebrow accent">05 / THE NEXT CONNECTION</p>
        <div className="contact-title">
          <h2>
            Great things start
            <br />
            with a <em>hello.</em>
            <span className="accent">↗</span>
          </h2>
        </div>
        <div className="contact-bottom">
          <div>
            <p className="body-copy">
              Have an idea, an opportunity, or a difficult problem?
              <br />
              Let’s build something worth putting into the world.
            </p>
            <a className="email-link" href={`mailto:${personalInfo.email}`}>
              {personalInfo.email}
              <ArrowUpRight />
            </a>
            <button className="copy-email" onClick={copy}>
              {copied ? <Check /> : <Copy />}
              {copied ? "Email copied" : "Copy email"}
            </button>
          </div>
          <div className="social-list">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target={s.icon === "mail" ? undefined : "_blank"}
                rel="noreferrer"
              >
                <BrandIcon name={s.icon} />
                <span>{s.name}</span>
                <ArrowUpRight />
              </a>
            ))}
          </div>
        </div>
        <footer>
          <span>© {new Date().getFullYear()} EMMANUEL ODEMUYIWA</span>
          <span>ENGINEERED WITH INTENTION.</span>
          <a href="#hero">BACK TO ORIGIN ↑</a>
        </footer>
      </section>
      <aside className="scene-controls" aria-label="Scene controls">
        <button
          aria-pressed={wireframe}
          aria-label="Toggle wireframe view"
          title="Inspect the geometry"
          onClick={() => setWireframe(!wireframe)}
        >
          <Box />
        </button>
        <span />
        <button
          aria-pressed={paused}
          aria-label={paused ? "Resume animation" : "Pause animation"}
          onClick={() => setPaused(!paused)}
        >
          {paused ? <Play /> : <Pause />}
        </button>
      </aside>
      <span className="scene-label" aria-hidden="true">
        {wireframe ? "GEOMETRY / WIREFRAME" : "ORBITAL STUDY / 001"}
      </span>
      {selected && (
        <Dialog title="Project notes" onClose={() => setSelected(null)}>
          <ProjectDetails project={selected} />
        </Dialog>
      )}
      {modal && (
        <Dialog
          title={
            modal === "terminal"
              ? "Emmanuel / Terminal"
              : modal === "guestbook"
                ? "Visitor guestbook"
                : "Find your way"
          }
          onClose={() => setModal(null)}
        >
          {modal === "terminal" ? (
            <ConsolePanel />
          ) : modal === "guestbook" ? (
            <GuestbookPanel />
          ) : (
            <>
              <h2>Where to?</h2>
              <input
                className="search-input"
                aria-label="Search portfolio"
                placeholder="Search projects, skills, contact…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="search-results">
                {chapters
                  .filter((c) =>
                    c.label.toLowerCase().includes(query.toLowerCase()),
                  )
                  .map((c) => (
                    <button key={c.id} onClick={() => go(c.id)}>
                      {c.label}
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
              <p className="fine-print">Ctrl / ⌘ K to open · Escape to close</p>
            </>
          )}
        </Dialog>
      )}
    </main>
  );
}
