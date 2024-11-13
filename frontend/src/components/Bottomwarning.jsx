import { Link, useNavigate } from "react-router-dom";

export function Bottomwarning({ info, label, to }) {
  const navigate = useNavigate();
  return (
    <div className=" flex justify-center align-center p-2">
      <div className=" font-thin">{info}</div>
      <Link to={to} className="font-thin underline pl-2 cursor-pointer">
        {label}
      </Link>
    </div>
  );
}
