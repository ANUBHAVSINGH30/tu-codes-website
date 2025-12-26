"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type Project = {
  id: string | number;
  title?: string | null;
  description?: string | null;
  owner?: string | null;
  image_url?: string | null;
  github_link?: string | null;
  created_at?: string | null;
};

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const router = useRouter();

  const go = (href?: string | null) => {
    if (!href) return;
    // For external links, better to use window.open
    if (href.startsWith("http")) window.open(href, "_blank", "noopener,noreferrer");
    else router.push(href);
  };

  if (!projects || projects.length === 0) {
    return <p className="text-sm text-gray-600">No projects yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((p) => {
        const clickable = Boolean(p.github_link);

        return (
          <div
            key={p.id}
            role={clickable ? "button" : undefined}
            tabIndex={clickable ? 0 : -1}
            onClick={() => go(p.github_link)}
            onKeyDown={(e) => {
              if (!clickable) return;
              if (e.key === "Enter" || e.key === " ") go(p.github_link);
            }}
            className={`rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition ${
              clickable ? "cursor-pointer hover:shadow-md" : "opacity-70"
            }`}
          >
            <div className="font-semibold text-gray-900">{p.title}</div>
            <div className="text-sm text-gray-600 mt-1">{p.description}</div>
            <div className="text-sm text-gray-600 mt-1">Owner: {p.owner}</div>

            <div className="mt-3 relative w-full aspect-square overflow-hidden rounded-xl border bg-gray-50">
              <Image
                src={
                  p.image_url ??
                  "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/dNWlZMXU_400x400.png"
                }
                alt={p.title ?? "Project image"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                quality={75}
                className="object-cover"
              />
            </div>

            <div className="text-xs text-gray-500 mt-3">
              {p.created_at ? new Date(p.created_at).toLocaleString() : ""}
            </div>
          </div>
        );
      })}
    </div>
  );
}
