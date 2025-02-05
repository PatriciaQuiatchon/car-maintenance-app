import { Avatar, Box, Button, IconButton, ListItemIcon, Menu, MenuItem, Stack, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/authProvider";
import { Logout, Settings } from "@mui/icons-material";
import { useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { GiAutoRepair } from "react-icons/gi";
import { FaCarAlt } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { GrServices } from "react-icons/gr";

const StyledButton = styled(Button)(({ }) => ({
    color: "#fff",
    padding: "10px 15px",
    width:"200px",
    height:"50px",
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

const NavBar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();

    const checkCurrentTab = (tab: string) => {
        return location.pathname.includes(tab)
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box position={"absolute"} sx={{ top: 0, left:0,  width:{xs: "250px", sm:"auto"}, backgroundColor: "#842433",}} 
        height={{xs: "100vh", sm: "auto"}}>
            <Stack direction={{xs: "column", sm: "row"}} 
            paddingY={{sm: 1}} 
            position={"relative"} width={{sm:"100vw" }}  
            display="flex" alignContent="center" 
            justifyItems="center" 
            justifyContent={{xs:"center", sm:"space-around", md: "space-evenly"}} spacing={2} 
            alignItems="center"  
            height={{xs: "100vh", sm: "auto"}}>
                    <StyledButton 
                        startIcon={<MdSpaceDashboard />}
                        sx={{ backgroundColor: checkCurrentTab("dashboard") ? "#1f222a" : "" }}
                        onClick={() => { navigate("/dashboard") }}
                    >Dashboard</StyledButton>
                    <StyledButton 
                        startIcon={<GrServices />}
                        sx={{ backgroundColor: checkCurrentTab("services") ? "#1f222a" : "" }}
                        onClick={() => { navigate("/services") }}
                    >Services Offers</StyledButton>
                    <StyledButton 
                        startIcon={<GiAutoRepair />}
                        sx={{ backgroundColor: checkCurrentTab("repair") ? "#1f222a" : "" }}
                        onClick={() => { navigate("/repair-request") }}
                    >Repair Request</StyledButton>
                    <StyledButton 
                        startIcon={<FaCarAlt />}
                        sx={{ backgroundColor: checkCurrentTab("registered") ? "#1f222a" : "" }}
                        onClick={() => { navigate("/registered-vehicle") }}
                    >Registered Vehicle</StyledButton>
                    <StyledButton
                        startIcon={<FaHistory />}
                        sx={{ backgroundColor: checkCurrentTab("service-records") ? "#1f222a" : "" }}
                        onClick={() => { navigate("/service-records") }}
                    >Service Records</StyledButton>
                    <Box sx={{ justifyContent: "flex-end", display:"flex", width:"100px", paddingRight:"20px"}}>
                    <Tooltip title="Account settings" sx={{ justifyContent: "center", display:"flex" }}>
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        
                        >
                            <Avatar sx={{ width: 32, height: 32,   }}>{auth?.user?.name.slice(0,1)}</Avatar>
                        </IconButton>
                    </Tooltip>
                    </Box>
                </Stack>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem 
                        onClick={() => { navigate("/settings") }}
                    >
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                    </MenuItem>
                    <MenuItem 
                        onClick={() => { auth.logout(); }}
                    >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                    </MenuItem>
                </Menu>
        </Box>
    )

}

export default NavBar;