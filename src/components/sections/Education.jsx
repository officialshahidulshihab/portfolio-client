"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const entries = [
  {
    institution: "Premier University",
    location: "Chattogram, Bangladesh",
    degree: "BSc in Computer Science & Engineering",
    year: "2026 – Present",
    description:
      "Ongoing 4-year undergraduate program covering core CS fundamentals — algorithms, data structures, operating systems, databases, and software engineering. Running parallel to active full-stack development work and real-world project building.",
    status: "ongoing",
  },
];

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function TimelineDot({ status }) {
  return (
    <div className="relative flex-shrink-0 flex items-center justify-center w-5 h-5 mt-1">
      {/* pulse ring — only for ongoing */}
      {status === "ongoing" && (
        <motion.span
          animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-cyan-400"
        />
      )}
      <span className="relative z-10 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-[#0d0d14] shadow-[0_0_10px_rgba(0,212,255,0.6)]" />
    </div>
  );
}

function EducationCard({ institution, location, degree, year, description, status, index }) {
  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-70px" }}
      transition={{ delay: index * 0.15 }}
      className="flex gap-6 md:gap-8"
    >
      {/* Left: dot + line segment */}
      <div className="flex flex-col items-center">
        <TimelineDot status={status} />
        {/* extend the line below if not last — handled by parent */}
      </div>

      {/* Right: card */}
      <motion.div
        whileHover={{
          boxShadow: "0 0 28px rgba(0,212,255,0.12)",
          borderColor: "rgba(0,212,255,0.3)",
        }}
        transition={{ duration: 0.2 }}
        className="relative mb-12 flex-1 rounded-xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm"
      >
        {/* top-right status badge */}
        {status === "ongoing" && (
          <span className="absolute top-4 right-4 font-mono text-[10px] px-2.5 py-1 rounded-full border border-cyan-500/30 text-cyan-400/80 bg-cyan-500/8">
            ongoing
          </span>
        )}

        {/* year */}
        <p className="font-mono text-xs text-white/35 mb-2 tracking-wider">
          {year}
        </p>

        {/* degree */}
        <h3 className="text-cyan-400 font-semibold text-base md:text-lg mb-1 leading-snug pr-16">
          {degree}
        </h3>

        {/* institution */}
        <p className="text-white font-bold text-sm mb-0.5">{institution}</p>
        <p className="font-mono text-xs text-white/30 mb-4">{location}</p>

        {/* description */}
        <p className="text-white/60 text-sm leading-relaxed">{description}</p>

        {/* connector line stub into card */}
        <div className="absolute -left-[25px] top-[18px] w-6 h-px bg-cyan-500/30" />
      </motion.div>
    </motion.div>
  );
}

export default function Education() {
  return (
    <section
      id="education"
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

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <SectionHeading label="// education" title="Education" />
        </motion.div>

        {/* Timeline wrapper */}
        <div className="relative">
          {/* Vertical cyan line */}
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="absolute left-[9px] top-1 bottom-12 w-px bg-gradient-to-b from-cyan-500/60 via-cyan-500/30 to-transparent"
            style={{ transformOrigin: "top" }}
          />

          {/* Entries */}
          {entries.map((entry, i) => (
            <EducationCard key={entry.institution + entry.year} {...entry} index={i} />
          ))}
        </div>

        {/* Terminal footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="font-mono text-xs text-white/20 text-center mt-4"
        >
          &gt; continuously_learning:{" "}
          <span className="text-cyan-500/50">true</span>
        </motion.p>
      </div>
    </section>
  );
}