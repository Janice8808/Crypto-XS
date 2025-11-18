import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// ✓ 全局 axios 设置（一定要放在最顶层执行一次）
import axios from "axios";
axios.defaults.baseURL = "https://ceshipankou.shop/api";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

// ✓ AuthProvider
import { AuthProvider } from '@/context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
