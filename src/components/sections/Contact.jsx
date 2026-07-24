"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineUser,
  HiCheckCircle,
  HiXCircle,
} from "react-icons/hi";
import { RiWhatsappLine } from "react-icons/ri";

// ─── Contact info data ────────────────────────────────────────────────────────
const INFO = [
  {
    icon: HiOutlineUser,
    label: "Name",
    value: "MD Shahidul Islam Shihab",
    href: null,
  },
  {
    icon: HiOutlineMail,
    label: "Email",
    value: "officialshahidulshihab@gmail.com",
    href: "mailto:officialshahidulshihab@gmail.com",
  },
  {
    icon: HiOutlinePhone,
    label: "Phone",
    value: "+880 1898 920152",
    href: "tel:+8801898920152",
  },
  {
    icon: RiWhatsappLine,
    label: "WhatsApp",
    value: "+880 1898 920152",
    href: "https://wa.me/8801898920152",
    accent: "#25D366",
  },
  {
    icon: HiOutlineLocationMarker,
    label: "Location",
    value: "Chattogram, Bangladesh",
    href: null,
  },
];

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = "Name is required.";
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!fields.subject.trim()) errors.subject = "Subject is required.";
  if (!fields.message.trim()) errors.message = "Message is required.";
  return errors;
}

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay },
  },
});

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function InfoCard({ icon: Icon, label, value, href, accent, index }) {
  const content = (
    <motion.div
      variants={slideLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        x: 4,
        boxShadow: "0 0 20px rgba(0,212,255,0.12)",
        borderColor: "rgba(0,212,255,0.28)",
      }}
      className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.03] px-5 py-4 backdrop-blur-sm cursor-default transition-colors duration-200"
    >
      <div
        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${accent || "#00d4ff"}18` }}
      >
        <Icon size={20} style={{ color: accent || "#00d4ff" }} />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-0.5">
          {label}
        </p>
        <p className="text-white/80 text-sm truncate">{value}</p>
      </div>
      {href && (
        <span className="ml-auto text-white/20 text-xs font-mono flex-shrink-0">
          ↗
        </span>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="block group"
      >
        {content}
      </a>
    );
  }
  return content;
}

function InputField({ label, id, error, textarea = false, ...props }) {
  const base =
    "w-full bg-white/[0.04] border rounded-lg px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:bg-white/[0.06] font-sans resize-none";
  const borderClass = error
    ? "border-red-500/50 focus:border-red-500/80 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
    : "border-white/10 focus:border-cyan-500/50 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.10)]";

  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-[11px] text-white/40 uppercase tracking-widest mb-2"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={5}
          className={`${base} ${borderClass}`}
          {...props}
        />
      ) : (
        <input id={id} className={`${base} ${borderClass}`} {...props} />
      )}
      {error && (
        <p className="mt-1.5 text-xs text-red-400 font-mono">{error}</p>
      )}
    </div>
  );
}

function Toast({ type, message, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border text-sm font-mono shadow-xl ${
        type === "success"
          ? "border-green-500/30 bg-green-500/10 text-green-400"
          : "border-red-500/30 bg-red-500/10 text-red-400"
      }`}
    >
      {type === "success" ? (
        <HiCheckCircle size={18} className="flex-shrink-0" />
      ) : (
        <HiXCircle size={18} className="flex-shrink-0" />
      )}
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-white/30 hover:text-white/60 transition-colors"
      >
        ✕
      </button>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Contact() {
  const EMPTY = { name: "", email: "", subject: "", message: "" };
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"
  const [toast, setToast] = useState(null); // { type, message }

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function dismissToast() {
    setToast(null);
    setStatus(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setStatus("loading");
    setErrors({});

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (!res.ok) throw new Error("Server error");

      setStatus("success");
      setToast({ type: "success", message: "Message sent! I'll get back to you soon." });
      setFields(EMPTY);

      // Auto-dismiss after 5s
      setTimeout(dismissToast, 5000);
    } catch {
      setStatus("error");
      setToast({ type: "error", message: "Something went wrong. Please try again." });
      setTimeout(dismissToast, 5000);
    }
  }

  return (
    <section
      id="contact"
      className="relative py-24 px-6 bg-[#0d0d14] overflow-hidden"
    >
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <SectionHeading label="// contact" title="Get In Touch" />
        </motion.div>

        {/* Toast */}
        <div className="mb-8 min-h-[52px]">
          {toast && (
            <Toast
              type={toast.type}
              message={toast.message}
              onClose={dismissToast}
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* ── Left: Info cards ── */}
          <div className="space-y-3">
            <motion.p
              variants={fadeUp(0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-white/50 text-sm leading-relaxed mb-6"
            >
              Have a project in mind, want to collaborate, or just want to say
              hi? My inbox is always open.
            </motion.p>

            {INFO.map((item, i) => (
              <InfoCard key={item.label} {...item} index={i} />
            ))}

            {/* Decorative terminal line */}
            <motion.p
              variants={fadeUp(0.5)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-mono text-xs text-white/20 pt-4 pl-1"
            >
              &gt; response_time:{" "}
              <span className="text-cyan-500/50">"within 24h"</span>
            </motion.p>
          </div>

          {/* ── Right: Form ── */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="relative rounded-2xl border border-white/8 bg-white/[0.03] p-7 md:p-8 backdrop-blur-sm">
              {/* Top bar */}
              <div className="flex items-center gap-2 mb-7">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-3 font-mono text-xs text-white/25">
                  new_message.js
                </span>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    label="Name"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={fields.name}
                    onChange={handleChange}
                    error={errors.name}
                    autoComplete="name"
                  />
                  <InputField
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={fields.email}
                    onChange={handleChange}
                    error={errors.email}
                    autoComplete="email"
                  />
                </div>

                <InputField
                  label="Subject"
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  value={fields.subject}
                  onChange={handleChange}
                  error={errors.subject}
                />

                <InputField
                  label="Message"
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or just say hi…"
                  value={fields.message}
                  onChange={handleChange}
                  error={errors.message}
                  textarea
                />

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={
                    status !== "loading"
                      ? {
                          boxShadow: "0 0 28px rgba(0,212,255,0.35)",
                          y: -2,
                        }
                      : {}
                  }
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="w-full py-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-[#0d0d14] font-bold text-sm tracking-wide transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8,
                          ease: "linear",
                        }}
                        className="inline-block w-4 h-4 border-2 border-[#0d0d14]/30 border-t-[#0d0d14] rounded-full"
                      />
                      Sending…
                    </>
                  ) : (
                    "Send Message ↗"
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}