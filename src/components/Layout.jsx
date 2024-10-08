import { Outlet } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { useLocation } from "react-router-dom";
import { NavBar } from "./NavBar";

export default function Layout({ empty }) {
  let location = useLocation()

  return (
    <div>
        <div>
            <NavBar/>
        </div>
        <div>
          {
          (location.pathname !== "/")
          ? <div> <Outlet/> </div> 
          : <div> <Home/></div> 
          }
          
        </div>
    </div>
  );
}