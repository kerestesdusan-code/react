import { Menu } from "./Menu";
import { useAuth } from "../auth/AuthContext";
import UserBadge from "./UserBadge";

export function NavBar() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start" />

      <div className="navbar-center">
        <Menu />
      </div>

      <div className="navbar-end">
        {isLoggedIn && <UserBadge />}
      </div>
    </div>
  );
}
