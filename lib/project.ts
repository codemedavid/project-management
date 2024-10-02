"use server";
import { db } from "@/lib/db";
import { ProjectType } from "@prisma/client";
const URL = process.env.URL || "https://project.programmingcourses.vip";

type ProjectDetails = {
  client_id: number;
  project_type: ProjectType | null;
  Platform: string | null;
  Rate: number | null;
  Video_Type: string | null;
  Niche: string | null;
};
type Project = {
  title: string;
  description: string;
  project_manager_id: number;
  editor_id: number;
};
export const postProject = async (project: Project) => {
  const newProject = await db.project.create({
    data: {
      title: project.title || "",
      description: project.description || "",
      project_manager_id: project.project_manager_id || 1,
      editor_id: project.editor_id || 1,
    },
  });
  return newProject;
};

export const addProjectDetails = async (
  project: ProjectDetails,
  id: number
) => {
  const newProject = await db.project.update({
    where: { id: id },
    data: {
      client_id: project.client_id,
      Platform: project.Platform,
      project_type: project.project_type as ProjectType,
      Rate: project.Rate || 0.0,
      Video_Type: project.Video_Type,
      Niche: project.Niche,
    },
  });
  return newProject;
};

export const getProjects = async () => {
  try {
    const res = await fetch(`${URL}/api/projects`);
    const data = await res.json();
    console.log("get projects data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getProject = async (projectId: number) => {
  try {
    const res = await fetch(`${URL}/api/projects?projectId=${projectId}`);
    const data = await res.json();
    console.log("get project data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getProjectsLimit = async (limit: number) => {
  try {
    const res = await fetch(`${URL}/api/projects?limit=${limit}`);
    const data = await res.json();
    console.log("get projects limit data", data.projects);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getProjectsByProjectManagerId = async (
  projectManagerId: number
) => {
  try {
    const res = await fetch(
      `${URL}/api/projects?projectManagerId=${projectManagerId}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
