const URL = process.env.URL || "https://project.programmingcourses.vip";

export const getUser = async () => {
  try {
    const res = await fetch(`${URL}/api/user`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error while fetching user", error);
  }
};

export const getUserEditor = async () => {
  try {
    const res = await fetch(`${URL}/api/user?role=EDITOR`);
    const data = await res.json();
    console.log("user data", data.users);
    return data.users.length > 0 ? data.users : [];
  } catch (error) {
    console.error("error while fetching editors", error);
  }
};

export const getUserProjectManager = async () => {
  try {
    const res = await fetch(`${URL}/api/user?role=PROJECT_MANAGER`);
    const data = await res.json();
    return data.users.length > 0 ? data.users : [];
  } catch (error) {
    console.error("error while fetching project managers", error);
  }
};
