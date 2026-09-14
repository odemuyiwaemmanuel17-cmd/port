"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowUpRight, Pause, Play, Menu, X, Terminal, ScanEye } from "lucide-react";
import { personalInfo, projects, skillCategories, socialLinks, stats } from "../data/portfolio-data";
import type { Project } from "../types/portfolio";
import { BrandIcon, Dialog, ProjectDetails, ConsolePanel, GuestbookPanel } from "./PortfolioExperience";
import { eyePose } from "../lib/eye-timeline";
const Scene = dynamic(() => import("./EyeScene"), { ssr:false });
const nav = [{id:"home",name:"Home"},{id:"about",name:"About"},{id:"projects",name:"Projects"},{id:"contact",name:"Contact"}];
const chapterNames = ["Vision", "Perspective", ...projects.map(p=>p.title), "Connect"];
const projectCopy = [
  ["Build trust into the transaction.", "A digital marketplace connecting vetted businesses and buyers. Verification, financial clarity, and secure acquisition workflows."],
  ["Real problems. Reliable people.", "HandyTrust connects people with verified artisans. Protected payments and clear job tracking turn uncertainty into trust."],
  ["Look beneath the interface.", "AppMD reveals what an Android application is made of. Analysis tools that turn complex APKs into understandable information."],
  ["Give creativity better tools.", "A browser-based studio for batch image processing and collage composition. Practical tools, precise layouts, and local processing."],
  ["From first principles to flight.", "Parametric wing modeling connects aerospace theory with tangible geometry. Explore airfoil profiles and the mathematics behind flight."]
];
export default function EyeExperience(){
 const root=useRef<HTMLElement>(null);
 const [paused,setPaused]=useState(false),[menu,setMenu]=useState(false),[active,setActive]=useState(0),[selected,setSelected]=useState<Project|null>(null),[modal,setModal]=useState<"terminal"|"guestbook"|"skills"|"search"|null>(null),[query,setQuery]=useState("");
 const freeze=paused||!!modal||!!selected;
 useEffect(()=>{
   const key=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();setModal(v=>v==="search"?null:"search");setQuery("");}};
   window.addEventListener("keydown",key);return()=>window.removeEventListener("keydown",key);
 },[]);
 useEffect(()=>{
   const el=root.current!;const sections=Array.from(el.querySelectorAll<HTMLElement>(".eye-chapter"));
   const reduced=matchMedia("(prefers-reduced-motion: reduce)");let frame=0;
   const update=()=>{frame=0;const stride=sections[1].offsetTop-sections[0].offsetTop;const q=Math.max(0,Math.min(7,(window.scrollY-el.offsetTop)/stride));el.dataset.chapterProgress=String(q);setActive(Math.floor(q));
     const pose=eyePose(q,reduced.matches||paused);el.style.setProperty("--ring-turn",`${pose.rotation}rad`);el.style.setProperty("--ring-back",`${-pose.rotation*.7}rad`);el.style.setProperty("--eye-zoom",String(pose.zoom));el.style.setProperty("--eye-tilt",`${pose.tilt}rad`);el.style.setProperty("--journey",`${q/7*100}%`);
     sections.forEach((s,i)=>{const local=(window.scrollY-s.offsetTop)/stride;const opacity=reduced.matches?1:local<0?Math.max(0,1+local*5):i===7?1:Math.max(0,1-Math.max(0,local-.48)*3.8);s.style.setProperty("--chapter-opacity",String(opacity));s.dataset.visible=String(opacity>.15);});
   };
   const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};update();window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule);reduced.addEventListener("change",schedule);
   return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);reduced.removeEventListener("change",schedule);};
 },[paused]);
 const jump=(id:string)=>{setModal(null);setMenu(false);document.getElementById(id)?.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});};
 return <main ref={root} className="eye-experience" data-paused={freeze}>
 <a className="skip-link" href="#projects">Skip to projects</a>
 <div className="eye-world"><Scene paused={freeze}/><div className="eye-vignette"/></div>
 <header className="eye-nav"><a href="#home" className="eye-wordmark" aria-label="Emmanuel Odemuyiwa home"><ScanEye/><span>EO<span className="eye-wordmark-dot">.</span></span></a><span className="eye-nav-caption">EMMANUEL ODEMUYIWA<br/><b>ENGINEERING × SOFTWARE</b></span><nav aria-label="Main navigation" className={menu?"is-open":""}>{nav.map(n=><a key={n.id} href={`#${n.id}`} onClick={()=>setMenu(false)}>{n.name}</a>)}<button onClick={()=>{setModal("guestbook");setMenu(false);}}>Guestbook</button></nav><button className="eye-menu" aria-label="Toggle menu" aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>
 <aside className="eye-coordinate" aria-hidden="true"><span>EO / OPTICAL ARCHIVE</span><span>EST. IN NIGERIA · OPEN TO THE WORLD</span></aside>
 <section id="home" className="eye-chapter"><div className="eye-chapter-stage"><div className="eye-copy eye-intro"><p className="eye-kicker"><span/> THE WORLD THROUGH MY LENS</p><h1>A different<br/>way to <em>see.</em></h1><p className="eye-description">I’m Emmanuel. Aerospace engineering student.<br className="eye-desktop"/> Full-stack & mobile developer.<br/>I connect ideas to things that work.</p><a className="eye-link" href="#about">Enter my perspective <ArrowDown/></a></div><a className="eye-lens-target" href="#about" aria-label="Activate the eye and explore my background"><span className="eye-target-label">ACTIVATE LENS <ArrowDown/></span></a><div className="eye-bottom-note"><span>01 — VISION</span><span>SCROLL TO FOCUS <ArrowDown/></span></div></div></section>
 <section id="about" className="eye-chapter"><div className="eye-chapter-stage"><div className="eye-copy"><p className="eye-kicker">02 / PERSPECTIVE</p><h2>Two disciplines.<br/><em>One curiosity.</em></h2><p className="eye-description">From the physics of flight to the logic of software. I’m studying aerospace engineering at Obafemi Awolowo University while building web platforms, mobile applications, and intelligent tools.</p><button className="eye-link" onClick={()=>setModal("skills")}>Explore my background & skills <ArrowUpRight/></button><div className="eye-small-tags"><span>AEROSPACE</span><span>FULL STACK</span><span>3D CAD</span></div></div><button className="eye-lens-target" onClick={()=>setModal("skills")} aria-label="Open all skills and background"><span className="eye-target-label">EXPLORE SKILLS <ArrowUpRight/></span></button><div className="eye-bottom-note"><span>FOCUS / ENGINEERING + SOFTWARE</span><a href="#projects">Selected work <ArrowDown/></a></div></div></section>
 {projects.map((p,i)=><section id={i===0?"projects":`project-${p.id}`} className="eye-chapter eye-project" key={p.id}><div className="eye-chapter-stage"><div className="eye-copy"><p className="eye-kicker">SELECTED WORK / {String(i+1).padStart(2,"0")} — 05</p><p className="eye-project-name">{p.title}</p><h2>{projectCopy[i][0]}</h2><p className="eye-description">{projectCopy[i][1]}</p><div className="eye-small-tags">{p.tags.slice(0,3).map(t=><span key={t}>{t}</span>)}</div><button className="eye-link" onClick={()=>setSelected(p)}>Explore project <ArrowUpRight/></button></div><button className="eye-lens-target" onClick={()=>setSelected(p)} aria-label={`Open ${p.title} project details`}><span className="eye-target-id">0{i+1}</span><span className="eye-target-label">{p.title} <ArrowUpRight/></span></button><div className="eye-bottom-note"><span>{p.category.toUpperCase()} / PROJECT ARCHIVE</span><a href={i===4?"#contact":`#project-${projects[i+1].id}`}>{i===4?"Connect":"Next project"} <ArrowDown/></a></div></div></section>)}
 <section id="contact" className="eye-chapter"><div className="eye-chapter-stage"><div className="eye-copy"><p className="eye-kicker"><span/> OPEN TO WHAT’S NEXT</p><h2>Have a vision?<br/><em>Let’s build it.</em></h2><p className="eye-description">Available for engineering projects, software roles, and ambitious collaborations.</p><a className="eye-link" href={`mailto:${personalInfo.email}`}>Start a conversation <ArrowUpRight/></a><div className="eye-socials">{socialLinks.map(s=><a key={s.name} href={s.url} target={s.icon==="mail"?undefined:"_blank"} rel="noreferrer"><BrandIcon name={s.icon}/><span>{s.name}</span></a>)}</div><button className="eye-guestbook" onClick={()=>setModal("guestbook")}>Leave a note in the guestbook ↗</button></div><a className="eye-lens-target" href={`mailto:${personalInfo.email}`} aria-label="Email Emmanuel"><span className="eye-target-label">CONNECT <ArrowUpRight/></span></a><div className="eye-bottom-note"><span>© {new Date().getFullYear()} EMMANUEL ODEMUYIWA</span><a href="#home">Return to the beginning ↑</a></div></div></section>
 <div className="eye-controls"><button onClick={()=>setModal("terminal")} aria-label="Open terminal"><Terminal/></button><button aria-label={paused?"Resume ambient motion":"Pause ambient motion"} aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?<Play/>:<Pause/>}</button><span className="eye-current">{String(active+1).padStart(2,"0")} / 08 <b>{chapterNames[active]}</b></span></div>
 <nav className="eye-chapter-nav" aria-label="Story chapters">{chapterNames.map((name,i)=><a key={i} href={i===0?"#home":i===1?"#about":i===7?"#contact":i===2?"#projects":`#project-${projects[i-2].id}`} aria-label={name} aria-current={active===i?"step":undefined}><span>{name}</span></a>)}</nav>
 <div className="eye-progress" aria-hidden="true"><i/></div>
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
</main>;
}
