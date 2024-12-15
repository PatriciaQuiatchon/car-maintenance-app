import { FC } from "react";
import SideBar from "../sidenav";

interface IWrapper {
    children: React.ReactNode
}

const Wrapper:FC<IWrapper> = ({children}) => {
    return (
        <>
            <SideBar />
            {children}
        </>
    )
}

export default Wrapper;