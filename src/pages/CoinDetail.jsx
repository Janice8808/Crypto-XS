import React from "react";
import { useParams } from "react-router-dom";

const CoinDetail = () => {
  const { symbol } = useParams();

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
        {symbol?.toUpperCase()} Detail
      </h2>
      <p style={{ marginTop: "10px", color: "#666" }}>
        This is a placeholder page. You can add K-line, depth, or info later.
      </p>
    </div>
  );
};

export default CoinDetail;
