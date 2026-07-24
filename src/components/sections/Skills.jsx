"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import {
  SiNextdotjs,
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGithub,
  SiVscodium,
  SiFigma,
  SiTypescript,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

const categories = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#ffffff" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
  },
  {
    id: "tools",
    label: "Tools & Others",
    skills: [
      { name: "GitHub", icon: SiGithub, color: "#ffffff" },
      { name: "Antigravity", icon: VscCode, color: "#00D4FF" },
      { name: "VS Code", icon: SiVscodium, color: "#007ACC" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

function SkillCard({ name, icon: Icon, color }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -6,
        boxShadow: "0 0 24px rgba(0,212,255,0.22), 0 8px 32px rgba(0,0,0,0.4)",
        borderColor: "rgba(0,212,255,0.35)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] p-5 cursor-default backdrop-blur-sm"
      style={{ transition: "border-color 0.2s ease" }}
    >
      {/* icon */}
      <div className="relative flex items-center justify-center w-12 h-12">
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"
          style={{ backgroundColor: color, opacity: 0 }}
        />
        <Icon
          size={36}
          style={{ color }}
          className="relative z-10 transition-transform duration-200 group-hover:scale-110"
        />
      </div>

      {/* name */}
      <span className="font-mono text-xs text-white/60 group-hover:text-white/90 transition-colors duration-200 text-center leading-tight">
        {name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const [active, setActive] = useState("frontend");

  const activeCategory = categories.find((c) => c.id === active);

  return (
    <section
      id="skills"
      className="relative py-24 px-6 bg-[#0d0d14] overflow-hidden"
    >
      {/* Grid background — matches About section */}
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <SectionHeading label="// skills" title="My Skills" />
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`relative font-mono text-sm px-5 py-2 rounded-full border transition-all duration-200 ${
                active === cat.id
                  ? "border-cyan-500/60 text-cyan-400 bg-cyan-500/10"
                  : "border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 bg-transparent"
              }`}
            >
              {active === cat.id && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-cyan-500/10 border border-cyan-500/40"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Skill Grid with AnimatePresence for tab switching */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {activeCategory.skills.map((skill) => (
              <SkillCard key={skill.name} {...skill} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 font-mono text-xs text-white/20 text-center"
        >
          &gt; always_learning: <span className="text-cyan-500/50">true</span>
        </motion.p>
      </div>
    </section>
  );
}