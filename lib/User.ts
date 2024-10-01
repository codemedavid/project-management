const URL = process.env.URL || "https://project.programmingcourses.vip";

export const getUser = async () => {
  const res = await fetch(`${URL}/api/user`);
  const data = await res.json();
  return data;
};

export const getUserEditor = async () => {
  try {
    const res = await fetch(`${URL}/api/user?role=EDITOR`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error while fetching editors", error);
  }
};

export const getUserProjectManager = async () => {
  try {
    const res = await fetch(`${URL}/api/user?role=PROJECT_MANAGER`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error while fetching project managers", error);
  }
};
