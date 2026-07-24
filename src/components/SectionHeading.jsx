export default function SectionHeading({ label, title }) {
  return (
    <div className="mb-12">
      <p className="font-mono text-cyan-400 text-sm mb-3 tracking-wider">
        {label}
      </p>
      <h2 className="text-4xl md:text-5xl font-bold text-white">{title}</h2>
    </div>
  );
}