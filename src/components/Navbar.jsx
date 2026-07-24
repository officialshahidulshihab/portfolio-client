"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Nav links config ──────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "About",     href: "#about"     },
  { label: "Skills",    href: "#skills"    },
  { label: "Education", href: "#education" },
  { label: "Projects",  href: "#projects"  },
  { label: "Contact",   href: "#contact"   },
];

// ─── Smooth-scroll helper ──────────────────────────────────────────────────────
function scrollToSection(href) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ─── Hook: track which section is in view ─────────────────────────────────────
function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const activeSection               = useActiveSection();

  // Shadow the navbar once user scrolls down a bit
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((href) => {
    setMobileOpen(false);
    setTimeout(() => scrollToSection(href), mobileOpen ? 300 : 0);
  }, [mobileOpen]);

  return (
    <>
      {/* ── Global styles injected inline (no CSS file dependency) ── */}
      <style precedence="default" href="navbar-global">{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@400;500;600&display=swap');

        :root {
          --navy:       #0a0f1e;
          --navy-glass: rgba(10, 15, 30, 0.72);
          --cyan:       #00d4ff;
          --cyan-dim:   rgba(0, 212, 255, 0.15);
          --white:      #f0f6ff;
          --muted:      rgba(240, 246, 255, 0.55);
        }

        /* Cursor blink on logo */
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .logo-cursor {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background: var(--cyan);
          margin-left: 3px;
          vertical-align: middle;
          border-radius: 1px;
          animation: blink 1.1s step-end infinite;
        }

        /* Nav link hover/active underline */
        .nav-link {
          position: relative;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--muted);
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: color 0.2s;
          padding-bottom: 2px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--cyan);
          border-radius: 2px;
          transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-link:hover,
        .nav-link.active {
          color: var(--white);
        }
        .nav-link.active::after,
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-link.active::after {
          background: var(--cyan);
          box-shadow: 0 0 8px var(--cyan);
        }

        /* Hamburger lines */
        .ham-line {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--white);
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
          transform-origin: center;
        }

        /* Mobile nav link */
        .mob-link {
          font-family: 'Inter', sans-serif;
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--muted);
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: color 0.2s;
          display: block;
          padding: 0.35rem 0;
        }
        .mob-link:hover,
        .mob-link.active {
          color: var(--cyan);
        }

        @media (prefers-reduced-motion: reduce) {
          .logo-cursor { animation: none; opacity: 1; }
        }
      `}</style>

      {/* ── Navbar bar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          right:           0,
          zIndex:          100,
          height:          "64px",
          display:         "flex",
          alignItems:      "center",
          padding:         "0 clamp(1.25rem, 5vw, 3rem)",
          background:      "var(--navy-glass)",
          backdropFilter:  "blur(18px) saturate(160%)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
          borderBottom:    "1px solid rgba(0, 212, 255, 0.08)",
          boxShadow:       scrolled
            ? "0 8px 32px rgba(0, 0, 0, 0.45)"
            : "none",
          transition:      "box-shadow 0.3s ease",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{
            fontFamily:     "'JetBrains Mono', monospace",
            fontWeight:     700,
            fontSize:       "1.2rem",
            color:          "var(--white)",
            textDecoration: "none",
            letterSpacing:  "-0.02em",
            display:        "flex",
            alignItems:     "center",
            userSelect:     "none",
            flexShrink:     0,
          }}
        >
          <span style={{ color: "var(--cyan)" }}>{"<"}</span>
          Shihab
          <span style={{ color: "var(--cyan)" }}>{" />"}</span>
          <span className="logo-cursor" aria-hidden="true" />
        </a>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          style={{
            display:    "flex",
            gap:        "2rem",
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${activeSection === link.href.replace("#", "") ? "active" : ""}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Hamburger (mobile only) */}
        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          style={{
            display:         "none",
            flexDirection:   "column",
            gap:             "5px",
            background:      "none",
            border:          "none",
            cursor:          "pointer",
            padding:         "6px",
            borderRadius:    "6px",
            outline:         "none",
          }}
          className="hamburger"
        >
          <span
            className="ham-line"
            style={{
              transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="ham-line"
            style={{
              opacity: mobileOpen ? 0 : 1,
              width:   mobileOpen ? "0" : "22px",
            }}
          />
          <span
            className="ham-line"
            style={{
              transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>

        {/* Responsive: hide desktop nav / show hamburger on mobile */}
        <style precedence="default" href="navbar-responsive">{`
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .hamburger   { display: flex !important; }
          }
        `}</style>
      </motion.header>

      {/* ── Full-screen mobile nav overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position:   "fixed",
                inset:      0,
                zIndex:     98,
                background: "rgba(0,0,0,0.4)",
              }}
            />

            {/* Slide-in panel */}
            <motion.div
              key="mobile-nav"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position:       "fixed",
                top:            0,
                right:          0,
                bottom:         0,
                width:          "min(360px, 90vw)",
                zIndex:         99,
                background:     "var(--navy)",
                borderLeft:     "1px solid rgba(0, 212, 255, 0.12)",
                display:        "flex",
                flexDirection:  "column",
                padding:        "6rem 2.5rem 3rem",
                overflowY:      "auto",
              }}
            >
              {/* Cyan top accent line */}
              <div
                style={{
                  position:    "absolute",
                  top:         0,
                  left:        0,
                  right:       0,
                  height:      "3px",
                  background:  "linear-gradient(90deg, var(--cyan), transparent)",
                }}
              />

              {/* Mobile links with staggered entrance */}
              <nav aria-label="Mobile navigation">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ delay: 0.05 * i, duration: 0.32, ease: "easeOut" }}
                  >
                    <a
                      href={link.href}
                      className={`mob-link ${activeSection === link.href.replace("#", "") ? "active" : ""}`}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    >
                      <span
                        style={{
                          fontSize:   "0.7rem",
                          fontFamily: "'JetBrains Mono', monospace",
                          color:      "var(--cyan)",
                          opacity:    0.7,
                          marginRight: "0.5rem",
                          letterSpacing: "0.05em",
                        }}
                      >
                        0{i + 1}.
                      </span>
                      {link.label}
                    </a>

                    {/* Thin divider */}
                    {i < NAV_LINKS.length - 1 && (
                      <div
                        style={{
                          height:     "1px",
                          background: "rgba(0, 212, 255, 0.07)",
                          margin:     "0.4rem 0",
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Footer hint */}
              <div
                style={{
                  marginTop:  "auto",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize:   "0.7rem",
                  color:      "rgba(0,212,255,0.35)",
                  letterSpacing: "0.08em",
                }}
              >
                &lt;/Shihab&gt;
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}