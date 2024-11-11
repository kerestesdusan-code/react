import { Menu } from "./Menu";

export function NavBar(){
    return(
            <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="fixed top-4 left-4 text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">Dušan Keresteš
                    
                </div>
            </div>
            <div className="navbar-center">
                <Menu/>
            </div>
            <div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    </div>
                </div>
            </div>
        </div>
    )
}


