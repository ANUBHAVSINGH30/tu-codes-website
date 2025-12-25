"use client";

import { useState } from "react";

type Project = {
  title: string;
  description: string;
  tech: string[];
  status: string;
  color: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([
    {
      title: "Lorem Ipsum Platform",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      tech: ["Lorem", "Ipsum", "Dolor"],
      status: "Completed",
      color: "blue",
    },
    {
      title: "Dolor Sit Application",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      tech: ["Consecte", "Adipiscing", "Elit"],
      status: "In Progress",
      color: "red",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech: "",
    status: "Planning",
  });

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; badge: string }> =
      {
        blue: { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-600" },
        red: { bg: "bg-red-50", border: "border-red-200", badge: "bg-red-600" },
        green: { bg: "bg-green-50", border: "border-green-200", badge: "bg-green-600" },
      };
    return colors[color] || colors.blue;
  };

  const createProject = () => {
    if (!formData.title || !formData.description) return;

    const newProject: Project = {
      title: formData.title,
      description: formData.description,
      tech: formData.tech.split(",").map((t) => t.trim()),
      status: formData.status,
      color: "blue",
    };

    setProjects((prev) => [newProject, ...prev]);
    setIsOpen(false);
    setFormData({ title: "", description: "", tech: "", status: "Planning" });
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Our Projects</h1>
            <p className="text-gray-600">
              Add and showcase projects dynamically.
            </p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 rounded-full bg-blue-600 text-white text-2xl font-bold hover:bg-blue-700"
          >
            +
          </button>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const colors = getColorClasses(project.color);
            return (
              <div
                key={index}
                className="border rounded-2xl p-6 hover:shadow-lg transition"
              >
                <span
                  className={`${colors.badge} text-white px-3 py-1 rounded-full text-sm`}
                >
                  {project.status}
                </span>

                <h3 className="text-xl font-bold mt-4">{project.title}</h3>
                <p className="text-gray-600 mt-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className={`${colors.bg} ${colors.border} border px-2 py-1 rounded-full text-sm`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Project</h2>

            <input
              className="w-full border p-2 mb-3 rounded"
              placeholder="Project title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <textarea
              className="w-full border p-2 mb-3 rounded"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <input
              className="w-full border p-2 mb-3 rounded"
              placeholder="Tech stack (comma separated)"
              value={formData.tech}
              onChange={(e) =>
                setFormData({ ...formData, tech: e.target.value })
              }
            />

            <select
              className="w-full border p-2 mb-4 rounded"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option>Planning</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <div className="flex justify-end gap-3">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button
                onClick={createProject}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
