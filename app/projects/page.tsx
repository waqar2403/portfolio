import type { Metadata } from "next";
import { ProjectList } from "@/components/project-list";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const projects = getProjects().map(({ content: _content, featured: _featured, ...rest }) => rest);

  return (
    <div className="py-10">
      <header className="border-b border-border pb-6">
        <h1 className="font-serif text-[2rem] leading-tight tracking-tight sm:text-[2.25rem]">
          Projects &amp; Products
        </h1>
        <p className="mt-2 text-sm text-muted">
          Things I&apos;ve built — side projects and products that shipped to real users.
        </p>
      </header>
      <div className="mt-8">
        <ProjectList projects={projects} />
      </div>
    </div>
  );
}
