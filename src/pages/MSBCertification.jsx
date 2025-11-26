import Header from "@/components/Header";

export default function MSBCertification() {
  return (
    <div className="min-h-screen bg-white pb-10">

      {/* 自定义 Header 包含返回键 */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center h-12">
          {/* 左侧返回键 - 绝对贴左 */}
          <button
            onClick={() => window.history.back()}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              color: "#666",
              width: "45px",
              textAlign: "left",
              paddingLeft: "12px",
            }}
          >
            ←
          </button>
          
          {/* 标题居中 */}
          <div className="flex-1 text-center font-medium text-gray-900 pr-12">
            MSB Certification
          </div>
        </div>
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