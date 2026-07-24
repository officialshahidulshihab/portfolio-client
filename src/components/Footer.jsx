import Link from "next/link";
import { SiGithub, SiFacebook } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

const NAV_LINKS = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
];

const SOCIALS = [
    {
        icon: SiGithub,
        href: "https://github.com/officialshahidulshihab",
        label: "GitHub",
    },
    {
        icon: FaLinkedin,
        href: "https://linkedin.com/in/shahidulshihab",
        label: "LinkedIn",
    },
    
];

export default function Footer() {
    return (
        <footer className="relative bg-[#111118] border-t border-cyan-500/40">
            {/* Cyan glow on top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none" />

            {/* Main columns */}
            <div className="max-w-6xl mx-auto px-6 pt-14 pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">

                    {/* ── Left: Brand ── */}
                    <div className="space-y-3">
                        <p className="text-white font-bold text-lg tracking-tight">
                            Shihab<span className="text-cyan-400">.</span>
                        </p>
                        <p className="text-white/40 text-sm leading-relaxed max-w-[220px]">
                            Building the web, one project at a time.
                        </p>
                        <p className="font-mono text-[11px] text-white/20 pt-1">
                            &gt; status:{" "}
                            <span className="text-green-400/60">available_for_hire</span>
                        </p>
                    </div>

                    {/* ── Center: Nav links ── */}
                    <div className="space-y-3">
                        <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-4">
                            Quick Nav
                        </p>
                        <ul className="space-y-2.5">
                            {NAV_LINKS.map(({ label, href }) => (
                                <li key={label}>
                                    <Link
                                        href={href}
                                        className="text-white/50 hover:text-cyan-400 text-sm transition-colors duration-200 font-mono inline-flex items-center gap-1.5 group"
                                    >
                                        <span className="text-white/20 group-hover:text-cyan-500/60 transition-colors duration-200">
                      //
                                        </span>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Right: Socials ── */}
                    <div className="space-y-3">
                        <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-4">
                            Find Me On
                        </p>
                        <div className="flex flex-col gap-3">
                            {SOCIALS.map(({ icon: Icon, href, label, color }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="inline-flex items-center gap-3 group w-fit"
                                >
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/8 bg-white/[0.03] group-hover:border-cyan-500/30 group-hover:bg-cyan-500/8 transition-all duration-200">
                                <Icon
                                    size={15}
                                    style={{ color: color || undefined }}
                                    className={
                                        color
                                            ? undefined
                                            : "text-white/50 group-hover:text-cyan-400 transition-colors duration-200"
                                    }
                                />
                            </span>
                            <span className="text-sm text-white/40 group-hover:text-white/70 transition-colors duration-200">
                                {label}
                            </span>
                        </a>
              ))}
                    </div>
                </div>
            </div>
        </div>


    <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-mono text-xs text-white/25">
                © 2025 Shihab. All rights reserved.
            </p>
            <p className="font-mono text-xs text-white/25 flex items-center gap-1.5">
                Made with{" "}
                <span className="text-red-400/70">♥</span>{" "}
                using{" "}
                <span className="text-white/40">Next.js</span>
            </p>
        </div>
    </div>
    </footer >
  );
}