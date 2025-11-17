import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function BuyCrypto1() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 顶部返回与标题 */}
      <div className="flex items-center px-4 py-3 bg-white border-b">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 text-2xl mr-3"
        >
          ←
        </button>
        <h1 className="text-gray-800 font-semibold text-lg">Buy Crypto</h1>
      </div>

      {/* 币种选择框 */}
      <div className="mt-4 bg-white">
        <div
          onClick={() => navigate("/wallet")}
          className="flex justify-between items-center px-4 py-4 border-b cursor-pointer hover:bg-gray-100"
        >
          <span className="font-semibold text-gray-800">Money</span>
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 font-semibold">USDT</span>
            <span className="text-gray-500 text-lg">›</span>
          </div>
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-50 border-t py-4 px-4">
        <Button
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-3 rounded-lg"
          onClick={() => alert("Submit order")}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
