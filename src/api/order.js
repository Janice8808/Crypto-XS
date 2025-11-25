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
// 在前端的 api/order.js 中
export const createOrder = async (orderData) => {
  return await apiFetch("/api/order/create", {
    method: "POST",
    body: JSON.stringify({
      symbol: orderData.symbol,
      amount: orderData.amount,
      direction: orderData.direction,
      period: orderData.period,      // 新增
      price: orderData.price,        // 新增
      percent: orderData.percent     // 新增
    }),
  });
};