import { useNavigate } from "react-router-dom";

export default function Header({ title }) {
  const navigate = useNavigate();

  return (
    <div
      className="
        fixed top-0 left-0 right-0
        bg-white
        border-b
        z-50
      "
      style={{
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <div className="flex items-center p-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-700 text-2xl mr-3 leading-none"
        >
          ←
        </button>

        {title && (
          <h1 className="text-lg font-semibold text-gray-800">
            {title}
          </h1>
        )}
      </div>
    </div>
  );
}
