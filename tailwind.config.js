module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 保留标准绿色 + 添加自定义颜色
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',  // 标准绿色
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        customGreen: '#10c482ff',
        customBlue: '#1D4ED8',   
        customRed: '#EF4444',    
        customPurple: '#8B5CF6', 
      },
    },
  },
  plugins: [],
};