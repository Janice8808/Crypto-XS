// src/utils/deviceId.js

// IndexedDB 存储（不会被清除）
export function saveToIndexedDB(uid) {
  return new Promise((resolve) => {
    const request = indexedDB.open("DEVICE_UID_DB", 1);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("kv")) {
        db.createObjectStore("kv");
      }
    };

    request.onsuccess = (e) => {
      const db = e.target.result;
      const tx = db.transaction("kv", "readwrite");
      tx.objectStore("kv").put(uid, "DEVICE_UID");
      tx.oncomplete = resolve;
    };
  });
}

export function loadFromIndexedDB() {
  return new Promise((resolve) => {
    const request = indexedDB.open("DEVICE_UID_DB", 1);

    request.onsuccess = (e) => {
      const db = e.target.result;
      const tx = db.transaction("kv", "readonly");
      const req = tx.objectStore("kv").get("DEVICE_UID");
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    };

    request.onerror = () => resolve(null);
  });
}


// ⭐ 生成一个本地 UID
function randomDeviceId() {
  const hex = [...Array(40)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

  return "dev_" + hex;
}


// ⭐ 前端统一获取永久 deviceId
export async function getPermanentDeviceId() {
  // 1) LocalStorage
  let uid = localStorage.getItem("local_device_id");
  if (uid) return uid;

  // 2) IndexedDB
  uid = await loadFromIndexedDB();
  if (uid) {
    localStorage.setItem("local_device_id", uid);
    return uid;
  }

  // 3) 生成新的 UID
  uid = randomDeviceId();

  // 保存两份
  localStorage.setItem("local_device_id", uid);
  saveToIndexedDB(uid);

  return uid;
}
