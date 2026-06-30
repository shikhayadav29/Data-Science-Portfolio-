import React from "react";
import {
  Code2,
  Database,
  FileCode2,
  BarChart3,
  GitBranch,
  Github,
  Sigma,
  Table,
  LineChart,
  PieChart,
  Cpu,
  Palette,
} from "lucide-react";

const SKILLS = [
  { name: "Python", level: 88, icon: Code2 },
  { name: "SQL", level: 80, icon: Database },
  { name: "Pandas", level: 85, icon: Table },
  { name: "NumPy", level: 82, icon: Sigma },
  { name: "Matplotlib", level: 78, icon: LineChart },
  { name: "Seaborn", level: 75, icon: PieChart },
  { name: "Data Analysis", level: 84, icon: BarChart3 },
  { name: "Data Visualization", level: 80, icon: Palette },
  { name: "Machine Learning", level: 55, icon: Cpu },
  { name: "HTML", level: 85, icon: FileCode2 },
  { name: "CSS", level: 78, icon: Palette },
  { name: "Git", level: 75, icon: GitBranch },
  { name: "GitHub", level: 80, icon: Github },
];

export default function Skills() {
  return (
    <section id="skills" className="section-pad" data-testid="skills-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="eyebrow">Skills</div>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-tight">
              Tools that turn <span className="text-gradient">ideas into insights</span>.
            </h2>
          </div>
          <p className="text-[color:var(--ink-soft)] max-w-md">
            A working toolkit I use across analysis, visualization and the early stages of machine
            learning.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS.map((s, i) => (
            <div
              key={s.name}
              data-testid={`skill-card-${s.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="glass rounded-2xl p-5 card-hover"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[color:var(--line)] grid place-items-center text-[color:var(--brand)] shadow-sm">
                  <s.icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-xs text-[color:var(--ink-soft)] font-mono-sm">
                    {s.level >= 80 ? "Advanced" : s.level >= 65 ? "Intermediate" : "Learning"}
                  </div>
                </div>
                <div className="font-display text-lg text-[color:var(--brand)]">{s.level}%</div>
              </div>
              <div className="skill-bar mt-4">
                <span style={{ width: `${s.level}%`, animationDelay: `${i * 60}ms` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
