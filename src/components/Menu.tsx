import { useLocation } from "react-router-dom";

const Links = [
    { title: "Home", url: "/" },
    {
        title: "Moje Projekty", url: "/projects",
        subItems: [
            { title: "Kalkulacka", url: "/projects/calculator" },
            { title: "Employee List", url: "/projects/employees" },
            { title: "Letters Game", url: "/projects/letters-game" },
        ]
    },
    { title: "O Mne", url: "/about-me" },
    { title: "Kontaktný Formulár", url: "/contact-form" }
];

export const Menu = () => {
    const location = useLocation();
    return (
        <ul className="menu menu-horizontal px-4 py-2 space-x-4 text-gray-700 text-lg font-medium">
            {Links.map((link) => {
                if (link.subItems) {
                    return (
                        <li className={(location.pathname === link.url ? "text-blue-700" : "text-blue-500")} key={link.url}>
                            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] shadow">
                                <li>
                                    <details>
                                        <summary>
                                            <a href={link.url}>{link.title}</a>
                                        </summary>
                                        <ul className="p-2">
                                            {link.subItems.map((subLink, i) => (
                                                <li key={'SL' + i}>
                                                    <a href={subLink.url}>{subLink.title}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </details>
                                </li>
                            </ul>
                        </li>
                    );
                } else {
                    return (
                        <li key={link.url} className={location.pathname === link.url ? "text-blue-600" : "hover:text-blue-500"}>
                            <a href={link.url}>{link.title}</a>
                        </li>
                    );
                }
            })}
        </ul>
    );
};
