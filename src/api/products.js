import { app_url } from "./url";

export async function getProducts(page = 1, limit = 8) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${app_url}/products?page=${page}&limit=${limit}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch products");
  }
  return res.json();
}

export async function addProduct(data) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${app_url}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to add product");
  }
  return res.json();
}

export async function updateProduct(id, data) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${app_url}/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update product");
  }
  return res.json();
}

export async function deleteProduct(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${app_url}/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to delete product");
  }
  return res.json();
}
