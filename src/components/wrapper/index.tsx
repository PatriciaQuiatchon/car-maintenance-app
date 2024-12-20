import { FC } from "react";
import SideBar from "../sidenav";
import { useAuth } from "../../hooks/authProvider";
import NavBar from "../navbar";
import { Box } from "@mui/material";

interface IWrapper {
    children: React.ReactNode
}

const Wrapper:FC<IWrapper> = ({children}) => {

    const auth = useAuth();

    const isAdmin = auth.role === "admin"
    return (
        <>
            { isAdmin ? <SideBar /> : <NavBar />}
            <Box sx={{ width: isAdmin ? "70vw" : "100vw" }} marginLeft={isAdmin ? "150px" : ""}>{children}</Box>
        </>
    )
}

export default Wrapper;