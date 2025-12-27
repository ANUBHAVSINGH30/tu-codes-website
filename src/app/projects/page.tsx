"use client";

import { useState, useEffect } from "react";
import CreateProjectModal from "../../components/projects";
import ProjectGrid from '../../components/ui/ProjectGrid';
import { Plus } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  githubLink?: string;
  created_at?: string;
}

export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsCount, setProjectsCount] = useState(0);

  useEffect(() => {
    // Fetch projects on mount
    const fetchData = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data.projects || []);
        setProjectsCount(data.count || 0);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-20 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>

            {/* Stats Card */}
            <div className="inline-block">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                <div className="text-5xl font-bold text-blue-600 mb-2">{projectsCount || 0}</div>
                <div className="text-gray-700 font-medium text-lg">Projects Showcased</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button (FAB) */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-8 right-8 z-40 w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          aria-label="Create new project"
        >
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </section>

      {/* Projects Grid Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ProjectGrid projects={projects ?? []} />
        </div>
      </section>

      {/* Create Project Modal */}
      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
