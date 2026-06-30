import React, { useRef, useState } from "react";
import { Download, FileText, Upload, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { uploadResume, absoluteUrl } from "@/lib/api";

export default function Resume({ profile, onUploaded }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const has = Boolean(profile?.resume_url);
  const url = has ? absoluteUrl(profile.resume_url) : null;

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await uploadResume(file);
      toast.success("Resume updated");
      onUploaded?.();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <section id="resume" className="section-pad" data-testid="resume-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="eyebrow">Resume</div>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-tight">
            Download my <span className="text-gradient">CV</span>.
          </h2>
        </div>

        <div className="mt-10 glass-strong rounded-3xl p-8 sm:p-10 grid lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full brand-gradient opacity-15 blur-3xl" />

          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl brand-gradient grid place-items-center text-white shadow-md">
                <FileText />
              </div>
              <div>
                <div className="font-mono-sm text-[color:var(--brand)]">PDF · Latest</div>
                <h3 className="font-display text-2xl">Shikha Yadav — Resume</h3>
              </div>
            </div>
            <p className="mt-5 text-[color:var(--ink-soft)] leading-relaxed">
              Grab a copy of my up-to-date resume — covering education, skills, projects and the
              AI Web Development internship at InAmigos Foundation.
            </p>

            {has && (
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-600 font-medium">
                <CheckCircle2 size={16} /> Resume uploaded · ready to download
              </div>
            )}
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3">
            <a
              data-testid="resume-download-btn"
              href={url || "#resume"}
              onClick={(e) => {
                if (!has) {
                  e.preventDefault();
                  toast.info("Upload your resume below to enable download");
                }
              }}
              target="_blank"
              rel="noreferrer"
              className="btn-primary rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2"
            >
              <Download size={16} /> Download Resume
            </a>
            <button
              data-testid="resume-upload-btn"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="btn-ghost rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2"
            >
              <Upload size={16} /> {uploading ? "Uploading…" : has ? "Replace Resume (PDF)" : "Upload Resume (PDF)"}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="visually-hidden"
              onChange={handleFile}
              data-testid="resume-upload-input"
            />
            <p className="text-xs text-[color:var(--ink-soft)] text-center">
              PDF / DOC / DOCX · up to 10MB
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
