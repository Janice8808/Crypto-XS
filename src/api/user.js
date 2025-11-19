import { apiFetch } from "./http";

export function fetchUserBalance() {
  return apiFetch("/api/user/balance", {
    method: "GET"
  });
}
// 用户提币记录
export function fetchWithdrawList() {
  return apiFetch("/api/withdraw/list", {
    method: "GET",
  });
}
