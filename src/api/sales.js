export async function getSales(page = 1, limit = 8) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `http://localhost:3000/sales?page=${page}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const data = await res.json(); // parse response

  if (!res.ok) throw new Error(data.message || "Failed to fetch sales");

  return data;
}

export async function createSale(values) {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/sales", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create sale");

  return data;
}

export async function updateSale(id, values) {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:3000/sales/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update sale");

  return data;
}

export async function deleteSale(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:3000/sales/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete sale");

  return data;
}

export async function getProducts() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/sales/products", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) throw new Error(data.message || "Failed to fetch products");

  return data;
}
