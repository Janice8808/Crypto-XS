// src/AuthGate.jsx
import { useAuth } from "@/context/AuthContext";

export default function AuthGate({ children }) {
  const { token, loadingUserInfo } = useAuth();

  if (loadingUserInfo) return null;

  if (token) return children;

  return null;
}
