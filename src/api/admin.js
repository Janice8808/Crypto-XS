// src/api/admin.js
import { apiFetch } from "./http";

// 从 localStorage 取 adminToken
function getAdminToken() {
  return localStorage.getItem("adminToken") || "";
}

// 统一生成 Admin 请求用的 headers
function adminHeaders() {
  const adminToken = getAdminToken();
  if (!adminToken) {
    throw new Error("请先登录后台（缺少 adminToken）");
  }
  return {
    Authorization: `Bearer ${adminToken}`,
  };
}

// ✔ 1. 后台登录，拿 adminToken
export function adminLogin(password) {
  return apiFetch("/admin/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
}

// ✔ 2. 获取后台所有用户（返回的是数组）
export function fetchAllUsers() {
  return apiFetch("/admin/users", {
    method: "GET",
    headers: adminHeaders(),
  });
}

// ✔ 3. 调整余额（后台）—— 先用你现有的 /admin/balance/add
export function adminAdjustBalance({ address, symbol, amount }) {
  const url = amount >= 0
    ? "/admin/balance/add"
    : "/admin/balance/sub";

  return apiFetch(url, {
    method: "POST",
    headers: adminHeaders(),
    body: JSON.stringify({ address, symbol, amount }),
  });
}

// ✅ 建议改成通用透传，支持 remark
export function adminSetControlMode(data) {
  return apiFetch("/admin/user/control", {
    method: "POST",
    headers: adminHeaders(),
    body: JSON.stringify(data),   // ⭐ 不再手动挑字段，全部发出去
  });
}
