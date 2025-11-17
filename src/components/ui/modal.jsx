import { useEffect } from "react"

export function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-80 p-5 relative">
        {title && <h2 className="text-lg font-semibold mb-3">{title}</h2>}
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
