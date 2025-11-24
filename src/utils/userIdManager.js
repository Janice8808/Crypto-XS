// IndexedDB 保存永久地址
export async function getPermanentUserId() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("permanent_id_db", 1);

    req.onupgradeneeded = () => {
      req.result.createObjectStore("store");
    };

    req.onsuccess = () => {
      const db = req.result;
      const tx = db.transaction("store", "readwrite");
      const store = tx.objectStore("store");

      const getReq = store.get("device_user");

      getReq.onsuccess = () => {
        let id = getReq.result;

        if (!id) {
          id = generateRandomAddress();
          store.put(id, "device_user");
        }

        resolve(id);
      };
    };

    req.onerror = reject;
  });
}

function generateRandomAddress() {
  const hex = [...Array(40)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
  return "0x" + hex;
}
