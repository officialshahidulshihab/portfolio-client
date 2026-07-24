"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/lib/projects";
import Link from "next/link";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function ProjectCard({ project }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -8,
        boxShadow: "0 0 30px rgba(0, 212, 255, 0.15)",
        borderColor: "rgba(0, 212, 255, 0.4)",
      }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
    >
      {/* Image container */}
      <div className="relative h-64 w-full overflow-hidden bg-[#0a0a0f]">
        {/* Dark gradient fade at the bottom of the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-transparent to-transparent z-10 opacity-80 pointer-events-none" />
        
        {/* Hover overlay with button */}
        <div className="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center backdrop-blur-sm">
          <Link
            href={project.liveUrl.startsWith("[") ? "#" : project.liveUrl}
            target={project.liveUrl.startsWith("[") ? "_self" : "_blank"}
            className="px-6 py-2.5 bg-[#0d0d14] text-cyan-400 font-mono text-sm rounded-full border border-cyan-500/50 hover:bg-cyan-500/10 transition-colors shadow-[0_0_15px_rgba(0,212,255,0.2)]"
          >
            Live Demo
          </Link>
        </div>

        {/* Project Image */}
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            // Fallback placeholder if image is missing
            e.target.src = `https://placehold.co/800x600/0a0f1e/00d4ff?text=${project.name.replace(" ", "+")}`;
          }}
        />
      </div>

      {/* Card Content */}
      <div className="p-7 flex flex-col flex-grow relative z-30">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {project.name}
        </h3>
        <p className="text-white/60 mb-6 flex-grow leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-3 py-1.5 rounded-full border border-cyan-500/30 text-cyan-400 bg-cyan-500/5"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* View Details Button */}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-cyan-400 transition-colors mt-auto group/btn w-fit"
        >
          View Details 
          <span className="transform transition-transform group-hover/btn:translate-x-1.5 text-cyan-400">
            →
          </span>
        </Link>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 px-6 bg-[#0d0d14] overflow-hidden"
    >
      {/* Grid background to match other sections */}
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <SectionHeading label="// work" title="Selected Projects" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
