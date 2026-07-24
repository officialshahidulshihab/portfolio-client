"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import Link from "next/link";

// ─── Typewriter strings ────────────────────────────────────────────────────────
const ROLES = [
  "Full Stack Developer",
  "Next.js Developer",
  "Problem Solver",
];

// ─── Typewriter hook ───────────────────────────────────────────────────────────
function useTypewriter(words, { typeSpeed = 80, deleteSpeed = 45, pause = 1800 } = {}) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase]     = useState("typing"); // typing | pausing | deleting

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;

    if (phase === "typing") {
      if (display.length < word.length) {
        timeout = setTimeout(
          () => setDisplay(word.slice(0, display.length + 1)),
          typeSpeed
        );
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pause);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 200);
    } else if (phase === "deleting") {
      if (display.length > 0) {
        timeout = setTimeout(
          () => setDisplay(display.slice(0, -1)),
          deleteSpeed
        );
      } else {
        timeout = setTimeout(() => {
          setWordIdx((i) => (i + 1) % words.length);
          setPhase("typing");
        }, typeSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [display, phase, wordIdx, words, typeSpeed, deleteSpeed, pause]);

  return display;
}

const fullLine3 = `  console.log("Hello, World!")`;

// ─── Code-window avatar (right side placeholder) ──────────────────────────────
function CodeAvatar() {
  const [line3, setLine3] = useState("");
  const [cursorOn, setCursorOn] = useState(true);

  // Type line 3 after a delay
  useEffect(() => {
    let i = 0;
    const delay = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setLine3(fullLine3.slice(0, i));
        if (i >= fullLine3.length) clearInterval(id);
      }, 55);
      return () => clearInterval(id);
    }, 1800);
    return () => clearTimeout(delay);
  }, []);

  // Blink cursor
  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  const lines = [
    { tokens: [{ t: "const ", c: "#c792ea" }, { t: "dev", c: "#82aaff" }, { t: " = {", c: "#89ddff" }] },
    { tokens: [{ t: "  name", c: "#f07178" }, { t: ": ", c: "#89ddff" }, { t: '"Shihab"', c: "#c3e88d" }, { t: ",", c: "#89ddff" }] },
    { tokens: [{ t: "  role", c: "#f07178" }, { t: ": ", c: "#89ddff" }, { t: '"Full Stack Dev"', c: "#c3e88d" }, { t: ",", c: "#89ddff" }] },
    { tokens: [{ t: "  open", c: "#f07178" }, { t: ": ", c: "#89ddff" }, { t: "true", c: "#ff9cac" }] },
    { tokens: [{ t: "}", c: "#89ddff" }] },
    { tokens: [] }, // blank
    { tokens: [{ t: "dev", c: "#82aaff" }, { t: ".", c: "#89ddff" }, { t: "build", c: "#82aaff" }, { t: "()", c: "#ffd700" }, { t: " // 🚀", c: "#546e7a" }] },
  ];

  return (
    <div style={{
      width:        "100%",
      maxWidth:     "420px",
      background:   "#0d1117",
      borderRadius: "14px",
      overflow:     "hidden",
      boxShadow:    "0 0 0 1px rgba(0,212,255,0.12), 0 24px 60px rgba(0,0,0,0.6)",
      fontFamily:   "'JetBrains Mono', monospace",
      fontSize:     "clamp(11px, 1.5vw, 14px)",
    }}>
      {/* Window chrome */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        gap:            "7px",
        padding:        "12px 16px",
        background:     "#161b22",
        borderBottom:   "1px solid rgba(255,255,255,0.06)",
      }}>
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840" }} />
        <span style={{ marginLeft: 8, color: "rgba(255,255,255,0.3)", fontSize: "0.75em" }}>
          portfolio.js
        </span>
      </div>

      {/* Code body */}
      <div style={{ padding: "20px 22px 24px", lineHeight: 1.75 }}>
        {/* Line numbers + code */}
        {lines.map((line, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start" }}>
            <span style={{
              width:       "2em",
              color:       "rgba(255,255,255,0.18)",
              userSelect:  "none",
              flexShrink:  0,
              fontSize:    "0.9em",
            }}>
              {i + 1}
            </span>
            <span>
              {line.tokens.map((tok, j) => (
                <span key={j} style={{ color: tok.c }}>{tok.t}</span>
              ))}
            </span>
          </div>
        ))}

        {/* Animated typing line */}
        <div style={{ display: "flex", alignItems: "flex-start", marginTop: "4px" }}>
          <span style={{
            width:      "2em",
            color:      "rgba(255,255,255,0.18)",
            userSelect: "none",
            flexShrink: 0,
            fontSize:   "0.9em",
          }}>
            {lines.length + 1}
          </span>
          <span>
            <span style={{ color: "#82aaff" }}>
              {line3.startsWith("  console") && (
                <>
                  <span style={{ color: "#c792ea" }}></span>
                  <span style={{ color: "#80cbc4" }}>console</span>
                  <span style={{ color: "#89ddff" }}>.</span>
                  <span style={{ color: "#82aaff" }}>log</span>
                  <span style={{ color: "#ffd700" }}>(</span>
                  <span style={{ color: "#c3e88d" }}>
                    {'"Hello, World!"'.slice(0, Math.max(0, line3.length - 14))}
                  </span>
                  {line3.length >= fullLine3.length && (
                    <span style={{ color: "#ffd700" }}>)</span>
                  )}
                </>
              )}
            </span>
            {/* Blinking cursor */}
            <span style={{
              display:        "inline-block",
              width:          "2px",
              height:         "1.1em",
              background:     "#00d4ff",
              marginLeft:     "1px",
              verticalAlign:  "middle",
              opacity:        cursorOn ? 1 : 0,
              transition:     "opacity 0.05s",
            }} />
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Social button ─────────────────────────────────────────────────────────────
function SocialBtn({ href, icon: Icon, label }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        width:          44,
        height:         44,
        borderRadius:   "50%",
        border:         `1.5px solid ${hovered ? "rgba(0,212,255,0.8)" : "rgba(255,255,255,0.15)"}`,
        color:          hovered ? "#00d4ff" : "rgba(240,246,255,0.6)",
        background:     hovered ? "rgba(0,212,255,0.08)" : "transparent",
        boxShadow:      hovered ? "0 0 18px rgba(0,212,255,0.35)" : "none",
        transition:     "all 0.22s ease",
        textDecoration: "none",
        flexShrink:     0,
      }}
    >
      <Icon size={18} />
    </Link>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const role = useTypewriter(ROLES);

  // Entrance animation variants
  const slideLeft = {
    hidden:  { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x:       0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
    },
  };
  const slideRight = {
    hidden:  { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x:       0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 },
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@400;500;600;700;800&display=swap');

        :root {
          --navy:   #0a0f1e;
          --cyan:   #00d4ff;
          --white:  #f0f6ff;
          --muted:  rgba(240,246,255,0.55);
        }

        #hero {
          min-height: 100vh;
          display:    flex;
          align-items: center;
          background: var(--navy);
          position:   relative;
          overflow:   hidden;
          padding:    6rem clamp(1.25rem, 6vw, 5rem) 4rem;
        }

        /* Subtle radial glow behind content */
        #hero::before {
          content:  '';
          position: absolute;
          top:      -10%;
          left:     -5%;
          width:    55%;
          height:   70%;
          background: radial-gradient(ellipse at 30% 40%, rgba(0,212,255,0.07) 0%, transparent 65%);
          pointer-events: none;
        }
        #hero::after {
          content:  '';
          position: absolute;
          bottom:   5%;
          right:    -5%;
          width:    45%;
          height:   60%;
          background: radial-gradient(ellipse at 70% 60%, rgba(0,212,255,0.05) 0%, transparent 65%);
          pointer-events: none;
        }

        .hero-grid {
          position:       relative;
          z-index:        1;
          width:          100%;
          max-width:      1200px;
          margin:         0 auto;
          display:        grid;
          grid-template-columns: 1fr 1fr;
          gap:            4rem;
          align-items:    center;
        }

        /* ── Greeting ── */
        .hero-greeting {
          font-family: 'Inter', sans-serif;
          font-size:   clamp(0.95rem, 1.5vw, 1.05rem);
          font-weight: 500;
          color:       var(--muted);
          letter-spacing: 0.04em;
          margin-bottom: 0.5rem;
        }

        /* ── Name ── */
        .hero-name {
          font-family:    'Inter', sans-serif;
          font-size:      clamp(2.8rem, 6vw, 4.5rem);
          font-weight:    800;
          color:          var(--white);
          line-height:    1.08;
          letter-spacing: -0.03em;
          margin:         0 0 1rem;
        }
        .hero-name span {
          color: var(--cyan);
        }

        /* ── Role typewriter ── */
        .hero-role-wrap {
          display:     flex;
          align-items: center;
          gap:         0.4rem;
          min-height:  2.2rem;
          margin-bottom: 1.35rem;
        }
        .hero-role-label {
          font-family: 'Inter', sans-serif;
          font-size:   clamp(0.8rem, 1.2vw, 0.9rem);
          color:       var(--muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          flex-shrink: 0;
        }
        .hero-role {
          font-family: 'JetBrains Mono', monospace;
          font-size:   clamp(1rem, 2vw, 1.25rem);
          font-weight: 700;
          color:       var(--cyan);
          letter-spacing: -0.01em;
        }
        .hero-role-cursor {
          display:       inline-block;
          width:         2px;
          height:        1.15em;
          background:    var(--cyan);
          margin-left:   2px;
          vertical-align: middle;
          border-radius: 1px;
          animation:     heroBlink 1s step-end infinite;
        }

        /* ── Tagline ── */
        .hero-tagline {
          font-family:    'Inter', sans-serif;
          font-size:      clamp(0.95rem, 1.5vw, 1.05rem);
          color:          var(--muted);
          line-height:    1.65;
          max-width:      440px;
          margin-bottom:  2.25rem;
        }

        /* ── Buttons ── */
        .hero-btn-row {
          display:   flex;
          gap:       1rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .btn-primary {
          display:         inline-flex;
          align-items:     center;
          gap:             0.45rem;
          padding:         0.7rem 1.6rem;
          background:      var(--cyan);
          color:           #0a0f1e;
          font-family:     'Inter', sans-serif;
          font-size:       0.9rem;
          font-weight:     700;
          border-radius:   8px;
          border:          none;
          cursor:          pointer;
          text-decoration: none;
          letter-spacing:  0.02em;
          transition:      box-shadow 0.2s, transform 0.15s;
        }
        .btn-primary:hover {
          box-shadow: 0 0 24px rgba(0,212,255,0.5);
          transform:  translateY(-1px);
        }
        .btn-outline {
          display:         inline-flex;
          align-items:     center;
          gap:             0.45rem;
          padding:         0.7rem 1.6rem;
          background:      transparent;
          color:           var(--white);
          font-family:     'Inter', sans-serif;
          font-size:       0.9rem;
          font-weight:     600;
          border-radius:   8px;
          border:          1.5px solid rgba(240,246,255,0.25);
          cursor:          pointer;
          text-decoration: none;
          letter-spacing:  0.02em;
          transition:      border-color 0.2s, color 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .btn-outline:hover {
          border-color: var(--cyan);
          color:        var(--cyan);
          box-shadow:   0 0 18px rgba(0,212,255,0.18);
          transform:    translateY(-1px);
        }

        /* ── Socials ── */
        .hero-socials {
          display:     flex;
          align-items: center;
          gap:         0.9rem;
        }
        .hero-socials-label {
          font-family: 'Inter', sans-serif;
          font-size:   0.78rem;
          color:       rgba(240,246,255,0.3);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-right: 0.2rem;
        }

        /* ── Right: avatar wrap ── */
        .hero-avatar-wrap {
          display:         flex;
          justify-content: center;
          align-items:     center;
        }
        .avatar-glow-ring {
          position:      relative;
          border-radius: 20px;
          padding:       3px;
          background:    linear-gradient(135deg, #00d4ff 0%, rgba(0,212,255,0.2) 50%, #00d4ff 100%);
          box-shadow:    0 0 40px rgba(0,212,255,0.3), 0 0 80px rgba(0,212,255,0.12);
        }
        .avatar-inner {
          border-radius: 18px;
          overflow:      hidden;
          background:    #0d1117;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap:                   2.5rem;
            text-align:            center;
          }
          .hero-grid > *:first-child { order: 2; }
          .hero-grid > *:last-child  { order: 1; }

          .hero-tagline { margin: 0 auto 2rem; }
          .hero-role-wrap { justify-content: center; }
          .hero-btn-row { justify-content: center; }
          .hero-socials { justify-content: center; }
        }

        @keyframes heroBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-role-cursor { animation: none; }
        }
      `}</style>

      <section id="hero">
        <div className="hero-grid">

          {/* ── LEFT: Text content ── */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate="visible"
          >
            <p className="hero-greeting">Hi, I&apos;m</p>

            <h1 className="hero-name">
              Shihab<span>.</span>
            </h1>

            {/* Typewriter role */}
            <div className="hero-role-wrap">
              <span className="hero-role-label">I build →</span>
              <span className="hero-role">
                {role}
                <span className="hero-role-cursor" aria-hidden="true" />
              </span>
            </div>

            <p className="hero-tagline">
              Building clean, functional web experiences —&nbsp;from pixel-perfect
              UIs to robust backends that actually scale.
            </p>

            {/* CTA buttons */}
            <div className="hero-btn-row">
              <a
                href="/resume.pdf"
                download="Shihab_Resume.pdf"
                className="btn-primary"
              >
                {/* Download icon */}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Resume
              </a>

              <a
                href="#projects"
                className="btn-outline"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {/* Arrow icon */}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
                View Projects
              </a>
            </div>

            {/* Social icons */}
            <div className="hero-socials">
              <span className="hero-socials-label">Find me</span>
              <SocialBtn href="https://github.com/officialshahidulshihab"    icon={FaGithub}   label="GitHub"   />
              <SocialBtn href="https://www.linkedin.com/in/shahidulshihab"  icon={FaLinkedin} label="LinkedIn" />
             
            </div>
          </motion.div>

          {/* ── RIGHT: Code avatar ── */}
          <motion.div
            className="hero-avatar-wrap"
            variants={slideRight}
            initial="hidden"
            animate="visible"
          >
            {/* Floating animation wraps the glow ring */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 4,
                repeat:   Infinity,
                ease:     "easeInOut",
              }}
            >
              <div className="avatar-glow-ring">
                <div className="avatar-inner">
                  <CodeAvatar />
                </div>
              </div>

              {/* Reflection blur below */}
              <div style={{
                marginTop:    "12px",
                height:       "20px",
                background:   "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.2) 0%, transparent 70%)",
                filter:       "blur(6px)",
                borderRadius: "50%",
              }} />
            </motion.div>
          </motion.div>

        </div>
      </section>
    </>
  );
}