import { Link } from "react-router-dom";
import myFoto from "../assets/my-foto.png";

export default function ProfileBadge() {
  return (
    <Link
      to="/"
      className="fixed top-6 left-6 z-40 flex items-center gap-4
                 bg-white px-4 py-3 rounded-2xl shadow-lg
                 hover:shadow-xl transition"
    >
      <img
        src={myFoto}
        alt="Dušan Keresteš"
        className="w-12 h-12 rounded-full border-2 border-indigo-500"
      />

      <div className="leading-tight">
        <div className="font-semibold text-gray-900">Dušan Keresteš</div>
        <div className="text-xs text-gray-500">Full-stack Developer</div>
      </div>
    </Link>
  );
}
