// useTicker 已废弃，不再使用 WebSocket
export function useTicker() {
  return {
    price: "--",
    changePercent: 0,
    low: 0,
    high: 0,
    amount24h: 0,
  };
}
