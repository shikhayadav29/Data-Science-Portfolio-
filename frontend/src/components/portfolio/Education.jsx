import React from "react";
import { GraduationCap, MapPin, CalendarDays } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="section-pad" data-testid="education-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="eyebrow">Education</div>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-tight">
            Academic <span className="text-gradient">Journey</span>
          </h2>
          <p className="mt-4 text-[color:var(--ink-soft)]">
            Specializing in Data Science &amp; Artificial Intelligence with hands-on coursework in
            statistics, programming, and ML foundations.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-strong rounded-2xl p-8 card-hover" data-testid="education-card-bbdu">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl brand-gradient grid place-items-center text-white shadow-md shrink-0">
                <GraduationCap />
              </div>
              <div className="flex-1">
                <div className="font-mono-sm text-[color:var(--brand)]">2023 — Present · 3rd Year</div>
                <h3 className="mt-1 font-display text-2xl sm:text-3xl">
                  Bachelor of Computer Applications
                </h3>
                <p className="mt-1 text-[color:var(--ink-soft)]">
                  Specialization: Data Science &amp; Artificial Intelligence
                </p>
                <div className="mt-3 text-[color:var(--ink)] font-semibold">
                  Babu Banarasi Das University
                </div>
                <div className="text-[color:var(--ink-soft)] text-sm">
                  School of Computer Applications
                </div>

                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  <Badge icon={MapPin} label="Lucknow, Uttar Pradesh" />
                  <Badge icon={CalendarDays} label="Expected 2026" />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Statistics",
                    "Python Programming",
                    "Database Systems",
                    "Machine Learning",
                    "Data Analytics",
                    "Data Visualization",
                  ].map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/70 border border-[color:var(--line)] text-[color:var(--ink-soft)]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-8 card-hover">
            <div className="font-mono-sm text-[color:var(--brand)]">Focus Areas</div>
            <h4 className="mt-2 font-display text-xl">What I'm building expertise in</h4>
            <ul className="mt-4 space-y-3 text-[color:var(--ink-soft)] text-sm">
              {[
                "Exploratory Data Analysis (EDA)",
                "Predictive Modeling with Python",
                "SQL for analytical workloads",
                "Dashboarding with IBM Cognos",
                "Visual storytelling with charts",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full brand-gradient" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[color:var(--line)] text-[color:var(--ink-soft)]">
      <Icon size={14} /> {label}
    </span>
  );
}
