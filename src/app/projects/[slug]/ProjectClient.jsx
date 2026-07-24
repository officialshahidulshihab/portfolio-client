"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight, FiExternalLink } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ProjectClient({ project }) {
  // Only show buttons if the URL is not a placeholder
  const hasLiveUrl = project.liveUrl && !project.liveUrl.startsWith("[Placeholder");
  const hasGithubUrl = project.githubUrl && !project.githubUrl.startsWith("[Placeholder");

  return (
    <div className="min-h-screen bg-[#0d0d14] py-24 px-6 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Back button */}
          <motion.div variants={itemVariants} className="mb-12">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 font-mono text-sm text-cyan-500 hover:text-cyan-400 transition-colors"
            >
              <FiArrowLeft /> All Projects
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {project.name}
            </h1>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1.5 rounded-full border border-cyan-500/30 text-cyan-400 bg-cyan-500/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            variants={itemVariants}
            className="w-full h-64 md:h-[400px] rounded-2xl overflow-hidden border border-white/10 mb-10 relative"
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://placehold.co/1200x800/0a0f1e/00d4ff?text=${project.name.replace(" ", "+")}`;
              }}
            />
          </motion.div>

          {/* Action Buttons */}
          {(hasLiveUrl || hasGithubUrl) && (
            <motion.div variants={itemVariants} className="flex gap-4 mb-12">
              {hasLiveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-[#0d0d14] font-semibold rounded-lg hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                >
                  Live Demo <FiExternalLink />
                </a>
              )}
              {hasGithubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-cyan-500/40 text-white font-semibold rounded-lg hover:bg-cyan-500/10 transition-colors"
                >
                  GitHub <FiArrowRight /> 
                </a>
              )}
            </motion.div>
          )}

          {/* Content sections */}
          <motion.div variants={itemVariants} className="space-y-12 text-white/70">
            
            {/* About */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">About this project</h2>
              <div className="leading-relaxed space-y-4">
                {project.description.split('\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </section>

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Challenges</h2>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2.5 flex-shrink-0" />
                      <span className="leading-relaxed">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Future Plans */}
            {project.futurePlans && project.futurePlans.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Future Plans</h2>
                <ul className="space-y-3">
                  {project.futurePlans.map((plan, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 mt-2.5 flex-shrink-0" />
                      <span className="leading-relaxed">{plan}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
