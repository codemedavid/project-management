type Project = {
  title: string;
  description: string;
  editor_id: number;
  project_manager_id: number;
};
export const postProject = async (project: Project) => {
  const res = await fetch("/api/projects", {
    method: "POST",
    body: JSON.stringify(project),
  });
  const data = await res.json();
  return data;
};

export const getProjects = async () => {
  try {
    const res = await fetch(`${process.env.URL}/api/projects`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getProject = async (projectId: number) => {
  try {
    const res = await fetch(
      `${process.env.URL}/api/projects?projectId=${projectId}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getProjectsLimit = async (limit: number) => {
  try {
    const res = await fetch(`${process.env.URL}/api/projects?limit=${limit}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
