import { Menu } from "./Menu";

export function NavBar(){
    return(
            <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div>Dušan Keresteš</div>
            </div>
            <div className="navbar-center">
                <Menu/>
            </div>
            <div>
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


