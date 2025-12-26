import { fetchProjects } from "../../../lib/queries";
import CreateProjectCard from "../../components/projects";
import ProjectGrid from '../../components/ui/ProjectGrid';

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <div className="min-h-screen bg-white p-6 space-y-6">
      <h2 className="text-xl font-semibold">Projects</h2>

      <ProjectGrid projects={projects ?? []} />

      <CreateProjectCard />
    </div>
  );
}
