"use server";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
const URL = process.env.URL || "https://project.programmingcourses.vip";

const fetchWithOptions = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    } else {
      const text = await response.text();
      console.error("Received non-JSON response:", text);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  return response;
};

export const getUser = async () => {
  try {
    const users = await db.user.findMany({
      orderBy: [{ created_at: "desc" }],
    });
    return users;
  } catch (error) {
    console.error("Error while fetching user", error);
    return null;
  }
};

export const updateUserRole = async (id: number, role: string) => {
  try {
    const user = await db.user.update({
      where: { id },
      data: { role: role as Role },
    });
    return user;
  } catch (error) {
    console.error("Error while updating user role", error);
    return null;
  }
};
export const getUserEditor = async () => {
  try {
    const res = await fetchWithOptions(`${URL}/api/user?role=EDITOR`);
    const data = await res.json();
    console.log("User data", data.users);
    return data.users?.length > 0 ? data.users : [];
  } catch (error) {
    console.error("Error while fetching editors", error);
    return [];
  }
};

export const getUserProjectManager = async () => {
  try {
    const res = await fetchWithOptions(`${URL}/api/user?role=PROJECT_MANAGER`);
    const data = await res.json();
    return data.users?.length > 0 ? data.users : [];
  } catch (error) {
    console.error("Error while fetching project managers", error);
    return [];
  }
};
