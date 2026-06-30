import React, { useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";

const PROJECTS = [
  {
    title: "Temperature Prediction",
    image:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1200&q=70",
    desc:
      "Built a supervised regression model to forecast daily temperatures from historical climate data. Cleaned, engineered weather signals, compared algorithms, and visualised predictions vs. actuals to validate model quality.",
    tech: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
  },
  {
    title: "Quantity Analysis",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=70",
    desc:
      "Analyzed sales and inventory quantities across categories to surface demand trends, identify slow-moving items, and recommend smarter stocking strategies through clear, story-driven visualisations.",
    tech: ["Python", "Pandas", "Seaborn", "EDA"],
  },
  {
    title: "Time Series Data Analysis",
    image:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=70",
    desc:
      "Analyzed long-horizon time series data with decomposition, rolling statistics, and seasonality detection to uncover business-level trends and prepare features for forecasting models.",
    tech: ["Python", "Pandas", "Statsmodels", "Matplotlib"],
  },
  {
    title: "COVID-19 Impact in India",
    image:
      "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=1200&q=70",
    desc:
      "Built interactive dashboards in IBM Cognos Analytics tracking infection waves, recovery rates and state-level impact across India — turning raw public data into a clear executive view.",
    tech: ["IBM Cognos", "Data Visualization", "Analytics"],
  },
  {
    title: "House Price Prediction",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=70",
    desc:
      "Trained supervised regression models to predict house prices from structural, locational and market features. Compared algorithms, tuned hyperparameters, and evaluated with RMSE / R².",
    tech: ["Python", "Scikit-learn", "Pandas", "Seaborn"],
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
            A snapshot of projects that show my data analysis and modeling workflow — from raw
            data to deployable insight.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-7">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} index={i} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ index, project }) {
  const num = String(index + 1).padStart(2, "0");
  const [imgOk, setImgOk] = useState(true);

  return (
    <article
      data-testid={`project-card-${index}`}
      className="project-card rounded-3xl overflow-hidden flex flex-col card-hover"
    >
      <div className="relative h-56 sm:h-64 overflow-hidden">
        {imgOk ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2238] via-[#0e1426] to-[#0a0e1a]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/95 via-[#0a0e1a]/35 to-transparent" />
        <span className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/55 border border-amber-400/30 backdrop-blur-sm">
          <span className="w-1 h-1 rounded-full bg-amber-400" />
          <span className="font-mono-sm text-amber-300/95">Project · {num}</span>
        </span>
      </div>

      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <h3 className="font-display text-2xl sm:text-3xl leading-tight text-white">
          {project.title}
        </h3>

        <p className="mt-3 text-[color:var(--ink-soft)] text-sm leading-relaxed">
          {project.desc}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="project-tag">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
          <a
            data-testid={`project-learn-more-${index}`}
            href="https://github.com/shikhayadav29"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-semibold text-sm group"
          >
            Learn More
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <a
            href="https://github.com/shikhayadav29"
            target="_blank"
            rel="noreferrer"
            aria-label="Open on GitHub"
            className="text-white/40 hover:text-white transition"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </article>
  );
}
