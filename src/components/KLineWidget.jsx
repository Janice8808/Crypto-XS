import React, { useEffect, useRef } from "react";

let tvScriptLoading = false;

const KLineWidget = ({ symbol = "BINANCE:BTCUSDT", interval = "15" }) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    // 拉取后台 K 线数据（不替换 TradingView，只是对接后端）
    async function fetchKline() {
      try {
        await fetch(
          `https://pankouhoutai.shop/api/kline?symbol=${symbol.replace(
            "BINANCE:",
            ""
          )}&interval=${interval}`
        );
      } catch (e) {
        console.log("kline error", e);
      }
    }

    fetchKline();

    // TradingView 初始化
    function createWidget() {
      if (!widgetRef.current) return;
      new window.TradingView.widget({
        width: "100%",
        height: 400,
        symbol: symbol,
        interval: interval,
        container_id: widgetRef.current.id,
        locale: "cn",
        theme: "light",
        toolbar_bg: "#f1f3f6",
        hide_top_toolbar: false,
        save_image: false,
        allow_symbol_change: true,
      });
    }

    if (!window.TradingView) {
      if (!tvScriptLoading) {
        tvScriptLoading = true;
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;
        script.onload = createWidget;
        document.body.appendChild(script);
      }
    } else {
      createWidget();
    }
  }, [symbol, interval]);

  return <div ref={widgetRef} id="tradingview-widget" />;
};

export default KLineWidget;
