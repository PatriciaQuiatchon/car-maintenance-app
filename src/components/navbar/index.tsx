import { Avatar, Box, Button, IconButton, ListItemIcon, Menu, MenuItem, Stack, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/authProvider";
import { Logout, Settings } from "@mui/icons-material";
import { useState } from "react";

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
        <Box position={"absolute"} sx={{ top: 0, left:0}} width={"100%"}>
            <Stack direction="row" paddingY={1} width="100%" position={"relative"} justifyContent="space-evenly" display="flex" alignItems="center">
                    <StyledButton 
                        sx={{ backgroundColor: checkCurrentTab("dashboard") ? blue[600] : "" }}
                        onClick={() => { navigate("/dashboard") }}
                    >Dashboard</StyledButton>
                    <StyledButton 
                        sx={{ backgroundColor: checkCurrentTab("services") ? blue[600] : "" }}
                        onClick={() => { navigate("/services") }}
                    >Servicers</StyledButton>
                    <StyledButton 
                        sx={{ backgroundColor: checkCurrentTab("repair") ? blue[600] : "" }}
                        onClick={() => { navigate("/repair-request") }}
                    >Repair Request</StyledButton>
                    <StyledButton 
                        sx={{ backgroundColor: checkCurrentTab("registered") ? blue[600] : "" }}
                        onClick={() => { navigate("/registered-vehicle") }}
                    >Registered Vehicle</StyledButton>
                    <StyledButton
                        sx={{ backgroundColor: checkCurrentTab("service-history") ? blue[600] : "" }}
                        onClick={() => { navigate("/service-history") }}
                    >Service History</StyledButton>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                        </IconButton>
                    </Tooltip>
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