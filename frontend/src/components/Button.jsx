export function Button({ label, onClick }) {
  return (
    <div className="p-3">
      <button
        onClick={onClick}
        className="bg-blue1 text-white rounded font-bold w-full h-10"
      >
        {label}
      </button>
    </div>
  );
}
