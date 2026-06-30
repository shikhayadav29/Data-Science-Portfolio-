import React, { useRef, useState } from "react";
import { Camera, Download, ArrowDown, Sparkles, Github, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";
import { uploadPhoto, absoluteUrl } from "@/lib/api";

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
                Aspiring Data Scientist · AI &amp; ML Enthusiast
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
              <div className="absolute -inset-10 brand-gradient opacity-20 blur-3xl rounded-full" aria-hidden />
              <div className="photo-ring w-[280px] h-[280px] sm:w-[340px] sm:h-[340px]">
                <div className="photo-inner w-full h-full bg-white flex items-center justify-center">
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

              <button
                data-testid="hero-upload-photo-btn"
                onClick={() => fileRef.current?.click()}
                className="absolute bottom-3 right-3 btn-primary rounded-full w-12 h-12 grid place-items-center shadow-xl"
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
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-strong rounded-full px-4 py-1.5 text-xs font-mono-sm text-[color:var(--brand)] whitespace-nowrap">
                {uploading ? "Uploading…" : "Available for Internships"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
