import { Avatar, Box, Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { blue, blueGrey } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/authProvider";

const StyledButton = styled(Button)(({ theme }) => ({
    color: "#fff",
    padding: "10px 20px",
    fontSize: "12px",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
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
        <Box position={"absolute"} sx={{ boxShadow: "15px", backgroundColor: blueGrey[500], top: 0, left:0}} height={"100vh"}>
            <Stack height="100vh" position={"relative"} justifyContent="space-evenly" display="flex" alignItems="center">
                <Avatar sx={{ padding: "15px", }}>PR</Avatar>
                <Stack spacing={2} paddingX={2}>
                    <StyledButton 
                        sx={{ backgroundColor: checkCurrentTab("dashboard") ? blue[600] : "" }}
                        onClick={() => { navigate("/dashboard") }}
                    >Dashboard</StyledButton>
                    <StyledButton 
                        sx={{ backgroundColor: checkCurrentTab("repair") ? blue[600] : "" }}
                        onClick={() => { navigate("/repair-request") }}
                    >Repair Request</StyledButton>
                    <StyledButton
                        sx={{ backgroundColor: checkCurrentTab("service") ? blue[600] : "" }}
                        onClick={() => { navigate("/service-history") }}
                    >Service History</StyledButton>
                    <StyledButton
                        sx={{ backgroundColor: checkCurrentTab("users") ? blue[600] : "" }}
                        onClick={() => { navigate("/users") }}
                    >Users</StyledButton>
                    <StyledButton
                        sx={{ backgroundColor: checkCurrentTab("settings") ? blue[600] : "" }}
                        onClick={() => { navigate("/settings") }}
                    >Settings</StyledButton>
                    <StyledButton
                        sx={{ backgroundColor: checkCurrentTab("logout") ? blue[600] : "" }}
                        onClick={() => { auth.logout(); }}
                    >Logout</StyledButton>
                </Stack>
            </Stack>
        </Box>
    )

}

export default SideBar;