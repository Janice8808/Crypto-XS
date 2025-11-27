import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function EditWithdrawalPassword() {
  const navigate = useNavigate();

  // 无焦点样式配置 - 只用于按钮
  const noFocusStyle = {
    outline: 'none',
    boxShadow: 'none',
    border: 'none',
    WebkitTapHighlightColor: 'transparent'
  }

  // 可以移除 preventDefault 函数，因为全局事件委托会处理
  // const preventDefault = (e) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  // }

  const [oldPwd, setOldPwd] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);

  const save = async () => {
    if (!oldPwd || !pwd || !confirm) {
      alert("Please fill in all fields");
      return;
    }
    if (pwd !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://pankouhoutai.shop/api/withdrawal-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          oldPassword: oldPwd,
          password: pwd,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setPopup(true);

        // ⭐ 通知 ChangePassword 刷新「Already set」
        window.dispatchEvent(new CustomEvent("refreshData"));

        setTimeout(() => {
          setPopup(false);
          navigate(-1);
        }, 1200);
      } else {
        alert(data.message || data.error || "Failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative">

      {/* 顶部导航 - 已修改 */}
      <div className="flex items-center h-14 px-3 border-b border-gray-200">
        <button 
          className="back-btn p-1" // 合并 className
          onClick={() => navigate(-1)} 
          style={noFocusStyle}
          // 移除 onMouseDown 和 onTouchStart
        >
          <ChevronLeft size={22} />
        </button>
        <div className="flex-1 text-center text-lg font-medium">
          Edit Withdrawal Password
        </div>
        <div className="w-6" />
      </div>

      {/* 输入区域 */}
      <div className="px-4 mt-5 space-y-4">

        <input
          type="password"
          placeholder="Old password"
          className="w-full border border-gray-300 rounded-xl p-3 text-base bg-gray-50"
          value={oldPwd}
          onChange={(e) => setOldPwd(e.target.value)}
        />

        <input
          type="password"
          placeholder="New password"
          className="w-full border border-gray-300 rounded-xl p-3 text-base bg-gray-50"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm new password"
          className="w-full border border-gray-300 rounded-xl p-3 text-base bg-gray-50"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {/* 保存按钮 - 已修改 */}
        <button
          className="confirm-btn w-full bg-[#31C48D] text-white rounded-xl py-3 text-base active:opacity-70 disabled:opacity-40" // 合并 className
          disabled={loading}
          onClick={save}
          style={noFocusStyle}
          // 移除 onMouseDown 和 onTouchStart
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      {/* 成功弹窗 */}
      {popup && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl px-10 py-6 shadow-lg text-center">
            <div className="text-lg font-semibold text-[#31C48D]">
              Saved Successfully
            </div>
          </div>
        </div>
      )}
    </div>
  );
}