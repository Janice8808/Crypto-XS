// src/pages/LoginWallet.jsx
import { useEffect } from "react";

export default function LoginWallet() {

  function getNextUid() {
    let lastUid = localStorage.getItem("lastUid");

    if (!lastUid) {
      lastUid = 2001000;
    } else {
      lastUid = parseInt(lastUid, 10);
    }

    const newUid = lastUid + 1;
    localStorage.setItem("lastUid", newUid.toString());
    return newUid;
  }

  function generateGuest() {
    return {
      userId: getNextUid(),
      account: "user_" + Math.random().toString(36).substring(2, 10)
    };
  }

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    let account = localStorage.getItem("account");

    if (!userId || !account) {
      const guest = generateGuest();
      localStorage.setItem("userId", guest.userId.toString());
      localStorage.setItem("account", guest.account);
      console.log("Created new guest:", guest);
    }

    // ✔ 兼容所有钱包浏览器
    window.location.href = "/";
  }, []);

  return null;
}
