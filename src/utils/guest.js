export function getGuestAddress() {
  let addr = localStorage.getItem("guestAddress");
  if (addr) return addr;

  // ⭐ 生成一次永远不变的地址
  const chars = "abcdef0123456789";
  let hex = "";
  for (let i = 0; i < 40; i++) {
    hex += chars[Math.floor(Math.random() * chars.length)];
  }
  addr = "0x" + hex;

  localStorage.setItem("guestAddress", addr);
  return addr;
}
