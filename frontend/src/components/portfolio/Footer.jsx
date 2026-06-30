import React from "react";
import { Linkedin, Github, Mail, Phone } from "lucide-react";

const PHONE_DISPLAY = "+91 63942 76341";

const QUICK = [
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

export default function Footer() {
  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="mt-10" data-testid="footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-10">
        <div className="glass-strong rounded-3xl p-8 sm:p-10">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-[#0b0f1f] grid place-items-center shadow-md ring-1 ring-white/40 overflow-hidden">
                  <img
                    src="/logo.jpeg"
                    alt="SY logo"
                    className="w-full h-full object-contain p-0.5"
                  />
                </span>
                <span className="font-display text-2xl">
                  Shikha <span className="text-[color:var(--brand)]">Yadav</span>
                </span>
              </div>
              <p className="mt-4 text-[color:var(--ink-soft)] max-w-md">
                Aspiring Data Scientist building intelligent, data-driven solutions. Currently
                interning as an AI Web Development Intern at InAmigos Foundation.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <a
                  data-testid="footer-social-linkedin"
                  href="https://www.linkedin.com/in/shikha-yadav-4769b9372"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-[color:var(--line)] grid place-items-center text-[color:var(--ink)] hover:text-[color:var(--brand)] transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  data-testid="footer-social-github"
                  href="https://github.com/shikhayadav29"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-[color:var(--line)] grid place-items-center text-[color:var(--ink)] hover:text-[color:var(--brand)] transition"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </a>
                <a
                  data-testid="footer-social-email"
                  href="mailto:shikha29072005@gmail.com"
                  className="w-10 h-10 rounded-full bg-white border border-[color:var(--line)] grid place-items-center text-[color:var(--ink)] hover:text-[color:var(--brand)] transition"
                  aria-label="Email"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="font-mono-sm text-[color:var(--brand)]">Quick Links</div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {QUICK.map((q) => (
                  <button
                    key={q.id}
                    data-testid={`footer-link-${q.id}`}
                    onClick={() => go(q.id)}
                    className="text-left text-sm text-[color:var(--ink-soft)] hover:text-[color:var(--brand)] transition py-1"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="font-mono-sm text-[color:var(--brand)]">Get in touch</div>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-3 text-[color:var(--ink-soft)]">
                  <Mail size={14} className="text-[color:var(--brand)]" />
                  <a className="hover:text-[color:var(--ink)]" href="mailto:shikha29072005@gmail.com">
                    shikha29072005@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3 text-[color:var(--ink-soft)]">
                  <Phone size={14} className="text-[color:var(--brand)]" />
                  <a
                    data-testid="footer-phone"
                    className="hover:text-[color:var(--ink)]"
                    href="tel:+916394276341"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[color:var(--line)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[color:var(--ink-soft)]">
            <div>© 2026 Shikha Yadav. All Rights Reserved.</div>
            <div className="font-mono-sm">Built with Python · React · MongoDB</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
