// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  adminAdjustBalance,
  fetchAllUsers,
  adminLogin,
  adminSetControlMode,
} from "@/api/admin";

export default function AdminPanel() {
  // ====== Admin 登录状态 ======
  const [adminPassword, setAdminPassword] = useState("");
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") || ""
  );
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // ====== 用户列表 ======
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userError, setUserError] = useState(null);

  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  // ====== 编辑弹窗状态 ======
  const [editingUser, setEditingUser] = useState(null);
  const [editSymbol, setEditSymbol] = useState("USDT");
  const [editMode, setEditMode] = useState("add"); // add / sub
  const [editAmount, setEditAmount] = useState("");
  const [editControlMode, setEditControlMode] = useState("normal");
  const [editRemark, setEditRemark] = useState("");
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState(null);

  // ====== 🔔 新订单 / 新提币 提醒状态 ======
  const [notify, setNotify] = useState(null);

  // ====== 播报函数（语音提醒） ======
  function speak(text) {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "zh-CN"; // 你也可以改成 "en-US"
    window.speechSynthesis.speak(utter);
  }

  // ====== Admin 登录逻辑 ======
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    if (!adminPassword) {
      setLoginError("请输入后台密码");
      return;
    }
    try {
      setLoginLoading(true);
      const res = await adminLogin(adminPassword);
      if (!res.adminToken) throw new Error("返回数据中没有 adminToken");
      localStorage.setItem("adminToken", res.adminToken);
      setAdminToken(res.adminToken);
      setAdminPassword("");
    } catch (err) {
      console.error(err);
      setLoginError(err.message || "后台登录失败");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("adminToken");
    setAdminToken("");
    setUsers([]);
  };

  // ====== 拉取用户列表 ======
  const loadUsers = async () => {
    if (!adminToken) return;
    setUserError(null);
    try {
      setLoadingUsers(true);
      const res = await fetchAllUsers();
      setUsers(Array.isArray(res) ? res : res.users || []);
    } catch (err) {
      console.error(err);
      setUserError(err.message || "加载用户失败");
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (adminToken) loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken]);

  // ====== 🔔 WebSocket 监听新订单 / 新提币 ======
useEffect(() => {
  if (!adminToken) return; // 未登录不连 WS

  // ⭐ 自动根据环境选择 WebSocket 地址
  const wsUrl = import.meta.env.PROD
    ? `wss://${window.location.host}`   // 线上环境（Cloudflare Pages）
    : "ws://localhost:5000";            // 本地开发环境

  console.log("📡 Admin WS connecting:", wsUrl);

  const ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    console.log("✅ Admin WebSocket connected");
  };

  ws.onmessage = (event) => {
    let data;
    try {
      data = JSON.parse(event.data);
    } catch (e) {
      return; // Binance 行情等不是 JSON，忽略
    }

    if (Array.isArray(data)) return; // 行情数组忽略

    // ⭐ 新订单通知
    if (data.type === "NEW_ORDER" && data.order) {
      const o = data.order;
      const label = o.remark || "无备注用户";

      const text = `有新订单：${label}，交易对 ${o.symbol || "-"}，金额 ${o.amount}`;
      setNotify({
        title: "新订单",
        text,
      });
      speak(text);
    }

    // ⭐ 新提币通知
    if (data.type === "NEW_WITHDRAW" && data.withdraw) {
      const w = data.withdraw;
      const label = w.remark || "无备注用户";

      const text = `有新提币申请：${label}，币种 ${w.symbol || "-"}，数量 ${w.amount}`;
      setNotify({
        title: "新提币申请",
        text,
      });
      speak(text);
    }
  };

  ws.onclose = () => {
    console.log("❌ Admin WebSocket disconnected");
  };

  ws.onerror = (err) => {
    console.error("Admin WebSocket error:", err);
  };

  return () => {
    ws.close();
  };
}, [adminToken]);


  // ====== 工具函数 ======
  const formatTime = (ts) => {
    if (!ts) return "-";
    const d = new Date(ts);
    return d.toLocaleString();
  };

  const calcStatus = (balances = {}) => {
    const total = Object.values(balances).reduce(
      (sum, v) => sum + Number(v || 0),
      0
    );
    return total > 0 ? "正常" : "空钱包";
  };

  const getBalanceSummary = (balances = {}) => {
    const entries = Object.entries(balances);
    if (entries.length === 0) return "无资产";
    return entries.map(([sym, val]) => `${sym}: ${val}`).join("  |  ");
  };

  const renderVerifyStatus = (u) => {
    const st = u.verifyStatus || "success";
    if (st === "success") return <span className="text-emerald-600">认证成功</span>;
    if (st === "pending") return <span className="text-amber-600">审核中</span>;
    return <span className="text-rose-500">未认证</span>;
  };

  const filteredUsers = users.filter((u) => {
    const status = calcStatus(u.balances);
    if (statusFilter !== "all" && status !== statusFilter) return false;

    if (!search) return true;
    const s = search.toLowerCase();
    return (
      (u.wallet && u.wallet.toLowerCase().includes(s)) ||
      (u.userId && String(u.userId).includes(s))
    );
  });

  // ====== 打开编辑弹窗 ======
  const openEdit = (u) => {
    setEditingUser(u);
    setEditSymbol("USDT");
    setEditMode("add");
    setEditAmount("");
    setEditControlMode(u.controlMode || "normal");
    setEditRemark(u.remark || "");
    setEditError(null);
  };

  const closeEdit = () => {
    setEditingUser(null);
  };

  // ====== 保存编辑（资产 + 控盘） ======
