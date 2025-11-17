// src/api/auth.js
import { apiFetch } from "./http";

// 请求后端生成 nonce
export function requestNonce(address) {
  return apiFetch("/api/auth/nonce", {
    method: "POST",
    body: JSON.stringify({ address }),
  });
}

// 把地址 + 签名发给后端，换 token + userId
export function verifySignature(address, signature) {
  return apiFetch("/api/auth/verify", {
    method: "POST",
    body: JSON.stringify({ address, signature }),
  });
}

