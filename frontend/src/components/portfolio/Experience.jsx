import React from "react";
import { Briefcase, Sparkles } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="section-pad" data-testid="experience-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="eyebrow">Experience</div>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-tight">
            Where I'm currently <span className="text-gradient">growing</span>.
          </h2>
        </div>

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 glass-strong rounded-2xl p-8 card-hover relative overflow-hidden" data-testid="experience-card-inamigos">
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full brand-gradient opacity-10 blur-3xl" />
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl brand-gradient grid place-items-center text-white shadow-md shrink-0">
                <Briefcase />
              </div>
              <div>
                <div className="font-mono-sm text-[color:var(--brand)]">Ongoing · Internship</div>
                <h3 className="mt-1 font-display text-2xl sm:text-3xl">
                  AI Web Development Intern
                </h3>
                <div className="mt-1 text-[color:var(--ink)] font-semibold">InAmigos Foundation</div>
                <p className="mt-4 text-[color:var(--ink-soft)] leading-relaxed">
                  Contributing to AI-driven web initiatives — building front-end interfaces,
                  integrating data flows and exploring how machine learning concepts can power
                  smarter web experiences.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-[color:var(--ink-soft)]">
                  {[
                    "Developing responsive interfaces with modern web stacks",
                    "Collaborating on AI-powered features and integrations",
                    "Translating product requirements into clean, maintainable code",
                  ].map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full brand-gradient" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 glass rounded-2xl p-8 card-hover">
            <Sparkles className="text-[color:var(--brand)]" />
            <h4 className="mt-3 font-display text-xl">Looking for the next step</h4>
            <p className="mt-2 text-[color:var(--ink-soft)] text-sm leading-relaxed">
              Open to <span className="font-semibold text-[color:var(--ink)]">Data Science</span>,
              <span className="font-semibold text-[color:var(--ink)]"> Analytics</span> and
              <span className="font-semibold text-[color:var(--ink)]"> ML Engineering</span>
              internships where I can contribute and keep learning.
            </p>
            <a
              data-testid="experience-cta-contact"
              href="#contact"
              className="mt-5 inline-flex btn-primary rounded-full px-5 py-2 text-sm font-semibold"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
