export function Button({ children, className = "", variant = "default", ...props }) {
  const base =
    "px-3 py-2 rounded-lg font-medium transition-colors text-sm flex items-center justify-center focus:outline-none focus:ring-0 focus-visible:ring-0 active:outline-none active:ring-0"

  const variants = {
    default: "bg-yellow-400 hover:bg-yellow-500 text-white",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
