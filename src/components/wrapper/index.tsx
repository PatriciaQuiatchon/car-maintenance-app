import React, { FC } from "react";
import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../hooks/authProvider";
import SideBar from "../sidenav";
import NavBar from "../navbar";
import { blueGrey } from "@mui/material/colors";
import { Toaster } from 'react-hot-toast';

const drawerWidth = 200;

interface IWrapper {
    children: React.ReactNode
}

const Wrapper:FC<IWrapper> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    // <Box sx={{ textAlign: "center", padding: 2 }}>
    //   <Typography variant="h6" noWrap>
    //     SideBar
    //   </Typography>
    //   {/* Add sidebar items here */}
    // </Box>
    <Box
        sx={{
        }}
    >
        <SideBar />
    </Box>
  );

  const auth = useAuth();
  const isAdmin = auth.role === "admin"

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

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
                boxShadow: "15px", backgroundColor: blueGrey[500], border: "0px",
                borderColor: blueGrey[500],
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
                borderColor: blueGrey[500],
                boxShadow: "15px", backgroundColor: blueGrey[500],
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
                    borderColor: blueGrey[500],
                    boxShadow: "15px", backgroundColor: blueGrey[500],
                    boxSizing: "border-box", width: drawerWidth },
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
                borderColor: blueGrey[500],
                boxShadow: "15px", backgroundColor: blueGrey[500],
                boxSizing: "border-box", width: drawerWidth },
            }}
          >
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
          p: 3,
          mt: 8,
        }}
      >
        {children}
      </Box>
      <Toaster />
    </Box>
  );
};

export default Wrapper;
