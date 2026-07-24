"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const stats = [
  { value: "1+", label: "Years Coding" },
  { value: "5+", label: "Projects Built" },
  { value: "CSE", label: "Student @ Premier University" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 px-6 bg-[#0d0d14] overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <SectionHeading label="// about me" title="About Me" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* ── Left: Decorative Stats Card ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={1}
            className="relative"
          >
            {/* Glow accent */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-500/30 via-transparent to-transparent blur-sm pointer-events-none" />

            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
              {/* Terminal-style top bar */}
              <div className="flex items-center gap-2 mb-8">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 font-mono text-xs text-white/30">
                  shihab.stats
                </span>
              </div>

              {/* Stats */}
              <div className="space-y-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i + 2}
                    className="flex items-center gap-5"
                  >
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <span className="font-mono text-cyan-400 font-bold text-lg leading-none">
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-white/70 text-sm leading-snug">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Decorative line */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="font-mono text-xs text-white/25 leading-relaxed">
                  &gt; status: <span className="text-cyan-400">building</span>
                  <br />
                  &gt; location:{" "}
                  <span className="text-cyan-400">Chittagong, BD</span>
                  <br />
                  &gt; available:{" "}
                  <span className="text-green-400">true</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Text Content ── */}
          <div className="space-y-6">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={1}
              className="text-white/70 text-base leading-relaxed"
            >
              I started my programming journey as a{" "}
              <span className="text-white font-medium">CSE student</span> at{" "}
              <span className="text-cyan-400 font-medium">
                Premier University, Chattogram
              </span>
              . What began as curiosity quickly turned into a genuine passion —
              I discovered that writing code isn&apos;t just about making things
              work, it&apos;s about solving real problems in elegant ways.
            </motion.p>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={2}
              className="text-white/70 text-base leading-relaxed"
            >
              I love building{" "}
              <span className="text-white font-medium">
                full-stack web applications
              </span>{" "}
              — from designing clean, responsive UIs to architecting solid
              backends. My stack includes{" "}
              <span className="text-cyan-400">
                React, Next.js, Node.js, Express, MongoDB, and TypeScript
              </span>
              . I care deeply about clean code, good architecture, and
              experiences that actually make sense to the user.
            </motion.p>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={3}
              className="text-white/70 text-base leading-relaxed"
            >
              Outside of coding, you&apos;ll find me watching{" "}
              <span className="text-white font-medium">Football</span> 

             <span className="pl-1">
               I also follow geopolitics closely — understanding how the world
              works fuels the way I think about building products that actually
              matter.
             </span>
            </motion.p>

            {/* CTA / inline badge row */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={4}
              className="flex flex-wrap gap-3 pt-2"
            >
              {[
                "Full-Stack Dev",
                "Problem Solver",
                "Clean Code",
                "Always Learning",
              ].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-3 py-1.5 rounded-full border border-cyan-500/30 text-cyan-400/80 bg-cyan-500/5"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}