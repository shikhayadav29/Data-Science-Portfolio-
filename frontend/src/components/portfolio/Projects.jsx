import React from "react";
import { ArrowUpRight, Thermometer, BarChart3, TrendingUp, Activity, Home } from "lucide-react";

const PROJECTS = [
  {
    title: "Temperature Prediction",
    icon: Thermometer,
    desc: "Built a regression model to forecast daily temperatures using historical climate data and feature engineering on weather signals.",
    tech: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
    accent: "from-[#1e5ef0] to-[#0ea5e9]",
  },
  {
    title: "Quantity Analysis",
    icon: BarChart3,
    desc: "Analyzed sales and inventory quantities across categories to surface demand trends and recommend stocking strategies.",
    tech: ["Python", "Pandas", "Seaborn"],
    accent: "from-[#2f8cf5] to-[#6ea8fe]",
  },
  {
    title: "Time Series Data Analysis",
    icon: TrendingUp,
    desc: "Explored seasonality, trend and noise in time-indexed data with decomposition, moving averages and visual storytelling.",
    tech: ["Python", "NumPy", "Matplotlib", "Statsmodels"],
    accent: "from-[#0ea5e9] to-[#1e5ef0]",
  },
  {
    title: "COVID-19 Impact in India",
    icon: Activity,
    desc: "Built an interactive analytics dashboard in IBM Cognos to visualize state-level COVID-19 impact across cases, recoveries and deaths.",
    tech: ["IBM Cognos", "Data Visualization", "Storytelling"],
    accent: "from-[#1e5ef0] to-[#2f8cf5]",
  },
  {
    title: "House Price Prediction",
    icon: Home,
    desc: "Trained a supervised model to predict house prices from structural, locational and market features using regression techniques.",
    tech: ["Python", "Scikit-learn", "Pandas", "Seaborn"],
    accent: "from-[#6ea8fe] to-[#0ea5e9]",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-pad" data-testid="projects-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="eyebrow">Projects</div>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-tight">
              Selected <span className="text-gradient">work</span> &amp; case studies.
            </h2>
          </div>
          <p className="text-[color:var(--ink-soft)] max-w-md">
            A snapshot of projects that show my data analysis and modeling workflow — from raw data
            to deployable insight.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <article
              key={p.title}
              data-testid={`project-card-${i}`}
              className={`glass rounded-2xl p-6 card-hover border border-white/60 ${
                i === 0 ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
            >
              <div
                className={`h-32 rounded-xl bg-gradient-to-br ${p.accent} relative overflow-hidden flex items-end p-4`}
              >
                <div className="absolute inset-0 opacity-30 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.55), transparent 40%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.35), transparent 50%)",
                  }}
                />
                <p.icon className="text-white/95 drop-shadow" size={36} />
              </div>
              <h3 className="mt-5 font-display text-2xl">{p.title}</h3>
              <p className="mt-2 text-[color:var(--ink-soft)] text-sm leading-relaxed">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/70 border border-[color:var(--line)] text-[color:var(--ink-soft)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <button
                data-testid={`project-learn-more-${i}`}
                onClick={() =>
                  window.open("https://github.com/shikhayadav29", "_blank", "noreferrer")
                }
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--brand)] group"
              >
                Learn More
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
