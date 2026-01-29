import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../auth/AuthContext"; 

type GroupMini = { id: string; name: string };

type MeUser = {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  isVerified: boolean;
  group: GroupMini[];
};

type UserRow = {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl?: string | null;
  createdAt: string;
  group: GroupMini[];
};

export default function Users() {
  const { isLoggedIn } = useAuth();

  const [me, setMe] = useState<MeUser | null>(null);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [isEditing, setIsEditing] = useState(false);

  // forms
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function loadAll() {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const [meRes, usersRes] = await Promise.all([
        axiosInstance.get<{ user: MeUser }>("/auth/me"),
        axiosInstance.get<UserRow[]>("/user"),
      ]);

      setMe(meRes.data.user);
      setUsers(usersRes.data);

      setFullName(meRes.data.user.fullName || "");
      setEmail(meRes.data.user.email || "");
      setAvatarUrl(meRes.data.user.avatarUrl || "");
    } catch (e: any) {
      setError(e?.response?.data?.error || e?.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isLoggedIn) return;
    loadAll();
  }, [isLoggedIn]);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axiosInstance.put("/user/me", { fullName, email });
      setMessage(res.data?.message || "Profile updated");
      await loadAll();
      setIsEditing(false);
    } catch (e: any) {
      setError(e?.response?.data?.error || "Failed to update profile.");
    }
  }

  async function saveAvatar(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axiosInstance.put("/user/me/avatar", { avatarUrl });
      setMessage(res.data?.message || "Avatar updated");
      await loadAll();
      setIsEditing(false);
    } catch (e: any) {
      setError(e?.response?.data?.error || "Failed to update avatar.");
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axiosInstance.put("/user/me/password", {
        oldPassword,
        newPassword,
      });
      setMessage(res.data?.message || "Password updated");
      setOldPassword("");
      setNewPassword("");
      setIsEditing(false);
    } catch (e: any) {
      setError(e?.response?.data?.error || "Failed to update password.");
    }
  }

  async function deleteMyAccount() {
    if (!me?.id) return;
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    setError("");
    setMessage("");

    try {
      await axiosInstance.delete(`/user/${me.id}`);
      setMessage("Account deleted. Please login/register again.");
    } catch (e: any) {
      setError(e?.response?.data?.error || "Delete failed.");
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-2">Users</h1>
        <p className="text-gray-600">Please login first.</p>
      </div>
    );
  }

  if (loading) return <div className="max-w-4xl mx-auto p-4">Loading…</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Users</h1>

      {error && (
        <div className="p-3 rounded border border-red-300 bg-red-50 text-red-700">
          {error}
        </div>
      )}
      {message && (
        <div className="p-3 rounded border border-green-300 bg-green-50 text-green-700">
          {message}
        </div>
      )}

      {/* My profile */}
      {me && (
        <section className="p-4 rounded-lg border bg-white space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">My profile</h2>

            <button
              className="btn btn-outline btn-sm"
              type="button"
              onClick={() => setIsEditing((v) => !v)}
            >
              {isEditing ? "Close" : "Edit"}
            </button>
          </div>

          {/* always visible summary */}
          <div className="flex items-center gap-3">
            {me.avatarUrl ? (
              <img
                src={me.avatarUrl}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 grid place-items-center">
                🙂
              </div>
            )}
            <div className="min-w-0">
              <div className="font-semibold truncate">{me.fullName || "(no name)"}</div>
              <div className="text-sm text-gray-600 truncate">{me.email}</div>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <b>My groups:</b> {me.group.map((g) => g.name).join(", ") || "-"}
          </div>

          {/* edit panel */}
          {isEditing && (
            <>
              <form onSubmit={saveProfile} className="grid gap-3 max-w-md">
                <label className="grid gap-1">
                  <span className="text-sm text-gray-600">Full name</span>
                  <input
                    className="input input-bordered"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </label>

                <label className="grid gap-1">
                  <span className="text-sm text-gray-600">Email</span>
                  <input
                    className="input input-bordered"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>

                <div className="flex gap-2">
                  <button className="btn btn-primary w-fit" type="submit">
                    Save profile
                  </button>
                  <button
                    className="btn btn-ghost w-fit"
                    type="button"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>

              <form onSubmit={saveAvatar} className="grid gap-3 max-w-md">
                <label className="grid gap-1">
                  <span className="text-sm text-gray-600">Avatar URL</span>
                  <input
                    className="input input-bordered"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                  />
                </label>

                <div className="flex gap-2">
                  <button className="btn btn-secondary w-fit" type="submit">
                    Save avatar
                  </button>
                  <button
                    className="btn btn-ghost w-fit"
                    type="button"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>

              <form onSubmit={changePassword} className="grid gap-3 max-w-md">
                <label className="grid gap-1">
                  <span className="text-sm text-gray-600">Old password</span>
                  <input
                    type="password"
                    className="input input-bordered"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </label>

                <label className="grid gap-1">
                  <span className="text-sm text-gray-600">New password</span>
                  <input
                    type="password"
                    className="input input-bordered"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </label>

                <div className="flex gap-2">
                  <button className="btn btn-accent w-fit" type="submit">
                    Change password
                  </button>
                  <button
                    className="btn btn-ghost w-fit"
                    type="button"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>

              <div className="pt-2">
                <button className="btn btn-error w-fit" type="button" onClick={deleteMyAccount}>
                  Delete my account
                </button>
              </div>
            </>
          )}
        </section>
      )}

      {/* All users */}
      <section className="p-4 rounded-lg border bg-white">
        <h2 className="text-xl font-semibold mb-3">All users</h2>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Full name</th>
                <th>Email</th>
                <th>Groups</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.fullName || "(no name)"}</td>
                  <td>{u.email}</td>
                  <td>{(u.group || []).map((g) => g.name).join(", ") || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
