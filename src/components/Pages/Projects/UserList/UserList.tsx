import React, { useEffect, useState } from "react";
import axios from "axios";
import UserListItem from "./UserListItem";


interface User {
    _id: string;
    email: string;
    fullName: string;
}

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get<User[]>(`${process.env.REACT_APP_API_URL}/api/users`);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching Users", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleUpdate = async (id: string, updateData: { fullName?: string, email?: string }) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/auth/users/${id}`, updateData);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === id ? { ...user, ...updateData } : user
                )
            );
        } catch (error) {
            console.error("Error updating User", error);
        }
    };

    return (
        <div className="user-list text-center">
            <div className="max-w-2xl mx-auto bg-amber-100 p-6 rounded-lg border border-gray-300 shadow-md mb-8">
                <p className="text-lg text-gray-800 leading-relaxed">
                    This module demonstrates the integration of both frontend and backend technologies,
                    including <span className="font-semibold text-blue-500">CouchDB</span>,
                    <span className="font-semibold text-blue-500"> Node.js</span>,
                    and <span className="font-semibold text-blue-500">Express</span> for backend development,
                    as well as modern frontend techniques for dynamic and interactive user management.
                </p>
            </div>

            <h1 className="text-2xl font-bold mb-4">User List</h1>

            {loading ? (
                <p>Loading Users...</p>
            ) : users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <UserListItem key={user._id} user={user} onUpdate={handleUpdate} />
                    ))}
                </ul>
            ) : (
                <p>No user found.</p>
            )}
        </div>
    );
};

export default UserList;