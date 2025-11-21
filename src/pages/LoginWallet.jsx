// src/pages/LoginWallet.jsx
import { useEffect } from "react";

export default function LoginWallet() {

  // 获取递增 UID：从 2001001 开始
  function getNextUid() {
    // 已生成过的最大 UID
    let lastUid = localStorage.getItem("lastUid");

    if (!lastUid) {
      // 第一次进入网站
      lastUid = 2001000;
    } else {
      lastUid = parseInt(lastUid, 10);
    }

    const newUid = lastUid + 1;

    // 记录新的 UID，供下次给别人用
    localStorage.setItem("lastUid", newUid.toString());

    return newUid;
  }

  // 生成访客账号
  function generateGuest() {
    return {
      userId: getNextUid(), // 关键点：从 2001001 开始递增
      account: "user_" + Math.random().toString(36).substring(2, 10)
    };
  }

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    let account = localStorage.getItem("account");

    // 新用户：创建访客账号
    if (!userId || !account) {
      const guest = generateGuest();
      localStorage.setItem("userId", guest.userId.toString());
      localStorage.setItem("account", guest.account);
      console.log("Created new guest:", guest);
    }

    // 直接跳首页
    window.location.replace("/");
  }, []);

  return null;
}
