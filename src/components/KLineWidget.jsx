import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const KLineWidget = ({
  symbol = "BINANCE:BTCUSDT",
  interval = "15",
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // 转换 symbol：BINANCE:BTCUSDT → BTCUSDT
  const cleanSymbol = symbol.replace("BINANCE:", "");

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current?.remove();

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: "#FFFFFF" },
        textColor: "#222",
      },
      grid: {
        vertLines: { color: "#E6E6E6" },
        horzLines: { color: "#E6E6E6" },
      },
      timeScale: {
        borderColor: "#DDD",
      },
      rightPriceScale: {
        borderColor: "#DDD",
      },
      crosshair: { mode: 1 },
    });

    chartInstance.current = chart;

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#0ECB81",
      downColor: "#F6465D",
      borderVisible: false,
      wickUpColor: "#0ECB81",
      wickDownColor: "#F6465D",
    });

    // 多条 MA 线
    const ma5 = chart.addLineSeries({
      color: "#E3C600",
      lineWidth: 2,
    });
    const ma10 = chart.addLineSeries({
      color: "#8E5EF7",
      lineWidth: 2,
    });
    const ma30 = chart.addLineSeries({
      color: "#1C78E6",
      lineWidth: 2,
    });

    // 成交量柱状图
    const volumeSeries = chart.addHistogramSeries({
      priceFormat: { type: "volume" },
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    // 拉取你后台的 K 线数据
    async function loadKline() {
      const res = await fetch(
        `https://pankouhoutai.shop/api/kline?symbol=${cleanSymbol}&interval=${interval}`
      );
      const raw = await res.json();
      if (!raw || !Array.isArray(raw)) return;

      const kline = raw.map((i) => ({
        time: i.time,
        open: +i.open,
        high: +i.high,
        low: +i.low,
        close: +i.close,
        volume: +i.volume,
      }));

      candleSeries.setData(kline);

      ma5.setData(calcMA(kline, 5));
      ma10.setData(calcMA(kline, 10));
      ma30.setData(calcMA(kline, 30));

      volumeSeries.setData(
        kline.map((i) => ({
          time: i.time,
          value: i.volume,
          color: i.close >= i.open ? "#0ECB81" : "#F6465D",
        }))
      );
    }

    loadKline();

    return () => chart.remove();
  }, [symbol, interval]);

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", height: "400px" }}
    />
  );
};

// 计算均线
function calcMA(list, period) {
  const res = [];
  for (let i = period - 1; i < list.length; i++) {
    const avg =
      list
        .slice(i - period + 1, i + 1)
        .reduce((s, d) => s + d.close, 0) / period;
    res.push({ time: list[i].time, value: +avg.toFixed(2) });
  }
  return res;
}

export default KLineWidget;
