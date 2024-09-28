import React from "react";
import Banner from "./Banner";
import SmallProjectsCard from "./Cards/SmallProjectsCard";
import { getProjectsByProjectManagerId } from "@/lib/project";
export default async function ProjectManager({
  session,
}: {
  session: {
    user: { name: string; username: string; email: string; id: string };
  };
}) {
  console.log(session);
  const id = parseInt(session.user.id);
  const myProjects = await getProjectsByProjectManagerId(id);
  console.log(myProjects);
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='h-[30vh] w-full pt-10 pr-12 '>
        <Banner />
      </div>
      <div className='pr-10'>
        <p className='text-xl font-semibold pb-2'>Your Projects</p>
        <div className='flex gap-4 overflow-x-auto '>
          {myProjects.projects.map(
            (project: { id: number; title: string; description: string }) => (
              <SmallProjectsCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
