import React from "react";
import Banner from "./Banner";
import SmallProjectsCard from "./Cards/SmallProjectsCard";
import { db } from "@/lib/db";
export default async function ProjectManager({
  session,
}: {
  session: {
    user: { name: string; username: string; email: string; id: string };
  };
}) {
  const id = parseInt(session.user.id);
  const myProjects = await db.project.findMany({
    where: {
      project_manager_id: id,
    },
  });
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='h-[30vh] w-full pt-10 pr-12 '>
        <Banner />
      </div>
      <div className='pr-10'>
        <p className='text-xl font-semibold pb-2'>Your Projects</p>
        <div className='flex gap-4 overflow-x-auto '>
          {myProjects.length > 0 ? (
            myProjects.map(
              (project: { id: number; title: string; description: string }) => (
                <SmallProjectsCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                />
              )
            )
          ) : (
            <p>No projects found</p>
          )}
        </div>
      </div>
    </div>
  );
}
