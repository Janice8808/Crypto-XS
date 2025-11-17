export function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-2xl shadow-sm ${className}`}>{children}</div>
}

export function CardHeader({ children, className = "" }) {
  return <div className={`px-4 pt-4 ${className}`}>{children}</div>
}

export function CardTitle({ children, className = "" }) {
  return <h3 className="text-lg font-semibold">{children}</h3>
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>
}
