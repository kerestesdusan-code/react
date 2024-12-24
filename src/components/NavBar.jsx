import { Menu } from "./Menu";
import myFoto from "../assets/my-foto.png";


export function NavBar(){
    return(
            <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="fixed top-4 left-4 flex items-center space-x-4 text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300 p-4 bg-white shadow-md">
                    <img
                        src={myFoto}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-4 border-purple-400 shadow-lg"
                    />
                    <span>Dušan Keresteš</span>
                </div>
            </div>
            <div className="navbar-center">
                <Menu />
            </div>
            <div>
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    ></div>
                </div>
            </div>
        </div>
    );
}


