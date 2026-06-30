import React from "react";
import {
  BarChart3,
  LineChart,
  Code2,
  Database,
  LayoutDashboard,
  Cpu,
} from "lucide-react";

const SERVICES = [
  { icon: BarChart3, title: "Data Analysis", desc: "Exploratory analysis, cleaning and insight generation from messy real-world datasets." },
  { icon: LineChart, title: "Data Visualization", desc: "Clear, story-driven charts with Matplotlib, Seaborn and dashboard tools." },
  { icon: Code2, title: "Python Programming", desc: "Scripts, automations and analytical pipelines built with idiomatic Python." },
  { icon: Database, title: "SQL Database Solutions", desc: "Querying, joining and aggregating relational data for analytics workloads." },
  { icon: LayoutDashboard, title: "Dashboard Development", desc: "Interactive dashboards (e.g., IBM Cognos) to monitor KPIs and outcomes." },
  { icon: Cpu, title: "Basic Machine Learning", desc: "Supervised learning workflows — regression, classification and evaluation." },
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
              className="glass rounded-2xl p-6 card-hover relative overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full brand-gradient opacity-10 blur-2xl" />
              <div className="w-11 h-11 rounded-xl brand-gradient grid place-items-center text-white shadow-md">
                <s.icon size={18} />
              </div>
              <h3 className="mt-4 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-[color:var(--ink-soft)] text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[color:var(--line)] to-transparent" />
              <div className="mt-3 font-mono-sm text-[color:var(--brand)]">0{i + 1} / Service</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
