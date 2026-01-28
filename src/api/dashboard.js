import { app_url } from "./url";

// Simple in-memory cache
let dashboardCache = null;
let cacheTimestamp = 0;
const CACHE_TTL = 60 * 1000; // 60 seconds

export async function getDashboard() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const now = Date.now();
  // Return cached data if still valid
  if (dashboardCache && now - cacheTimestamp < CACHE_TTL) {
    return dashboardCache;
  }

  let res;
  try {
    res = await fetch(`${app_url}/dashboard/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Network error while fetching dashboard:", err);
    throw new Error("Network error. Please try again.");
  }

  let data;
  try {
    data = await res.json();
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    throw new Error("Server returned invalid data");
  }

  if (!res.ok) {
    throw new Error(data?.message || "Failed to load dashboard");
  }

  // Cache the result
  dashboardCache = data;
  cacheTimestamp = Date.now();

  return data;
}
