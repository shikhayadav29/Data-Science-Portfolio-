import React from "react";
import { BarChart3, LineChart, Cpu } from "lucide-react";

const SERVICES = [
  {
    icon: BarChart3,
    title: "Data Analysis",
    desc:
      "Exploratory analysis, cleaning and insight generation from messy, real-world datasets — turning raw numbers into clear, actionable findings.",
  },
  {
    icon: Cpu,
    title: "Predictive Modeling",
    desc:
      "Supervised machine learning workflows — regression, classification, evaluation and tuning — to forecast outcomes from historical data.",
  },
  {
    icon: LineChart,
    title: "Data Visualization",
    desc:
      "Story-driven charts and dashboards with Matplotlib, Seaborn and IBM Cognos that make complex data easy to read and decide on.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-pad" data-testid="services-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="eyebrow">Services</div>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-tight">
            How I can <span className="text-gradient">help your team</span>.
          </h2>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              data-testid={`service-card-${i}`}
              className="glass rounded-2xl p-7 card-hover relative overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full brand-gradient opacity-10 blur-3xl" />
              <div className="w-12 h-12 rounded-xl brand-gradient grid place-items-center text-[#1a1208] shadow-md">
                <s.icon size={20} />
              </div>
              <h3 className="mt-5 font-display text-2xl">{s.title}</h3>
              <p className="mt-3 text-[color:var(--ink-soft)] text-sm leading-relaxed">
                {s.desc}
              </p>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[color:var(--line)] to-transparent" />
              <div className="mt-3 font-mono-sm text-[color:var(--brand)]">0{i + 1} / Service</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
