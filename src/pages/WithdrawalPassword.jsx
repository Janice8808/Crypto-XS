import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function WithdrawalPassword() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSettingNew, setIsSettingNew] = useState(true);

  // 检查用户是否已经设置过提现密码
  useEffect(() => {
    const checkPasswordStatus = async () => {
      try {
        const res = await fetch("https://pankouhoutai.shop/api/userinfo", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await res.json();
        setIsSettingNew(!data.withdrawPasswordSet);
      } catch (err) {
        console.error("检查密码状态失败:", err);
      }
    };
    
    checkPasswordStatus();
  }, []);

  const handleSubmit = async () => {
    console.log("Submit clicked");
    
    if (!password || !confirm) {
      alert(t("Please fill in all fields"));
      return;
    }
    if (password !== confirm) {
      alert(t("Passwords do not match"));
      return;
    }

    try {
      setLoading(true);
      console.log("Sending request...");

      const token = localStorage.getItem("token");
      
      // 构建请求数据
      const requestData = isSettingNew 
        ? { password, action: "set" }  // 设置新密码
        : { password, action: "modify" }; // 修改密码（需要旧密码，但这里应该跳转到修改页面）

      // 如果是修改密码但用户误入此页面，提示并跳转
      if (!isSettingNew) {
        alert(t("Password already set, please use modify password page"));
        navigate("/user/withdrawal-password/edit");
        return;
      }

      const res = await fetch("https://pankouhoutai.shop/api/withdrawal-password", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(requestData),
      });

      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response data:", data);

      if (res.ok && data.success) {
        console.log("Success! Showing dialog...");
        setShowSuccess(true);
      } else {
        const errorMsg = data.message || data.error || t("Failed to set password");
        console.error("API Error:", errorMsg);
        alert(errorMsg);
      }
    } catch (err) {
      console.error("Network error:", err);
      alert(t("Network error, please try again later"));
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    console.log("Success dialog closed");
    setShowSuccess(false);

    // 触发全局刷新
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("refreshData", {
        detail: { source: "withdrawalPassword" }
      }));
    }, 100);

    // 导航返回
    setTimeout(() => {
      navigate(-1);
    }, 150);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-white relative" onKeyPress={handleKeyPress}>
      {/* 顶部 - 已修改 */}
      <div className="flex items-center p-4 border-b">
        <button
          className="back-btn text-xl text-gray-600 active:scale-90 focus:outline-none" // 添加 back-btn class
          onClick={() => navigate(-1)}
          style={{ 
            ...noFocusStyle,
            background: "none", 
            padding: 0, 
            marginRight: "8px" 
          }}
          // 移除 onMouseDown 和 onTouchStart
        >
          ←
        </button>
        <h1 className="text-lg font-semibold text-gray-800">
          {isSettingNew ? t("Set Withdrawal Password") : t("Change Password")}
        </h1>
      </div>

      {/* 内容 */}
      <div className="p-5">
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            {t("New password")}
          </label>
          <input
            type="password"
            placeholder={t("Please enter a new password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            autoComplete="new-password"
          />
        </div>

        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">
            {t("Confirm password")}
          </label>
          <input
            type="password"
            placeholder={t("Please enter the confirmation password")}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            autoComplete="new-password"
          />
        </div>

        {/* 提交按钮 - 已修改 */}
        <Button
          className="confirm-btn w-full rounded-lg py-3 text-white transition-colors" // 添加 confirm-btn class
          onClick={handleSubmit}
          disabled={loading || !password || !confirm}
          style={noFocusStyle}
          // 移除 onMouseDown 和 onTouchStart
        >
          {loading ? t("Submitting") : (isSettingNew ? t("Set Password") : t("Submit"))}
        </Button>
      </div>

      {/* 成功弹窗 - 已修改 */}
      {showSuccess && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleSuccessClose();
            }
          }}
        >
          <div className="bg-white w-64 rounded-xl shadow-lg p-5 text-center animate-scale-in">
            <div className="text-green-500 text-4xl mb-3">✓</div>
            <div className="text-lg font-semibold mb-2">{t("Saved Successfully")}</div>
            <p className="text-gray-600 mb-4">{t("Your password has been updated.")}</p>

            <button
              className="confirm-btn w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 rounded-lg transition-colors active:scale-95" // 添加 confirm-btn class
              onClick={handleSuccessClose}
              autoFocus
              style={noFocusStyle}
              // 移除 onMouseDown 和 onTouchStart
            >
              {t("OK")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}