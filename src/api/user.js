import { apiFetch } from "./http";

export function fetchUserBalance() {
  return apiFetch("/api/user/balance", {
    method: "GET"
  });
}
