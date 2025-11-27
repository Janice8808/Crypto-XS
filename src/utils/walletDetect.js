export async function detectWalletAddress() {
  if (!window.ethereum) return null;

  // （1）Base / Onchain 内置浏览器第一次访问就会暴露 selectedAddress
  if (window.ethereum.selectedAddress) {
    return window.ethereum.selectedAddress;
  }

  // （2）部分钱包暴露 accounts
  if (window.ethereum.accounts && window.ethereum.accounts.length > 0) {
    return window.ethereum.accounts[0];
  }

  // （3）已授权过的站点使用 eth_accounts 静默获取
  try {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (accounts && accounts.length > 0) {
      return accounts[0];
    }
  } catch (err) {
    console.log("eth_accounts 失败:", err);
  }

  return null;
}
