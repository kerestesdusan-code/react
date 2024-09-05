
const Links = [
    { id: "1", title: "Home", url: "/" },
    { id: "2", title: "/Moje Projekty", url: "/projects" },
    { id: "3", title: "/O Mne", url: "/about-me" },
    { id: "4", title: "/Kontaktný Formulár", url: "/contact-form" }
]

export const Menu = () => {
    return (
        <ul>
            {Links.map(
                (link) => {
                    return (
                        <li key={link.id} ><a href={link.url}>{link.title}</a></li>
                    )
                }
            )
            }
        </ul>
    );

};