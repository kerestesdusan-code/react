import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../auth/AuthContext";

type GroupRow = {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
  memberCount: number;
  isMember: boolean;
};

type GroupsResponse = {
  group: GroupRow[];
};

type MemberRow = {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  joinedAt: string;
};

type MembersResponse = {
  members: MemberRow[];
};

export default function Groups() {
  const { isLoggedIn, user } = useAuth();

  const [groups, setGroups] = useState<GroupRow[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [members, setMembers] = useState<MemberRow[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // create
  const [newGroupName, setNewGroupName] = useState("");

  // rename
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  const selectedGroup = useMemo(
    () => groups.find((g) => g.id === selectedGroupId) || null,
    [groups, selectedGroupId]
  );

  const isOwnerOfSelected = useMemo(() => {
    if (!selectedGroup || !user) return false;
    return selectedGroup.ownerId === user.id;
  }, [selectedGroup, user]);

  async function loadGroups() {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axiosInstance.get<GroupsResponse>("/group");
      const list = res.data.group || [];

      setGroups(list);

      if (!selectedGroupId && list.length > 0) {
        setSelectedGroupId(list[0].id);
      }
      
    } catch (e: any) {
      setError(e?.response?.data?.error || "Failed to load groups.");
    } finally {
      setLoading(false);
    }
  }

  async function loadMembers(groupId: string) {
    setLoadingMembers(true);
    setError("");
    try {
      const res = await axiosInstance.get<MembersResponse>(`/group/${groupId}/members`);
      setMembers(res.data.members || []);
    } catch (e: any) {
      setError(e?.response?.data?.error || "Failed to load members.");
      setMembers([]);
    } finally {
      setLoadingMembers(false);
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      setGroups([])
      setSelectedGroupId(null);
      setMembers([]);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!selectedGroupId) return;
    loadMembers(selectedGroupId);
  }, [selectedGroupId]);

  async function createGroup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!newGroupName.trim()) {
      setError("Group name is required");
      return;
    }

    try {
      await axiosInstance.post("/group", { name: newGroupName.trim() });
      setMessage("Group created");
      setNewGroupName("");
      await loadGroups();
    } catch (e: any) {
      setError(e?.response?.data?.error || "Failed to create group.");
    }
  }

  async function joinGroup(groupId: string) {
    setError("");
    setMessage("");
    try {
      await axiosInstance.post("/group/join", { groupId });
      setMessage("Joined group");
      await loadGroups();
      if (selectedGroupId === groupId) await loadMembers(groupId);
    } catch (e: any) {
      setError(e?.response?.data?.error || "Failed to join group.");
    }
  }

  async function leaveGroup(groupId: string) {
    setError("");
    setMessage("");
    try {
      await axiosInstance.post("/group/leave", { groupId });
      setMessage("Left group");
      await loadGroups();
      if (selectedGroupId === groupId) await loadMembers(groupId);
    } catch (e: any) {
      setError(e?.response?.data?.error || "Failed to leave group.");
    }
  }

  function openRename(group: GroupRow) {
    setSelectedGroupId(group.id);
    setRenameValue(group.name);
    setRenameOpen(true);
  }

  async function renameGroup(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedGroup) return;

    setError("");
    setMessage("");

    if (!renameValue.trim()) {
      setError("Group name is required");
      return;
    }

    try {
      await axiosInstance.put(`/group/${selectedGroup.id}`, { name: renameValue.trim() });
      setMessage("Group renamed");
      setRenameOpen(false);
      await loadGroups();
    } catch (e: any) {
      setError(e?.response?.data?.error || "Failed to rename group.");
    }
  }

  async function kickMember(memberId: string) {
    if (!selectedGroup) return;
    if (!window.confirm("Kick this member from the group?")) return;

    setError("");
    setMessage("");

    try {
      await axiosInstance.delete(`/group/${selectedGroup.id}/member/${memberId}`);
      setMessage("Member kicked");
      await loadMembers(selectedGroup.id);
      await loadGroups(); // refresh memberCount
    } catch (e: any) {
      setError(e?.response?.data?.error || "Failed to kick member.");
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-2">Groups</h1>
        <p className="text-gray-600">Please login first.</p>
      </div>
    );
  }

  if (loading) return <div className="max-w-5xl mx-auto p-4">Loading…</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Groups</h1>
        <button className="btn btn-outline btn-sm" onClick={loadGroups} type="button">
          Refresh
        </button>
      </div>

      {error && (
        <div className="p-3 rounded border border-red-300 bg-red-50 text-red-700">{error}</div>
      )}
      {message && (
        <div className="p-3 rounded border border-green-300 bg-green-50 text-green-700">
          {message}
        </div>
      )}

      {/* Create group */}
      <section className="p-4 rounded-lg border bg-white space-y-3">
        <h2 className="text-xl font-semibold">Create group</h2>
        <form onSubmit={createGroup} className="flex flex-col sm:flex-row gap-2 max-w-xl">
          <input
            className="input input-bordered flex-1"
            placeholder="Group name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Create
          </button>
        </form>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Groups list */}
        <section className="p-4 rounded-lg border bg-white space-y-3">
          <h2 className="text-xl font-semibold">All groups</h2>

          <div className="space-y-2">
            {groups.map((g) => {
              const isOwner = user?.id === g.ownerId;
              const isSelected = g.id === selectedGroupId;

              return (
                <div
                  key={g.id}
                  className={`p-3 rounded border flex items-center justify-between gap-3 ${
                    isSelected ? "border-primary" : "border-base-300"
                  }`}
                >
                  <button
                    className="text-left flex-1 min-w-0"
                    type="button"
                    onClick={() => setSelectedGroupId(g.id)}
                    title="Show members"
                  >
                    <div className="font-semibold truncate">{g.name}</div>
                    <div className="text-sm text-gray-600">
                      members: {g.memberCount} • {isOwner ? "owner" : "member"}
                      {g.isMember ? "" : " (not joined)"}
                    </div>
                  </button>

                  <div className="flex gap-2">
                    {g.isMember ? (
                      <button className="btn btn-sm" onClick={() => leaveGroup(g.id)} type="button">
                        Leave
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => joinGroup(g.id)}
                        type="button"
                      >
                        Join
                      </button>
                    )}

                    {isOwner && (
                      <button
                        className="btn btn-sm btn-outline"
                        type="button"
                        onClick={() => openRename(g)}
                      >
                        Rename
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Members */}
        <section className="p-4 rounded-lg border bg-white space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Members</h2>
            {selectedGroup && (
              <div className="text-sm text-gray-600">
                <b>{selectedGroup.name}</b>
              </div>
            )}
          </div>

          {!selectedGroup && <p className="text-gray-600">Select a group to see members.</p>}

          {selectedGroup && (
            <>
              {loadingMembers ? (
                <p className="text-gray-600">Loading members…</p>
              ) : (
                <div className="space-y-2">
                  {members.map((m) => {
                    const isMe = user?.id === m.id;
                    return (
                      <div
                        key={m.id}
                        className="p-3 rounded border border-base-300 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {m.avatarUrl ? (
                            <img
                              src={m.avatarUrl}
                              alt="avatar"
                              className="w-9 h-9 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-gray-200 grid place-items-center">
                              🙂
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="font-semibold truncate">
                              {m.fullName || "(no name)"}{" "}
                              {isMe ? <span className="text-xs text-gray-500">(you)</span> : null}
                            </div>
                            <div className="text-sm text-gray-600 truncate">{m.email}</div>
                          </div>
                        </div>

                        {isOwnerOfSelected && !isMe && (
                          <button
                            className="btn btn-sm btn-error"
                            type="button"
                            onClick={() => kickMember(m.id)}
                          >
                            Kick
                          </button>
                        )}
                      </div>
                    );
                  })}

                  {members.length === 0 && (
                    <p className="text-gray-600">No members (yet).</p>
                  )}
                </div>
              )}
            </>
          )}
        </section>
      </div>

      {renameOpen && selectedGroup && (
        <section className="p-4 rounded-lg border bg-white space-y-3">
          <h2 className="text-xl font-semibold">Rename group</h2>

          <form onSubmit={renameGroup} className="flex flex-col sm:flex-row gap-2 max-w-xl">
            <input
              className="input input-bordered flex-1"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => setRenameOpen(false)}
            >
              Cancel
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
