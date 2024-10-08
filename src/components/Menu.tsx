
const Links = [
    { title: "Home", url: "/" },
    {
        title: "Moje Projekty", url: "/projects",
        subItems:
            [
                { title: "Kalkulacka", url: "/projects/calculator" },
                { title: "Employee List", url: "/projects/employees" },
                { title: "Letters Game", url: "/projects/letters-game" },
            ]
    },
    { title: "O Mne", url: "/about-me" },
    { title: "Kontaktný Formulár", url: "/contact-form" }
]

export const Menu = () => {
    return (
        <ul className="menu menu-horizontal px-1">
            {Links.map(
                (link) => {
                    if (link.subItems) {
                        return (
                            <li>
                                <ul
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] shadow">
                                    <li>
                                        <details>
                                            <summary><a href={link.url}>{link.title}</a></summary>
                                            <ul className="p-2">
                                                {link.subItems!.map((subLink, i) =>
                                                    <li key={'SL' + i} ><a href={subLink.url}>{subLink.title}</a></li>
                                                )}
                                            </ul>
                                        </details>
                                    </li>
                                </ul>
                            </li>
                        )
                    } else {
                        return (
                            <li key={Math.random()} ><a href={link.url}>{link.title}</a></li>
                        )
                    }
                }
            )}
        </ul>
    );
};