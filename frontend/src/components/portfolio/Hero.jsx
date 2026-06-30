import React, { useRef, useState } from "react";
import { Camera, Download, ArrowDown, Sparkles, Github, Linkedin, Mail, Code2, Database, LineChart, Cpu } from "lucide-react";
import { toast } from "sonner";
import { uploadPhoto, absoluteUrl } from "@/lib/api";

const CHIP_ICONS = {
  Python: Code2,
  SQL: Database,
  "Data Viz": LineChart,
  ML: Cpu,
};

function FloatingChip({ className = "", label }) {
  const Icon = CHIP_ICONS[label] || Sparkles;
  return (
    <div
      className={`absolute z-10 px-3 py-2 rounded-xl flex items-center gap-2 text-[12px] font-semibold text-white/90 ${className}`}
      style={{
        background: "rgba(15, 17, 28, 0.75)",
        border: "1px solid rgba(255, 255, 255, 0.10)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "0 10px 30px -12px rgba(0,0,0,0.7)",
      }}
    >
      <span
        className="w-5 h-5 rounded-md grid place-items-center"
        style={{
          background: "linear-gradient(135deg, rgba(250,204,21,0.25), rgba(77,139,255,0.25))",
          color: "#facc15",
        }}
      >
        <Icon size={12} />
      </span>
      {label}
    </div>
  );
}

export default function Hero({ profile, onUploaded }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const photoSrc = profile?.photo_url ? absoluteUrl(profile.photo_url) : null;

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    setUploading(true);
    try {
      await uploadPhoto(file);
      toast.success("Profile photo updated");
      onUploaded?.();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const downloadResume = () => {
    if (profile?.resume_url) {
      window.open(absoluteUrl(profile.resume_url), "_blank");
    } else {
      go("resume");
      toast.info("Upload your resume in the Resume section to enable download");
    }
  };

  return (
    <section id="home" className="section-pad pt-36 relative overflow-hidden" data-testid="hero-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="eyebrow fade-up">Portfolio · 2026</div>
            <h1 className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] fade-up d-1">
              Hi, I'm <span className="text-gradient">Shikha Yadav</span>
              <span className="block text-[color:var(--ink-soft)] text-2xl sm:text-3xl mt-3 font-normal">
                Aspiring Data Scientist
              </span>
            </h1>
            <p className="mt-6 text-[color:var(--ink-soft)] text-base sm:text-lg leading-relaxed max-w-2xl fade-up d-2">
              BCA — Data Science &amp; Artificial Intelligence student at Babu Banarasi Das
              University. I turn raw data into clear insights using Python, SQL and modern
              visualization tools — currently learning Machine Learning and building real-world
              projects.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 fade-up d-3">
              <button
                data-testid="hero-cta-projects"
                onClick={() => go("projects")}
                className="btn-primary rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
              >
                View Projects <ArrowDown size={16} />
              </button>
              <button
                data-testid="hero-cta-resume"
                onClick={downloadResume}
                className="btn-ghost rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
              >
                <Download size={16} /> Download Resume
              </button>
              <button
                data-testid="hero-cta-contact"
                onClick={() => go("contact")}
                className="btn-ghost rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
              >
                Contact Me
              </button>
            </div>

            <div className="mt-10 flex items-center gap-5 fade-up d-4">
              <a
                data-testid="hero-social-linkedin"
                href="https://www.linkedin.com/in/shikha-yadav-4769b9372"
                target="_blank"
                rel="noreferrer"
                className="text-[color:var(--ink-soft)] hover:text-[color:var(--brand)] transition"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                data-testid="hero-social-github"
                href="https://github.com/shikhayadav29"
                target="_blank"
                rel="noreferrer"
                className="text-[color:var(--ink-soft)] hover:text-[color:var(--brand)] transition"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                data-testid="hero-social-email"
                href="mailto:shikha29072005@gmail.com"
                className="text-[color:var(--ink-soft)] hover:text-[color:var(--brand)] transition"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <div className="ml-2 h-px w-16 bg-gradient-to-r from-[color:var(--brand)] to-transparent" />
              <span className="font-mono-sm text-[color:var(--ink-soft)]">Lucknow, India</span>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center" data-testid="hero-photo-area">
            <div className="relative">
              <div className="absolute -inset-16 rounded-full" aria-hidden style={{
                background: "radial-gradient(closest-side, rgba(77,139,255,0.25), rgba(34,211,238,0.10) 55%, transparent 75%)",
                filter: "blur(10px)",
              }} />
              <div className="absolute -inset-10 rounded-full opacity-70 blur-3xl" aria-hidden style={{
                background: "radial-gradient(closest-side, rgba(250,204,21,0.22), transparent 70%)",
              }} />
              <div className="photo-ring w-[280px] h-[340px] sm:w-[340px] sm:h-[420px]" style={{ borderRadius: "9999px" }}>
                <div className="photo-inner w-full h-full flex items-center justify-center">
                  {photoSrc ? (
                    <img
                      data-testid="hero-photo-img"
                      src={photoSrc}
                      alt="Shikha Yadav"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "center 22%" }}
                    />
                  ) : (
                    <div className="text-center px-6">
                      <Sparkles className="mx-auto text-[color:var(--brand)]" />
                      <p className="mt-3 font-display text-xl">Upload your photo</p>
                      <p className="text-xs text-[color:var(--ink-soft)] mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating skill chips */}
              <FloatingChip className="-left-6 top-10" label="Python" />
              <FloatingChip className="-right-4 top-28" label="SQL" />
              <FloatingChip className="-left-2 bottom-16" label="Data Viz" />
              <FloatingChip className="-right-6 bottom-8" label="ML" />

              <button
                data-testid="hero-upload-photo-btn"
                onClick={() => fileRef.current?.click()}
                className="absolute bottom-3 right-3 btn-primary rounded-full w-12 h-12 grid place-items-center shadow-xl z-10"
                aria-label="Upload profile photo"
                disabled={uploading}
              >
                <Camera size={18} />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="visually-hidden"
                onChange={handleFile}
                data-testid="hero-upload-photo-input"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
