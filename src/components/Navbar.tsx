import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#laboratory', label: 'Hangar' },
  { href: '#assembly', label: 'Fighter 3D' },
  { href: '#web-engineering', label: 'Web Systems' },
  { href: '#ai-chamber', label: 'AI Chamber' },
  { href: '#propulsion', label: 'Propulsion' },
  { href: '#aerodynamics', label: 'Aero Lab' },
  { href: '#systems', label: 'Systems' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-11 z-30 transition-colors duration-500 ${
        scrolled ? 'border-b hairline bg-void/85 backdrop-blur-md' : 'bg-void/40 backdrop-blur-sm'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <a
          href="#top"
          className="display flex items-center gap-2.5 text-xs font-semibold tracking-[0.28em] text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
              fill="none"
              stroke="#67e8f9"
              strokeWidth="1.5"
            />
          </svg>
          <span>EMMANUEL ODEMUYIWA</span>
          <span className="hidden text-haze/70 md:inline">· AERO × WEB × AI</span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-5 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="display text-[0.68rem] font-medium uppercase tracking-[0.16em] text-haze transition-colors hover:text-ion"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="display rounded-full border border-ion/50 px-3.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ion transition-colors hover:bg-ion hover:text-void"
          >
            Get in touch
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 rounded text-slate-400 hover:text-white lg:hidden border border-slate-800"
            aria-label="Toggle navigation menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-cyan-500/20 bg-[#070a0f]/95 px-6 py-4 flex flex-col gap-3 font-mono text-xs">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-cyan-400 py-1 uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
