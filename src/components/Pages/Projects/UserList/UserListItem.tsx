import React from "react";

interface User {
    _id: string;
    email: string;
}

interface UserListItemProps {
    user: User;
}

const UserListItem = ({ user }: UserListItemProps) => {
    return (
        <li className="user-list-item">
            <strong>{user.email}</strong> - ID: {user._id}
        </li>
    );
}

export default UserListItem;