const handleSaveEdit = async () => {
  if (!editingUser) return;
  const address = editingUser.wallet;
  setEditError(null);

  // 金额是否填写
  const hasAmount = editAmount && !Number.isNaN(Number(editAmount));

  // 控盘模式是否变化
  const controlChanged =
    (editingUser.controlMode || "normal") !== editControlMode;

  // 备注是否变化
  const oldRemark = (editingUser.remark || "").trim();
  const newRemark = (editRemark || "").trim();
  const remarkChanged = oldRemark !== newRemark;

  if (!hasAmount && !controlChanged && !remarkChanged) {
    setEditError("没有修改内容，无需保存");
    return;
  }

  try {
    setEditSaving(true);

    // 1. 调整余额
    if (hasAmount) {
      const raw = Number(editAmount);
      if (raw === 0 || Number.isNaN(raw)) {
        throw new Error("请输入有效金额");
      }
      const finalAmount = editMode === "add" ? raw : -raw;

      await adminAdjustBalance({
        address,
        symbol: editSymbol,
        amount: finalAmount,
      });
    }

    // 2. 控盘模式 / 备注 更新到后端
if (controlChanged || remarkChanged) {
  const oldRemark = (editingUser.remark || "").trim();
  const newRemark = (editRemark || "").trim();

  await adminSetControlMode({
    address,
    mode: editControlMode,
    remark: newRemark,   // ⭐ 把备注一并传给后端
  });
}


    // 3. ⭐ 前端本地也同步一份（乐观更新）
    setUsers((prev) =>
      prev.map((u) =>
        u.wallet === editingUser.wallet
          ? {
              ...u,
              controlMode: editControlMode,
              remark: newRemark,
            }
          : u
      )
    );

    // 再拉一遍用户列表，保证跟后端完全同步
    await loadUsers();
    closeEdit();
  } catch (err) {
    console.error(err);
    setEditError(err.message || "保存失败");
  } finally {
    setEditSaving(false);
  }
};


  // ========= 未登录后台：登录页面 =========
  if (!adminToken) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm shadow rounded-2xl">
          <CardContent className="p-6 space-y-4">
            <h1 className="text-lg font-bold text-gray-800 text-center">
              用户管理后台登录
            </h1>
            <p className="text-xs text-gray-500 text-center">
              仅内部使用，请输入后台管理密码。
            </p>
            <form onSubmit={handleAdminLogin} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  后台密码
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="例如：admin123"
                />
              </div>
              {loginError && (
                <div className="text-xs text-rose-500 bg-rose-50 border border-rose-100 rounded px-3 py-2">
                  {loginError}
                </div>
              )}
              <Button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-amber-400 hover:bg-amber-500 text-white font-medium rounded-lg"
              >
                {loginLoading ? "登录中..." : "登录后台"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ========= 已登录后台：主页面 =========
  return (
    <div className="min-h-screen bg-gray-100 p-4 text-black">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* 顶部标题栏 */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-gray-800">用户管理</div>
          <Button
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={handleAdminLogout}
          >
            退出后台
          </Button>
        </div>

        <Card className="shadow rounded-2xl border border-gray-200">
          <CardContent className="p-4 space-y-3">
            {/* 顶部按钮行（占位，后面可以接功能） */}
            <div className="flex flex-wrap gap-2 mb-1">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-4">
                新增
              </Button>
              <Button className="bg-sky-500 hover:bg-sky-600 text-white text-xs px-4">
                冻结
              </Button>
              <Button className="bg-rose-400 hover:bg-rose-500 text-white text-xs px-4">
                解冻
              </Button>
              <Button className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-4">
                允许提币
              </Button>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white text-xs px-4">
                禁止提币
              </Button>
              <Button className="bg-red-500 hover:bg-red-600 text-white text-xs px-4">
                删除
              </Button>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white text-xs px-4">
                群发通知
              </Button>
            </div>

            {/* 筛选 + 搜索条 */}
            <div className="flex justify-between items-center gap-3 mb-2">
              <div className="text-sm font-semibold text-gray-800">
                用户列表
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border rounded px-2 py-1 text-xs text-gray-700 bg-white"
                >
                  <option value="all">全部状态</option>
                  <option value="正常">正常</option>
                  <option value="空钱包">空钱包</option>
                </select>
                <select className="border rounded px-2 py-1 text-xs text-gray-700 bg-white">
                  <option value="id">用户ID</option>
                  <option value="wallet">会员账号</option>
                </select>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="请输入会员账号或用户ID"
                  className="border rounded px-2 py-1 text-xs w-56 outline-none focus:ring-1 focus:ring-amber-400 bg-white"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadUsers}
                  disabled={loadingUsers}
                  className="text-xs"
                >
                  {loadingUsers ? "刷新中..." : "刷新"}
                </Button>
              </div>
            </div>

            {userError && (
              <div className="text-sm text-rose-500 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
                {userError}
              </div>
            )}

            {/* 表格 */}
            <div className="max-h-[520px] overflow-auto border rounded-lg bg-white">
              <table className="min-w-full text-xs">
                <thead className="bg-[#f8fafc] sticky top-0 z-10 border-b">
                  <tr>
                    <th className="px-2 py-2 text-left w-6">
                      <input type="checkbox" />
                    </th>
                    <th className="px-2 py-2 text-left text-gray-500 font-medium w-16">
                      ID
                    </th>
                    <th className="px-2 py-2 text-left text-gray-500 font-medium w-64">
                      会员账号
                    </th>
                    <th className="px-2 py-2 text-left text-gray-500 font-medium w-40">
                      备注
                    </th>
                    <th className="px-2 py-2 text-left text-gray-500 font-medium w-40">
                      登陆/复登时间
                    </th>
                    <th className="px-2 py-2 text-left text-gray-500 font-medium w-52">
                      注册IP/时间
                    </th>
                    <th className="px-2 py-2 text-left text-gray-500 font-medium w-40">
                      地址
                    </th>
                    <th className="px-2 py-2 text-left text-gray-500 font-medium w-24">
                      认证
                    </th>
                    <th className="px-2 py-2 text-left text-gray-500 font-medium w-32">
                      状态
                    </th>
                    <th className="px-2 py-2 text-left text-gray-500 font-medium w-52">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan={10}
                        className="px-3 py-6 text-center text-gray-400"
                      >
                        暂无用户
                      </td>
                    </tr>
                  )}

                  {filteredUsers.map((u) => {
                    const status = calcStatus(u.balances);
                    const remark = u.remark || "";
                    const loginCount = u.loginCount || 0;

                    return (
                      <tr
                        key={u.wallet}
                        className="border-t hover:bg-[#fafafa]"
                      >
                        <td className="px-2 py-2 align-top">
                          <input type="checkbox" />
                        </td>
                        <td className="px-2 py-2 align-top text-gray-800">
                          {u.userId || "-"}
                        </td>
                        <td className="px-2 py-2 align-top">
                          <div className="font-mono text-[11px] text-gray-800 break-all">
                            {u.wallet}
                          </div>
                        </td>
                        <td className="px-2 py-2 align-top">
                          <div className="text-[11px] text-gray-700 truncate max-w-[160px]">
                            {remark || "—"}
                          </div>
                        </td>
                        <td className="px-2 py-2 align-top text-gray-600">
                          <div className="text-[11px] leading-snug">
                            <div>{loginCount}次 时间</div>
                            <div>{formatTime(u.lastLogin)}</div>
                          </div>
                        </td>
                        <td className="px-2 py-2 align-top text-gray-600">
                          <div className="text-[11px] leading-snug">
                            <div>
                              IP：{u.registerIp || u.lastLoginIp || "-"}
                            </div>
                            <div>时间：{formatTime(u.createdAt)}</div>
                          </div>
                        </td>
                        <td className="px-2 py-2 align-top">
                          <div className="text-[11px] text-gray-700 break-words">
                            {u.addressLabel || "—"}
                          </div>
                        </td>
                        <td className="px-2 py-2 align-top text-[11px]">
                          {renderVerifyStatus(u)}
                        </td>
                        <td className="px-2 py-2 align-top text-[11px] text-gray-700">
                          <div>登陆：正常</div>
                          <div>提币：正常</div>
                        </td>
                        <td className="px-2 py-2 align-top space-y-1">
                          <div className="flex flex-wrap gap-1">
                            <button
                              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded px-2 py-1 text-[11px]"
                              onClick={() => openEdit(u)}
                            >
                              编辑
                            </button>
                            <button
                              className="bg-slate-600 hover:bg-slate-700 text-white rounded px-2 py-1 text-[11px]"
                              onClick={() =>
                                alert(
                                  `资产详情：\n${getBalanceSummary(u.balances)}`
                                )
                              }
                            >
                              查看资产
                            </button>
                            <button
                              className="bg-emerald-500 hover:bg-emerald-600 text-white rounded px-2 py-1 text-[11px]"
                              onClick={() =>
                                alert("这里可以做发送单独通知功能 📩")
                              }
                            >
                              发送通知
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ====== 编辑弹窗 ====== */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-5 py-3 border-b flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-800">
                编辑用户（ID：{editingUser.userId}）
              </div>
              <button
                className="text-gray-400 hover:text-gray-600 text-lg"
                onClick={closeEdit}
              >
                ×
              </button>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div>
                <div className="text-xs text-gray-500 mb-1">会员账号</div>
                <div className="font-mono text-[11px] bg-gray-50 border rounded px-2 py-1 break-all">
                  {editingUser.wallet}
                </div>
              </div>

{/* 备注编辑 */}
<div>
  <label className="block text-xs font-medium text-gray-700 mb-1">
    备注
  </label>
  <textarea
    value={editRemark}
    onChange={(e) => setEditRemark(e.target.value)}
    rows={3}
    placeholder="例如：大客户、测试账号、风控观察中等说明"
    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 bg-white resize-none"
  />
</div>


              {/* 控盘模式 */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  控盘模式
                </label>
                <select
                  value={editControlMode}
                  onChange={(e) => setEditControlMode(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                >
                  <option value="normal">正常</option>
                  <option value="win">控赢</option>
                  <option value="lose">控输</option>
                  <option value="random">随机</option>
                </select>
              </div>

              {/* 资产调整 */}
              <div className="border rounded-xl p-3 bg-gray-50 space-y-3">
                <div className="text-xs font-semibold text-gray-700">
                  资产调整
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-600 mb-1">
                      币种
                    </label>
                    <select
                      value={editSymbol}
                      onChange={(e) => setEditSymbol(e.target.value)}
                      className="w-full border rounded-lg px-2 py-1.5 text-xs outline-none bg-white"
                    >
                      <option value="USDT">USDT</option>
                      <option value="BTC">BTC</option>
                      <option value="ETH">ETH</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-600 mb-1">
                      操作
                    </label>
                    <div className="flex h-8 border rounded-lg overflow-hidden text-xs bg-white">
                      <button
                        type="button"
                        onClick={() => setEditMode("add")}
                        className={`flex-1 ${
                          editMode === "add"
                            ? "bg-emerald-500 text-white"
                            : "bg-white text-gray-700"
                        }`}
                      >
                        增加
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditMode("sub")}
                        className={`flex-1 ${
                          editMode === "sub"
                            ? "bg-rose-500 text-white"
                            : "bg-white text-gray-700"
                        }`}
                      >
                        减少
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    金额（留空则不调整余额）
                  </label>
                  <input
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    placeholder="例如：100"
                    className="w-full border rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              {editError && (
                <div className="text-xs text-rose-500 bg-rose-50 border border-rose-100 rounded px-3 py-2">
                  {editError}
                </div>
              )}
            </div>
            <div className="px-5 py-3 border-t flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={closeEdit}
                disabled={editSaving}
              >
                取消
              </Button>
              <Button
                size="sm"
                className="bg-amber-400 hover:bg-amber-500 text-white text-xs"
                onClick={handleSaveEdit}
                disabled={editSaving}
              >
                {editSaving ? "保存中..." : "保存修改"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 🔔 右下角提醒弹窗 */}
      {notify && (
        <div className="fixed right-4 bottom-4 z-50 max-w-xs bg-white shadow-xl border border-gray-200 rounded-xl p-3">
          <div className="text-xs font-semibold text-gray-800 mb-1">
            🔔 后台提醒：{notify.title}
          </div>
          <div className="text-xs text-gray-700 mb-2 whitespace-pre-line">
            {notify.text}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setNotify(null)}
              className="px-3 py-1 text-[11px] rounded bg-amber-400 hover:bg-amber-500 text-white"
            >
              知道了
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
