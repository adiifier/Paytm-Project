export function Inputbox({ label, onChange }) {
  return (
    <div className="grid grid-cols-1 p-2 pl-6 pr-6">
      <div className="col-cpan-1 font-bold">{label}</div>
      <input
        onChange={onChange}
        className="col-span-1 border-2 rounded-md"
      ></input>
    </div>
  );
}
