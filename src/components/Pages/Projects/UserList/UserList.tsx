// src/components/Pages/Projects/UserList/UserList.tsx

import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import UserListItem from "./UserListItem";

interface User {
  id: number;
  email: string;
  fullName: string;
  createdAt?: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // baseURL = http://localhost:3001/api
        // ->    GET http://localhost:3001/api/users
        const response = await axiosInstance.get<User[]>("users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching Users", error);
        setErrorMessage("Error fetching Users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdate = async (
    id: number,
    updateData: { fullName?: string; email?: string }
  ) => {
    try {
      // PUT http://localhost:3001/api/users/:id
      const response = await axiosInstance.put<{ user: User }>(
        `users/${id}`,
        updateData
      );

      const updatedUser = response.data.user;

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        )
      );
    } catch (error) {
      console.error("Error updating User", error);
      setErrorMessage("Error updating User");
    }
  };

  return (
    <div className="user-list text-center">
      <h1 className="text-2xl font-bold mb-4">User List</h1>

      {loading ? (
        <p>Loading Users...</p>
      ) : errorMessage ? (
        <p className="text-red-600">{errorMessage}</p>
      ) : users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              onUpdate={(updateData) => handleUpdate(user.id, updateData)}
            />
          ))}
        </ul>
      ) : (
        <p>No user found.</p>
      )}
    </div>
  );
};

export default UserList;
