export default function CategoryPill({ label }) {
  return (
    <button className="px-3 py-1 rounded-full border text-sm hover:bg-gray-100">
      {label}
    </button>
  );
}
