import type { Metadata } from "next";
import { ProjectList } from "@/components/project-list";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const projects = getProjects().map(({ content: _content, featured: _featured, ...rest }) => rest);

  return (
    <div className="py-8">
      <h1 className="text-lg font-semibold">Projects & Products</h1>
      <p className="mt-2 text-sm text-muted">Things I&apos;ve built — side projects and shipped products.</p>
      <div className="mt-8">
        <ProjectList projects={projects} />
      </div>
    </div>
  );
}
