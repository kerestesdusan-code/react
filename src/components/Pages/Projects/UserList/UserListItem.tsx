import axios from "axios";
import React, { useState } from "react";

interface User {
    _id: string,
    email: string,
    fullName: string
};

interface UserListItemProps {
    user: User;
    onUpdate: (id: string, updateData: { fullName?: string, email?: string }) => void;
}

const UserListItem = ({ user, onUpdate }: UserListItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [fullName, setFullName] = useState(user.fullName);
    const [email, setEmail] = useState(user.email);

    const handleSave = () => {
        onUpdate(user._id, { fullName, email });
        setIsEditing(false);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3500/api/auth/users/${user._id}`);
            alert("User deleted successfully");
        } catch (error) {
            console.error("Error deleting user", error);
        }
    };

    return (
        <li className="user-list-item">
            {isEditing ? (
                <div className="edit-user">
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
                    <button onClick={handleSave}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                        Save
                    </button>
                </div>
            ) : (
                <div className="vie-user">
                    <p className="fullName">{user.fullName}</p>
                    <p className="email">{user.email}</p>
                    <button onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Edit
                    </button>
                    <button onClick={handleDelete}
                        className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                        Delete
                    </button>
                </div>
            )}
        </li>
    );
}

export default UserListItem;
