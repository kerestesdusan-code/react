import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

export default function AppLayout() {
  return (
    <div>
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <Outlet />
      </div>
    </div>
  );
}
