import { useEffect, useState } from "react";

export function usePrices() {
  const [list, setList] = useState([]);

  const load = async () => {
    try {
      const res = await fetch("https://pankouhoutai.shop/api/prices");
      const data = await res.json();
      setList(data);
    } catch {}
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 3000); // 每 3 秒刷新
    return () => clearInterval(t);
  }, []);

  return list;
}
