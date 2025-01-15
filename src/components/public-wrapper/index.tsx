import React, { FC } from "react";
import { Box, CssBaseline, Drawer, AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "../sidenav";
import NavBar from "../public-navbar";
import { blueGrey } from "@mui/material/colors";
import { Toaster } from 'react-hot-toast';

const drawerWidth = 200;

interface IWrapper {
    children: React.ReactNode
}

const PublicWrapper:FC<IWrapper> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
        sx={{
        }}
    >
        <SideBar />
    </Box>
  );

  return (
    <Box sx={{ display: "flex", }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: { sm: "100%" },
          ml: { sm:  0 },
        }}
      >
        <Toolbar 
            sx={{
                // boxShadow: "15px",
                 backgroundColor: "#842433", border: "0px",
                display: { sm: ""}
            }}
            
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" }, }}
          >
            <MenuIcon />
          </IconButton>
          
              <Box sx={{
              display: { xs: "none", sm: "block" },
              }}>
                <NavBar />
              </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer (SideBar) */}
        <Box
          component="nav"
          sx={{ width: { xs: drawerWidth, sm: 0 }, flexShrink: { sm: 0 } }}
          aria-label="sidebar"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }} // Better open performance on mobile.
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { 
                borderColor: blueGrey[500],
                boxShadow: "15px", backgroundColor: blueGrey[500],
                boxSizing: "border-box", width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Box>

     
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 10,
        }}
      >
        {children}
      </Box>
      <Toaster />
    </Box>
  );
};

export default PublicWrapper;
