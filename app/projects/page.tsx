import { db } from "@/lib/db";
import ProjectsCard from "@/components/dashboard/ProjectsCard";

async function getProjects() {
  try {
    console.log("Fetching projects from database...");
    const projects = await db.project.findMany({
      take: 10,
      orderBy: {
        created_at: "desc",
      },
    });
    console.log("Projects fetched successfully:", projects);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  console.log("Rendering ProjectsPage...");
  const projects = await getProjects();

  return (
    <div className='text-black font-light flex justify-between'>
      <div className='w-[40%]'>
        {/* You might want to import and use SideBar component here */}
      </div>
      <div className='w-5/6 flex flex-wrap gap-4 pt-4'>
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectsCard
              key={project.id}
              dark={false}
              title={project.title || "Untitled"}
              description={project.description || "No description"}
              id={project.id.toString()}
            />
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
}
