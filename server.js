const express = require("express");
const path = require("path");
const app = express();

const distPath = path.join(__dirname, "dist");

// 静态资源托管
app.use(express.static(distPath));

// 所有路径都返回 index.html（SPA 解决 404）
app.get("*", (_, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Render 自动提供 PORT 环境变量
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
