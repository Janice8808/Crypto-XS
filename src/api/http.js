// src/api/http.js

// 后端主域名
const API_BASE = "https://pankouhoutai.shop";

// 获取用户 token
function getUserToken() {
  return localStorage.getItem("token") || "";
}

// 获取后台 token
function getAdminToken() {
  return localStorage.getItem("adminToken") || "";
}

export async function apiFetch(path, options = {}) {
  const userToken = getUserToken();
  const adminToken = getAdminToken();

  const hasAdminAuth = options.headers?.Authorization;

  const finalHeaders = {
    "Content-Type": "application/json",

    ...(options.headers || {}),

    Authorization:
      hasAdminAuth
        ? options.headers.Authorization
        : userToken
        ? `Bearer ${userToken}`
        : undefined,
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: finalHeaders,

    // ⭐⭐⭐ 必须加这个，才能让浏览器带上 HttpOnly Cookie
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed: ${res.status}\n${text}`);
  }

  return res.json();
}
