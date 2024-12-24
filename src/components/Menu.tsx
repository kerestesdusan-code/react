import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Links = [
    { title: "Home", url: "/" },
    {
        title: "My Projects", url: "/projects",
        subItems: [
            { title: "Calculator", url: "/projects/calculator" },
            { title: "Letters Game", url: "/projects/letters-game" },
            { title: "Employee", url: "/projects/employee-list" },
            { title: "Users", url: "/projects/users-list" }
        ]
    },
    { title: "About Me", url: "/about-me" },
    { title: "Contact Form", url: "/contact-form" },
    { title: "Login", url: "/login" },
    { title: "Register", url: "/register" }
];

export const Menu = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="menu-container flex justify-between items-center p-4 bg-white shadow-md">
            <ul className="menu menu-horizontal px-4 py-2 space-x-4 text-gray-700 text-lg font-medium">
                {Links.map((link) => {
                    if (link.subItems) {
                        return (
                            <li
                                key={link.url}
                                className={`dropdown ${location.pathname === link.url ? "text-blue-700" : "text-blue-500"
                                    }`}
                            >
                                <details>
                                    <summary className="cursor-pointer">
                                        {link.title}
                                    </summary>
                                    <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] shadow p-2">
                                        {link.subItems.map((subLink, i) => (
                                            <li key={'SL' + i}>
                                                <button
                                                    className="hover:text-blue-600"
                                                    onClick={() => navigate(subLink.url)}
                                                >
                                                    {subLink.title}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            </li>
                        );
                    } else {
                        return (
                            <li
                                key={link.url}
                                className={location.pathname === link.url ? "text-blue-600" : "hover:text-blue-500"}
                            >
                                <button
                                    className="focus:outline-none"
                                    onClick={() => navigate(link.url)}
                                >
                                    {link.title}
                                </button>
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
};
