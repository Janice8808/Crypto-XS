import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import axios from "axios";
axios.defaults.baseURL = "https://ceshipankou.shop/api";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

import { AuthProvider } from "@/context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      
        <App />
    
    </AuthProvider>
  </React.StrictMode>
);
 