const URL = process.env.URL || "https://project.programmingcourses.vip";

const fetchWithOptions = (url: string) =>
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

export const getUser = async () => {
  try {
    const res = await fetchWithOptions(`${URL}/api/user`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error while fetching user", error);
    return null;
  }
};

export const getUserEditor = async () => {
  try {
    const res = await fetchWithOptions(`${URL}/api/user?role=EDITOR`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
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
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.users?.length > 0 ? data.users : [];
  } catch (error) {
    console.error("Error while fetching project managers", error);
    return [];
  }
};
