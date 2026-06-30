import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Linkedin, Github } from "lucide-react";
import { toast } from "sonner";
import { submitContact } from "@/lib/api";

const PHONE = "6394276341";
const PHONE_DISPLAY = "+91 63942 76341";
const EMAIL = "shikha29072005@gmail.com";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitting(true);
    try {
      await submitContact(form);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-pad" data-testid="contact-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="eyebrow">Contact</div>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-tight">
              Let's build <span className="text-gradient">something with data</span>.
            </h2>
            <p className="mt-5 text-[color:var(--ink-soft)] leading-relaxed">
              Open to internships, collaborations and conversations around Data Science, AI and
              ML. Reach out using the form or any of the channels below.
            </p>

            <div className="mt-8 space-y-3">
              <ContactItem
                icon={Mail}
                label="Email"
                value={EMAIL}
                href={`mailto:${EMAIL}`}
                testId="contact-email"
              />
              <ContactItem
                icon={Phone}
                label="Phone"
                value={PHONE_DISPLAY}
                href={`tel:+91${PHONE}`}
                testId="contact-phone"
              />
              <ContactItem
                icon={MapPin}
                label="Location"
                value="Lucknow, Uttar Pradesh, India"
                testId="contact-location"
              />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <SocialIcon
                href="https://www.linkedin.com/in/shikha-yadav-4769b9372"
                icon={Linkedin}
                label="LinkedIn"
                testId="contact-social-linkedin"
              />
              <SocialIcon
                href="https://github.com/shikhayadav29"
                icon={Github}
                label="GitHub"
                testId="contact-social-github"
              />
            </div>
          </div>

          <form
            data-testid="contact-form"
            onSubmit={onSubmit}
            className="lg:col-span-7 glass-strong rounded-3xl p-6 sm:p-8 space-y-5 relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full brand-gradient opacity-10 blur-3xl" />
            <Field
              label="Your Name"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Jane Doe"
              testId="contact-input-name"
            />
            <Field
              label="Email Address"
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="jane@company.com"
              testId="contact-input-email"
            />
            <div>
              <label className="font-mono-sm text-[color:var(--ink-soft)]">Message</label>
              <textarea
                data-testid="contact-input-message"
                name="message"
                value={form.message}
                onChange={onChange}
                rows={5}
                placeholder="Tell me a bit about the opportunity or idea…"
                className="mt-2 w-full rounded-xl bg-white/80 border border-[color:var(--line)] px-4 py-3 outline-none focus:border-[color:var(--brand)] focus:ring-4 focus:ring-[color:var(--brand)]/10 transition"
              />
            </div>
            <button
              data-testid="contact-submit-btn"
              type="submit"
              disabled={submitting}
              className="btn-primary rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2 disabled:opacity-70"
            >
              <Send size={16} /> {submitting ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon: Icon, label, value, href, testId }) {
  const content = (
    <div className="flex items-center gap-4 glass rounded-2xl p-4 card-hover">
      <div className="w-10 h-10 rounded-xl brand-gradient grid place-items-center text-white shadow-md">
        <Icon size={16} />
      </div>
      <div>
        <div className="font-mono-sm text-[color:var(--ink-soft)]">{label}</div>
        <div className="font-semibold text-[color:var(--ink)]">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a data-testid={testId} href={href} className="block">
      {content}
    </a>
  ) : (
    <div data-testid={testId}>{content}</div>
  );
}

function SocialIcon({ icon: Icon, href, label, testId }) {
  return (
    <a
      data-testid={testId}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-11 h-11 rounded-full glass grid place-items-center text-[color:var(--ink)] hover:text-[color:var(--brand)] card-hover"
      aria-label={label}
    >
      <Icon size={16} />
    </a>
  );
}

function Field({ label, testId, ...props }) {
  return (
    <div>
      <label className="font-mono-sm text-[color:var(--ink-soft)]">{label}</label>
      <input
        data-testid={testId}
        {...props}
        className="mt-2 w-full rounded-xl bg-white/80 border border-[color:var(--line)] px-4 py-3 outline-none focus:border-[color:var(--brand)] focus:ring-4 focus:ring-[color:var(--brand)]/10 transition"
      />
    </div>
  );
}
