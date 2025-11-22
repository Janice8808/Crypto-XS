// src/pages/Notice.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Notice() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAndMark() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setList([]);
          setLoading(false);
          return;
        }

        // 1️⃣ 读取通知列表
        const r = await fetch("https://pankouhoutai.shop/api/notice/list", {
          headers: { Authorization: "Bearer " + token }
        });
        const j = await r.json();
        setList(j);

        // 2️⃣ 读取后标记已读
        await fetch("https://pankouhoutai.shop/api/notice/read", {
          method: "POST",
          headers: { Authorization: "Bearer " + token }
        });

        // 3️⃣ 通知首页 unread=0
        window.dispatchEvent(new Event("notice-read"));

      } catch (err) {
        console.log("notice error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAndMark();
  }, []);

  return (
    <div className="w-full h-screen bg-[#101018] text-white flex flex-col">

      {/* 顶部导航 */}
      <div className="flex items-center px-4 py-3 bg-[#0F0F12] text-white">
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-white bg-transparent"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <span className="flex-1 text-center text-base">Notice</span>
        <span className="w-[22px]"></span>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto px-4 py-3">

        {/* 加载中 */}
        {loading && (
          <div className="text-center text-gray-400 mt-10">Loading...</div>
        )}

        {/* 无通知 */}
        {!loading && list.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No notification record
          </div>
        )}

        {/* 有通知 */}
        {!loading && list.length > 0 && (
          <div className="space-y-3">
            {list.map((n, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#1A1A1F] rounded-lg border border-[#222]"
              >
                <div className="text-sm font-semibold mb-1">
                  {n.title || "Notice"}
                </div>
                <div className="text-xs text-gray-300">{n.content}</div>
                <div className="text-[10px] text-gray-500 mt-2">
                  {new Date(n.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
