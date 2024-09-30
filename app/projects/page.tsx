import React from "react";
import ProjectsCard from "@/components/dashboard/ProjectsCard";
import { getProjects } from "@/lib/project";
import SideBar from "@/components/sideBar/sideBar";
export default async function Page() {
  const projects = await getProjects();
  const projectsData = projects.projects;
  return (
    <div className=' text-black font-light flex justify-between'>
      <div className='w-[40%]'>
        <SideBar link='Projects' />
      </div>
      <div className='w-5/6 flex flex-wrap gap-4 pt-4'>
        {projects.length > 0 ? (
          <ul>
            {projectsData.map(
              (project: { title: string; description: string; id: string }) => (
                <ProjectsCard
                  key={project.id}
                  dark={false}
                  title={project.title}
                  description={project.description}
                  id={project.id}
                />
              )
            )}
          </ul>
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
}
