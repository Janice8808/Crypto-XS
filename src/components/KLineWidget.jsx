import React, { useEffect, useRef } from "react";

let tvScriptLoading = false;

const KLineWidget = ({ symbol = "BINANCE:BTCUSDT", interval = "15" }) => {
  const containerRef = useRef(null);
  const widgetId = useRef(`tv_${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
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

    function createWidget() {
      if (!containerRef.current) return;

      new window.TradingView.widget({
        width: "100%",
        height: "100%",
        symbol,
        interval,
        container_id: widgetId.current,
        locale: "cn",
        theme: "light",
        toolbar_bg: "#f1f3f6",
        hide_top_toolbar: false,
        save_image: false,
        allow_symbol_change: true,
      });
    }

    // 确保 TV 脚本只加载一次
    if (!window.TradingView) {
      if (!tvScriptLoading) {
        tvScriptLoading = true;

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/tv.js";
        script.onload = createWidget;
        script.async = true;
        document.body.appendChild(script);
      }
    } else {
      createWidget();
    }
  }, [symbol, interval]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "400px" }}
    >
      <div id={widgetId.current} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default KLineWidget;
