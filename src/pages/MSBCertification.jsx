import { useNavigate } from "react-router-dom";

export default function MSBCertification() {
  const navigate = useNavigate();

  // 智能返回函数
  const handleBack = () => {
    console.log('=== MSB页面返回调试 ===');
    console.log('1. history.length:', window.history.length);
    console.log('2. 当前路径:', window.location.pathname);
    
    // 检查是否是从 UserCenter 跳转过来的
    const referrer = document.referrer;
    console.log('3. 来源页面:', referrer);
    
    // 智能判断逻辑
    if (window.history.length > 2 && referrer.includes('/user')) {
      console.log('4. 从UserCenter跳转过来，执行 navigate(-1)');
      navigate(-1);
    } else {
      console.log('4. 直接打开或来源不明，执行 navigate("/user")');
      navigate("/user", { replace: true });
    }
  }

  // 无焦点样式
  const noFocusStyle = {
    outline: 'none',
    boxShadow: 'none',
    border: 'none',
    WebkitTapHighlightColor: 'transparent'
  }

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* 自定义 Header 包含返回键 */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center h-12">
          {/* 左侧返回键 - 使用智能返回 */}
          <button
            onClick={handleBack}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              color: "#666",
              width: "45px",
              textAlign: "left",
              paddingLeft: "12px",
              ...noFocusStyle
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