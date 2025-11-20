import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";

interface User {
  id: number;
  email: string;
  fullName: string;
  createdAt?: string;
}

interface UserListItemProps {
  user: User;
  onUpdate: (updateData: { fullName?: string; email?: string }) => void;
}

const UserListItem = ({ user, onUpdate }: UserListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const navigate = useNavigate();

  const handleSave = () => {
    onUpdate({ fullName, email });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      // DELETE http://localhost:3001/api/users/:id
      await axiosInstance.delete(`users/${user.id}`);
      alert("User deleted successfully");
      navigate("/projects/users-list");
    } catch (error) {
      console.error("Error deleting user", error);
      alert("Error deleting user");
    }
  };

  return (
    <li className="bg-white rounded-lg shadow p-4 flex justify-between items-center w-full max-w-3xl mx-auto">
      {isEditing ? (
        <div className="flex flex-col gap-4 w-full">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end gap-4">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center gap-4">
            <p className="text-lg font-semibold border border-gray-300 p-2 rounded-md w-1/2">
              {user.fullName}
            </p>
            <p className="text-sm text-gray-500 border border-gray-300 p-2 rounded-md w-1/2">
              {user.email}
            </p>
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default UserListItem;
