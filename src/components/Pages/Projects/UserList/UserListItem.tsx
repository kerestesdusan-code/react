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
    return (
        <li className="user-list-item">
            {isEditing ? (
                <div className="edit-user">
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full name"
                        className="input-fullName
                "/>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="input-email"
                    />
                    <button onClick={handleSave} className="btn-save">
                        Save
                    </button>
                </div>
            ) : (
                <div className="vie-user">
                    <p className="fullName">{user.fullName}</p>
                    <p className="email">{user.email}</p>
                    <button onClick={() => setIsEditing(true)} className="btn-edit">
                        Edit
                    </button>
                </div>
            )}
        </li>
    );
}

export default UserListItem;

