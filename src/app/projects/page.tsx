import { fetchProjects, fetchProjectsCount } from "../../../lib/queries";
import CreateProjectCard from "../../components/projects";
import ProjectGrid from '../../components/ui/ProjectGrid';

export default async function ProjectsPage() {
  const projects = await fetchProjects();
  const projects_count = await fetchProjectsCount();

  return (
    <div className="min-h-screen bg-white p-6 space-y-6">
      <h2 className="text-xl font-semibold">Total Projects: {projects_count}</h2>

      <ProjectGrid projects={projects ?? []} />

      <CreateProjectCard />
    </div>
  );
}
