import React from "react";
import ProjectsCard from "./ProjectsCard";
import { db } from "@/lib/db";
export default async function ProjectsContents() {
  const projects = await db.project.findMany({
    take: 4,
    orderBy: {
      created_at: "desc",
    },
  });
  return (
    <div className='flex gap-4 flex-wrap overflow-y-auto'>
      {projects &&
        projects.map(
          (project: { title: string; description: string; id: number }) => (
            <ProjectsCard
              dark={false}
              title={project.title}
              description={project.description}
              id={project.id.toString()}
              key={project.id}
            />
          )
        )}
    </div>
  );
}
