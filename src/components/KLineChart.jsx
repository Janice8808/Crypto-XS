import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function KLineChart({ data, onPrice }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current?.remove();

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 380,
      layout: {
        background: { color: "#FFFFFF" },
        textColor: "#222",
      },
      grid: {
        vertLines: { color: "#E6E6E6" },
        horzLines: { color: "#E6E6E6" },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: "#DDD",
      },
      timeScale: {
        borderColor: "#DDD",
      },
    });

    chartInstance.current = chart;

    // ========== 蜡烛图 ==========
    const candle = chart.addCandlestickSeries({
      upColor: "#0ECB81",
      downColor: "#F6465D",
      borderVisible: false,
      wickUpColor: "#0ECB81",
      wickDownColor: "#F6465D",
    });

    candle.setData(data);

    // ========== 均线 MA5/10/30 ==========
    const ma5 = chart.addLineSeries({ color: "#E3C600", lineWidth: 2 });
    ma5.setData(calcMA(data, 5));

    const ma10 = chart.addLineSeries({ color: "#8E5EF7", lineWidth: 2 });
    ma10.setData(calcMA(data, 10));

    const ma30 = chart.addLineSeries({ color: "#1C78E6", lineWidth: 2 });
    ma30.setData(calcMA(data, 30));

    // ========== 成交量 ==========
    const volume = chart.addHistogramSeries({
      priceFormat: { type: "volume" },
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    volume.setData(
      data.map((d) => ({
        time: d.time,
        value: d.volume,
        color: d.close >= d.open ? "#0ECB81" : "#F6465D",
      }))
    );

    // 回调价格（替代 TradingView.onPrice）
    candle.subscribePriceScale((price) => {
      if (onPrice && price?.close) {
        onPrice(price.close);
      }
    });

    return () => chart.remove();
  }, [data]);

  return (
<div
  ref={chartRef}
  style={{
    width: "100%",
    height: "100%",
    position: "relative",
    outline: "none",
  }}
  className="kline-container"
/>

  );
}

// ========== MA 均线计算 ==========
function calcMA(list, period) {
  const result = [];
  for (let i = period - 1; i < list.length; i++) {
    const slice = list.slice(i - period + 1, i + 1);
    const avg =
      slice.reduce((s, d) => s + d.close, 0) / slice.length;

    result.push({
      time: list[i].time,
      value: +avg.toFixed(2),
    });
  }
  return result;
}
