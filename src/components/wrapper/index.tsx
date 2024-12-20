import { FC } from "react";
import SideBar from "../sidenav";
import { useAuth } from "../../hooks/authProvider";
import NavBar from "../navbar";

interface IWrapper {
    children: React.ReactNode
}

const Wrapper:FC<IWrapper> = ({children}) => {

    const auth = useAuth();

    const isAdmin = auth.user?.role === "admin"
    return (
        <>
            { isAdmin ? <SideBar /> : <NavBar />}
            {children}
        </>
    )
}

export default Wrapper;