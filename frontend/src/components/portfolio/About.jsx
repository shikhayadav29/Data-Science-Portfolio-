import React from "react";
import { Brain, LineChart, Sparkles, Target } from "lucide-react";

const HIGHLIGHTS = [
  { icon: Brain, label: "AI & Machine Learning enthusiast" },
  { icon: LineChart, label: "Data analysis & visualization" },
  { icon: Target, label: "Real-world problem solver" },
  { icon: Sparkles, label: "Continuous learning mindset" },
];

export default function About() {
  return (
    <section id="about" className="section-pad" data-testid="about-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="eyebrow">About Me</div>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-tight">
              Turning <span className="text-gradient">data</span> into decisions.
            </h2>
            <p className="mt-6 text-[color:var(--ink-soft)] leading-relaxed">
              I'm Shikha Yadav, a third-year BCA student specializing in Data Science &amp;
              Artificial Intelligence at Babu Banarasi Das University, Lucknow. Originally from
              Pratapgarh, Uttar Pradesh, I'm building a career around extracting meaning from data
              and crafting intelligent, data-driven products.
            </p>
            <p className="mt-4 text-[color:var(--ink-soft)] leading-relaxed">
              My work blends Python, SQL and modern analytics tools with a strong curiosity for
              Machine Learning. I love translating messy datasets into clean dashboards, predictive
              models, and stories that help people make better decisions.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4">
              {HIGHLIGHTS.map((h, i) => (
                <div
                  key={i}
                  data-testid={`about-highlight-${i}`}
                  className="glass rounded-2xl p-6 card-hover"
                >
                  <div className="w-10 h-10 rounded-xl brand-gradient grid place-items-center text-white shadow-md">
                    <h.icon size={18} />
                  </div>
                  <p className="mt-4 font-display text-lg">{h.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 glass-strong rounded-2xl p-6 grid grid-cols-3 gap-6 text-center">
              <Stat value="5+" label="Projects" />
              <Stat value="10+" label="Tools & Tech" />
              <Stat value="2026" label="Graduating Soon" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="font-display text-3xl sm:text-4xl text-gradient">{value}</div>
      <div className="font-mono-sm text-[color:var(--ink-soft)] mt-1">{label}</div>
    </div>
  );
}
