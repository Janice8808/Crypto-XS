import { useNavigate } from "react-router-dom";

export default function Header({ title }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center p-4 bg-white border-b">
      <button
        onClick={() => navigate(-1)}
        className="text-gray-600 text-2xl mr-3 leading-none"
      >
        ←
      </button>

      {title && (
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      )}
    </div>
  );
}
