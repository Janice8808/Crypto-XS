import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithdrawList } from "@/api/user";
import { useTranslation } from "react-i18next";

export default function DeFiRecord() {
  const nav = useNavigate();
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

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecords();
  }, []);

  async function loadRecords() {
    try {
      const list = await fetchWithdrawList();
      setRecords(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const formatTime = (ts) => {
    if (!ts) return "-";
    return new Date(ts).toLocaleString();
  };

  return (
    <div className="w-full min-h-screen bg-white text-black">

      {/* 顶部导航 - 已修改 */}
      <div className="flex items-center px-4 py-3 bg-white shadow-sm">
        <button
          className="back-btn" // 添加 back-btn class
          onClick={() => window.history.back()}
          style={{
            ...noFocusStyle,
            background: "none",
            fontSize: 20,
            color: "#666",
            width: "45px",
            textAlign: "left",
            paddingLeft: "12px",
          }}
          // 移除 onMouseDown 和 onTouchStart，因为全局事件委托会处理
        >
          ←
        </button>

        <span className="text-lg font-medium">{t("Record")}</span>
      </div>

      {/* 表头 */}
      <div className="flex justify-between px-4 py-3 text-gray-600 text-sm border-b">
        <span>{t("Symbol")}</span>
        <span>{t("Time")}</span>
      </div>

      {/* 加载中 */}
      {loading && (
        <div className="text-center text-gray-400 mt-10">{t("Loading")}...</div>
      )}

      {/* 无记录 */}
      {!loading && records.length === 0 && (
        <div className="text-center text-gray-400 mt-10">
          {t("No withdrawal record")}
        </div>
      )}

      {/* 有记录 */}
      {!loading &&
        records.length > 0 &&
        records.map((r) => (
          <div
            key={r.id}
            className="flex justify-between px-4 py-3 border-b text-sm text-gray-800"
          >
            <div>
              <div>{r.symbol}</div>
              <div className="text-xs text-gray-500">{r.amount}</div>
            </div>
            <div className="text-xs text-gray-500">{formatTime(r.createdAt)}</div>
          </div>
        ))}
    </div>
  );
}