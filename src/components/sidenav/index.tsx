import { Avatar, Box, Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/authProvider";
import { MdSpaceDashboard } from "react-icons/md";
import { GiAutoRepair } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { GrServices } from "react-icons/gr";
import { IoSettings } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

const StyledButton = styled(Button)(({ }) => ({
    color: "#fff",
    padding: "10px 20px",
    fontSize: "12px",
    borderRadius: "8px",
    justifyContent: "start",
    "&:hover": {
      backgroundColor: "#1f222a",
    },
    "&:disabled": {
      backgroundColor: "#cccccc",
      color: "#666666",
    },
  }));

const SideBar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();

    const checkCurrentTab = (tab: string) => {
        return location.pathname.includes(tab)
    }

    return (
        <Box position={"absolute"} sx={{ width:"250px", boxShadow: "15px", backgroundColor: "#842433", top: 0, left:0}} height={"100vh"}>
            <Stack height="100vh" position={"relative"} justifyContent="space-evenly" display="flex" alignItems="center">
                <Avatar sx={{ padding: "15px", backgroundColor: "#1f222a" }}>{auth.user?.name.slice(0,1)}</Avatar>
                <Stack spacing={2} paddingX={2}>
                    <StyledButton 
                        startIcon={<MdSpaceDashboard />}
                        sx={{ backgroundColor: checkCurrentTab("dashboard") ? "#1f222a" : "" }}
                        onClick={() => { navigate("/dashboard") }}
                    >Dashboard</StyledButton>
                    <StyledButton 
                        startIcon={<GiAutoRepair />}
                        sx={{ backgroundColor: checkCurrentTab("repair") ? "#1f222a" : "" }}
                        onClick={() => { navigate("/repair-request") }}
                    >Repair Request</StyledButton>
                    <StyledButton
                        startIcon={<FaHistory />}
                        sx={{ backgroundColor: checkCurrentTab("service-records") ? "#1f222a" : "" }}
                        onClick={() => { navigate("/service-records") }}
                    >Service Records</StyledButton>
                    <StyledButton
                        startIcon={<FaUsers />}
                        sx={{ backgroundColor: checkCurrentTab("users") ? "#1f222a" : "" }}
                        onClick={() => { navigate("/users") }}
                    >Users</StyledButton>
                    <StyledButton
                        startIcon={<GrServices />}
                        sx={{ backgroundColor: checkCurrentTab("services") ? "#1f222a" : "" }}
                        onClick={() => { navigate("/services") }}
                    >Services</StyledButton>
                    
                    <StyledButton
                        startIcon={<IoSettings />}
                        sx={{ backgroundColor: checkCurrentTab("settings") ? "#1f222a" : "" }}
                        onClick={() => { navigate("/settings") }}
                    >Settings</StyledButton>
                    <StyledButton
                        startIcon={<CiLogout />}
                        sx={{ backgroundColor: checkCurrentTab("logout") ? "#1f222a" : "" }}
                        onClick={() => { auth.logout(); }}
                    >Logout</StyledButton>
                </Stack>
            </Stack>
        </Box>
    )

}

export default SideBar;