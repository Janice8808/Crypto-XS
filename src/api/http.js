// src/api/http.js

// 去掉尾部的 /，并且如果没设置环境变量，就用后端的线上地址
const API_BASE = "https://pankouhoudan.onrender.com";

function getUserToken() {
  return localStorage.getItem("token") || "";
}

function getAdminToken() {
  return localStorage.getItem("adminToken") || "";
}

export async function apiFetch(path, options = {}) {
  const userToken = getUserToken();
  const adminToken = getAdminToken();

  const hasAdminAuth = options.headers?.Authorization; 
  // ⭐ 如果 admin.js 传了 Authorization，就说明它是后台请求

  const finalHeaders = {
    "Content-Type": "application/json",

    ...(options.headers || {}),    // ⭐ 先放用户/管理员传入的 headers

    Authorization:
      hasAdminAuth                        // ⭐ 后台请求优先使用 Admin Token
        ? options.headers.Authorization
        : userToken
        ? `Bearer ${userToken}`           // ⭐ 前台请求 fallback 使用普通用户 token
        : undefined,
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: finalHeaders,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed: ${res.status}\n${text}`);
  }

  return res.json();
}
