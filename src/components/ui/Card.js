export default function Card({ title, children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border bg-white shadow-sm p-4 hover:shadow-md transition ${className}`}
    >
      {title && (
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      )}
      {children}
    </div>
  );
}
