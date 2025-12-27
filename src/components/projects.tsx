"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createProject } from "../../lib/actions";
import { Plus, Check, AlertCircle, X } from "lucide-react";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const imageUrlError = useMemo(() => {
    const v = imageUrl.trim();
    if (!v) return null;
    try {
      const u = new URL(v);
      if (!["http:", "https:"].includes(u.protocol)) return "URL must start with http or https";
      return null;
    } catch {
      return "Please enter a valid URL";
    }
  }, [imageUrl]);

  const canSubmit =
    projectName.trim().length > 0 &&
    projectDescription.trim().length > 0 &&
    !imageUrlError &&
    !isSubmitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      await createProject(
        projectName.trim(),
        githubLink.trim(),
        projectDescription.trim(),
        imageUrl.trim()
      );

      setSubmitStatus("success");

      // Reset form
      setProjectName("");
      setGithubLink("");
      setProjectDescription("");
      setImageUrl("");

      // Refresh the page to show the new project and close modal
      setTimeout(() => {
        router.refresh();
        setSubmitStatus("idle");
        onClose();
      }, 1500);

    } catch (err: any) {
      setSubmitStatus("error");
      setErrorMessage(err?.message || "Failed to create project");
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
          disabled={isSubmitting}
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {/* Header */}
        <div className="mb-8 text-center pr-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create New Project</h2>
          <p className="text-gray-600">Share your amazing work with the community</p>
        </div>

        {/* Success Message */}
        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <Check className="w-5 h-5 text-green-600" />
            <p className="text-green-700 font-medium">Project created successfully! Refreshing...</p>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-700 font-medium">{errorMessage}</p>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="project-name" className="text-gray-700 font-semibold">
              Project Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="project-name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="My Awesome Project"
              className="h-12 text-base"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-description" className="text-gray-700 font-semibold">
              Project Description <span className="text-red-500">*</span>
            </Label>
            <Input
              id="project-description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="A brief description of what your project does..."
              className="h-12 text-base"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github-link" className="text-gray-700 font-semibold">
              GitHub Link <span className="text-gray-400 text-sm font-normal">(Optional)</span>
            </Label>
            <Input
              id="github-link"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              placeholder="https://github.com/username/repo"
              className="h-12 text-base"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-image" className="text-gray-700 font-semibold">
              Image URL <span className="text-gray-400 text-sm font-normal">(Optional)</span>
            </Label>
            <Input
              id="project-image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="h-12 text-base"
              disabled={isSubmitting}
            />
            {imageUrlError && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {imageUrlError}
              </p>
            )}
          </div>

          <Button
            type="button"
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating Project...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create Project
              </span>
            )}
          </Button>
        </div>

        {/* Helper Text */}
        <p className="mt-6 text-center text-sm text-gray-500">
          <span className="text-red-500">*</span> Required fields
        </p>
      </div>
    </div>
  );
}

