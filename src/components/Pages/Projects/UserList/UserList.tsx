import React, { useEffect, useState } from "react";
import axios from "axios";
import UserListItem from "./UserListItem";


interface User {
    _id: string;
    email: string;
}

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get<User[]>("http://localhost:3500/api/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching Users", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="user-list">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            {loading ? (
                <p>Loading Users...</p>
            ) : users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <UserListItem key={user._id} user={user} />
                    ))}
                </ul>
            ) : (
                <p>No user found.</p>
            )}
        </div>
    );
};

export default UserList;