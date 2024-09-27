type Project = {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
};
export const postProject = async (project: Project) => {
  const res = await fetch("http://localhost:3000/api/project", {
    method: "POST",
    body: JSON.stringify(project),
  });
  const data = await res.json();
  return data;
};
