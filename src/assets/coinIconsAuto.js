// 自动扫描 public/coin-icons 文件夹下的所有图片
const modules = import.meta.glob("/public/coin-icons/*.{png,jpg,jpeg,svg}", {
  eager: true,
});

// 生成映射表：BTC.png → BTC
const coinIcons = {};

Object.entries(modules).forEach(([path, module]) => {
  const fileName = path.split("/").pop(); // BTC.png
  const key = fileName.split(".")[0].toUpperCase(); // BTC
  coinIcons[key] = path.replace("/public", ""); // 访问路径变成 /coin-icons/BTC.png
});

export { coinIcons };
