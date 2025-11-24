import Header from "@/components/Header";

export default function MSBCertification() {
  return (
    <div className="min-h-screen bg-white pb-10">

      {/* 全局统一返回头部 */}
      <Header title="MSB Certification" />

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
