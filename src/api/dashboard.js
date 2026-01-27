export async function getDashboard() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:3000/dashboard/get", {
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
