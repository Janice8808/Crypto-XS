import { apiFetch } from "./http";

// 下单
export function createOrder(data) {
  return apiFetch("/api/order/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 我的订单
export function getMyOrders() {
  return apiFetch("/api/order/list");
}

// 结算订单
export function settleOrder(data) {
  return apiFetch("/api/order/settle", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 订单状态查询（新增）
export function getOrderStatus(orderId) {
  return apiFetch(`/api/order/status/${orderId}`);
}