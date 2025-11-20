// download-icons.cjs
// Node.js CommonJS 版本
// 自动下载图标 + 自动生成 coinIcons.js 映射

const fs = require("fs");
const path = require("path");
const https = require("https");

// TrustWallet 镜像（100% 下载成功）
const coins = {
  BTC: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
  ETH: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
  BNB: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png",
  SOL: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png",
  XRP: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ripple/info/logo.png",
  DOGE: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
  ADA: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/cardano/info/logo.png",
  TRX: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/tron/info/logo.png",
  AVAX: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanchec/info/logo.png",
  DOT: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polkadot/info/logo.png",
  LTC: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/litecoin/info/logo.png",
  LINK: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png",
  ATOM: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/cosmos/info/logo.png",
  FIL: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/filecoin/info/logo.png",
  BCH: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoincash/info/logo.png",
  MATIC: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png",
  TON: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ton/info/logo.png",
  ICP: "https://cryptologos.cc/logos/internet-computer-icp-logo.png",
  APT: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/aptos/info/logo.png",
  NEAR: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/near/info/logo.png",
  SAND: "https://cryptologos.cc/logos/the-sandbox-sand-logo.png",
  MANA: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0F5D2fB29fb7d3CFeE444a200298f468908cC942/logo.png",
  ARB: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png",
  OP: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/info/logo.png",
  SUI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/sui/info/logo.png",
};

// 输出目录
const outputDir = path.join(__dirname, "public", "coin-icons");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log("📁 创建目录:", outputDir);
}

// 下载函数
function download(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        return reject(`❌ 下载失败 ${url} 状态码: ${response.statusCode}`);
      }
      response.pipe(file);
      file.on("finish", () => file.close(() => resolve()));
    }).on("error", (err) => reject(err));
  });
}

(async () => {
  console.log("🚀 开始下载 Coin 图标...\n");

  let iconsJS = "export const coinIcons = {\n";

  for (const [symbol, url] of Object.entries(coins)) {
    const filename = `${symbol}.png`;
    const filepath = path.join(outputDir, filename);

    try {
      await download(url, filepath);
      console.log(`✅ 已下载: ${symbol} → ${filename}`);
      iconsJS += `  ${symbol}: "/coin-icons/${filename}",\n`;
    } catch (error) {
      console.log(error);
    }
  }

  iconsJS += "};\n";

  // 写出到前端使用
  const outPath = path.join(__dirname, "src", "assets", "coinIcons.js");
  fs.writeFileSync(outPath, iconsJS);

  console.log(`\n✨ 已生成映射文件: ${outPath}`);
  console.log("\n🎉 全部完成！");
})();
