import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// 后端 API
const API = "https://pankouhoudan.onrender.com";   // Render 后端（你可以改）

export default function AdminSimple() {
  const [password, setPassword] = useState("");
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken") || "");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ===============================
  // 登录
  // ===============================
  const handleLogin = async () => {
    if (!password) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) throw new Error("登录失败");

      const data = await res.json();
      localStorage.setItem("adminToken", data.adminToken);
      setAdminToken(data.adminToken);
    } catch (e) {
      setError("密码错误或后端连接失败");
    }
    setLoading(false);
  };

  // ===============================
  // 获取用户列表
  // ===============================
  const loadUsers = async () => {
    if (!adminToken) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/admin/users`, {
        headers: { Authorization: "Bearer " + adminToken },
      });

      if (!res.ok) throw new Error("请求失败");

      const data = await res.json();
      setUsers(data);
    } catch (e) {
      setError("无法连接后端，请检查 Render 是否启动");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (adminToken) loadUsers();
  }, [adminToken]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdminToken("");
    setUsers([]);
  };

  // ===============================
  // 时间格式
  // ===============================
  const fmt = (t) => (t ? new Date(Number(t)).toLocaleString() : "-");

  // ===============================
  // 登录界面
  // ===============================
  if (!adminToken) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm shadow">
          <CardContent className="p-5 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 text-center">后台登录</h2>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="后台密码 admin123"
              className="w-full border rounded px-3 py-2 text-sm"
            />

            {error && <div className="text-red-500 text-xs">{error}</div>}

            <Button
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-white"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "登录中..." : "登录"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ===============================
  // 后台主界面
  // ===============================
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-lg font-bold text-gray-800">用户管理</h1>
        <Button size="sm" variant="outline" onClick={logout}>
          退出
        </Button>
      </div>

      <Card className="shadow border">
        <CardContent className="p-4">
          <Button
            className="bg-yellow-400 hover:bg-yellow-500 text-white mb-3"
            size="sm"
            onClick={loadUsers}
          >
            刷新
          </Button>

          {loading && <div className="text-gray-500">Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}

          <div className="overflow-auto max-h-[70vh]">
            <table className="min-w-full text-xs">
              <thead className="bg-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">会员账号</th>
                  <th className="p-2 text-left">备注</th>
                  <th className="p-2 text-left">注册时间</th>
                  <th className="p-2 text-left">注册 IP</th>
                  <th className="p-2 text-left">登录时间</th>
                  <th className="p-2 text-left">登录 IP</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.address} className="border-b">
                    <td className="p-2">{u.address_label}</td>
                    <td className="p-2">{u.address}</td>
                    <td className="p-2">{u.remark || "-"}</td>
                    <td className="p-2">{fmt(u.created_at)}</td>
                    <td className="p-2">{u.register_ip || "-"}</td>
                    <td className="p-2">{fmt(u.last_login)}</td>
                    <td className="p-2">{u.last_login_ip || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
