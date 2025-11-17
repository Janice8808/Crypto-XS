import { useNavigate } from "react-router-dom";

export default function MSBCertification() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* 顶部返回 + 标题 */}
      <div className="flex items-center p-4 border-b">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 text-xl mr-3"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold text-gray-800">
          MSB Certification
        </h1>
      </div>

      {/* 内容区 */}
      <div className="p-4">
        <div className="flex flex-col items-center space-y-6">
          {/* 第一张证书 */}
          <img
            src="/images/msb/msb1.jpg"
            alt="MSB Certification Document 1"
            className="w-full rounded-lg shadow-md"
          />

          {/* 第二张证书 */}
          <img
            src="/images/msb/msb2.jpg"
            alt="MSB Certification Document 2"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
