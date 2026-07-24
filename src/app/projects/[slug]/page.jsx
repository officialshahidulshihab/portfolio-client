import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import ProjectClient from "./ProjectClient";

// Generate static routes at build time for all projects
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }) {
  // In Next.js 15, params is a Promise that must be awaited
  const { slug } = await params;
  
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) {
    notFound();
  }
  
  return <ProjectClient project={project} />;
}
