import { app_url } from "./url";

export async function getDashboard() {
  const token = localStorage.getItem("token");
  console.log(app_url);
  const res = await fetch(`${app_url}/dashboard/get`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to load dashboard");
  }

  return data;
}
