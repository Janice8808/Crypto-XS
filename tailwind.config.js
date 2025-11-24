// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#10c482ff',  // 自定义绿色
        customBlue: '#1D4ED8',   // 自定义蓝色
        customRed: '#EF4444',    // 自定义红色
        customPurple: '#8B5CF6', // 自定义紫色
      },
    },
  },
  plugins: [],
};
