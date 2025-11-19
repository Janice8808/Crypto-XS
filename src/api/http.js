// src/api/http.js

// 去掉尾部的 /，并且如果没设置环境变量，就用后端的线上地址
const API_BASE = "https://pankouhoutai.shop";

function getToken() {
  return localStorage.getItem("token") || "";
}

export async function apiFetch(path, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
