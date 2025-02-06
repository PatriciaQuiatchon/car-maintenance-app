import React, { FC } from "react";
import { Box, Drawer, AppBar, Toolbar, Typography, IconButton, Alert } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../hooks/authProvider";
import SideBar from "../sidenav";
import NavBar from "../navbar";
import { Toaster } from 'react-hot-toast';
import { useLocation } from "react-router-dom";

const drawerWidth = 250;

interface IWrapper {
    children: React.ReactNode
}

const Wrapper:FC<IWrapper> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const isVerified = localStorage.getItem("is_verified")
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

  const auth = useAuth();
  const isAdmin = auth.role.toLowerCase() === "admin"
  const isCustomer = auth.role.toLowerCase() === "customer"

  const location = useLocation()
  return (
    <Box sx={{ display: "flex" }}>

      {/* AppBar (NavBar) */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: isAdmin ? `calc(100% - ${drawerWidth}px)` : "100%" },
          ml: { sm: isAdmin ? `${drawerWidth}px` : 0 },
        }}
      >
        <Toolbar 
            sx={{
                boxShadow: "15px",
                border: "0px",
                backgroundColor: "#842433",
                display: { sm: isAdmin ? "none" : ""}
            }}
            
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" }, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          { isAdmin && <Typography variant="h6" noWrap component="div">
            Car Services
          </Typography>}
          {
            !isAdmin && (
              <Box sx={{
              display: { xs: "none", sm: "block" },
              }}>
                { isVerified === "0" && <Alert sx={{ position:"absolute", top: 0, zIndex: 5, }} variant="filled" severity="warning">
                  Please verify your email.
              </Alert>}
                <NavBar />
              </Box>
            )
          }
        </Toolbar>
      </AppBar>

      {/* Drawer (SideBar) */}
      {isAdmin && (
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
                // borderColor: blueGrey[500],
                // boxShadow: "15px", 
                // backgroundColor: "#842433",
                boxSizing: "border-box", width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                    // borderColor: blueGrey[500],
                    boxShadow: "20px", 
                    // backgroundColor: blueGrey[500],
                    // boxSizing: "border-box", 
                    width: drawerWidth, 
                  },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      )}

      {
        !isAdmin && (
          <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, 
          display: { xs: "block", sm: "none" },
          flexShrink: { sm: 0 } }}
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
                // backgroundColor: blueGrey[500],
                boxShadow: "20px", 
                width: drawerWidth },
            }}
          >
            { isVerified === "0" && <Alert sx={{ position:"absolute", top: 0, zIndex: 5, }} variant="filled" severity="warning">
                  Please verify your email.
              </Alert>}
              <NavBar />
          </Drawer>
        </Box>
        )
      }
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: isAdmin ? `calc(100% - ${drawerWidth}px)` : "100%" },
          backgroundColor: '#282828',
          pt: 5,
          px: isCustomer ? {xs: 1, sm: 5, md: 8, lg:10} : isAdmin ? 3 : 1,
          minHeight: '100vh',
        }}
      >
        {
         ( isVerified === "0" && !isAdmin && !location.pathname.includes("services")) && <Box sx={{ position: "absolute", height:"100%", width:"100%", zIndex: 9, backgroundColor: "fff", opacity:.5, }} />
        }
        <Box sx={{ paddingTop:5 }}>
        {children}
        </Box>
      </Box>
      <Toaster />
    </Box>
  );
};

export default Wrapper;
