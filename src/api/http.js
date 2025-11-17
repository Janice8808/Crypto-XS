// src/api/http.js

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

function getToken() {
  return localStorage.getItem("token") || "";
}

export async function apiFetch(path, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    // 先用默认 user token
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    // 再让调用方覆盖（比如 adminToken）
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}
