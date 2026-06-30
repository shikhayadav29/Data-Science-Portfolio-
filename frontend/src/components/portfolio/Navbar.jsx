import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "experience", label: "Experience" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      let current = "home";
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= 120) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all ${
            scrolled ? "glass-strong" : "glass"
          }`}
        >
          <button
            data-testid="nav-logo"
            onClick={() => go("home")}
            className="flex items-center gap-2.5 group"
          >
            <span className="w-9 h-9 rounded-xl bg-[#0b0f1f] grid place-items-center shadow-lg ring-1 ring-white/40 overflow-hidden">
              <img
                src="/logo.jpeg"
                alt="SY logo"
                className="w-full h-full object-contain p-0.5"
              />
            </span>
            <span className="font-display text-lg sm:text-xl text-[color:var(--ink)]">
              Shikha <span className="text-[color:var(--brand)]">Yadav</span>
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {LINKS.map((l) => (
              <button
                key={l.id}
                data-testid={`nav-link-${l.id}`}
                onClick={() => go(l.id)}
                className={`nav-link text-[13px] font-medium tracking-wide ${
                  active === l.id ? "active" : ""
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              data-testid="nav-cta-contact"
              onClick={() => go("contact")}
              className="hidden md:inline-flex btn-primary rounded-full px-5 py-2 text-sm font-semibold"
            >
              Hire Me
            </button>
            <button
              data-testid="nav-mobile-toggle"
              className="lg:hidden p-2 rounded-lg glass"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden mt-2 rounded-2xl glass-strong p-3" data-testid="nav-mobile-menu">
            <div className="grid grid-cols-2 gap-1">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  data-testid={`nav-mobile-link-${l.id}`}
                  onClick={() => go(l.id)}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/70 ${
                    active === l.id ? "text-[color:var(--brand)]" : "text-[color:var(--ink-soft)]"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
