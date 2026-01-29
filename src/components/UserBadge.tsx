import { useAuth } from "../auth/AuthContext";

export default function UserBadge() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow">
      <div className="relative">
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
          {(user?.fullName || user?.email || "?")[0].toUpperCase()}
        </div>
        <span className="absolute -right-1 -bottom-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
      </div>

      <div className="text-sm">
        <div className="font-medium">{user?.fullName || "(no name)"}</div>
        <div className="text-gray-500">{user?.email}</div>
      </div>

      <button className="btn btn-sm btn-outline ml-2" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
