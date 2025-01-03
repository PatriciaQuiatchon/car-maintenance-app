import { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs, Stack, Box, Tab } from "@mui/material";
import TextButton from "../../components/text-button";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ProfileForm from "../../components/profile";
import PasswordChangeForm from "../../components/password-form";
import { useAuth } from "../../hooks/authProvider";

const Settings = () => {

    const [tabValue, setTabValue] = useState<string>("user")
    const handleChangeTabValue = () => {
        setTabValue(tabValue === "user" ? "password" : "user")
    }
    const navigate = useNavigate()

    const auth = useAuth();

    useEffect(() => {
        if(!auth.user?.user_id) {
            auth.getUserProfile();
        }
    },[auth.user?.user_id])

    return (
        <Wrapper>
            
        <Stack  sx={{
                width: {xs: "calc(100vw - 100px)", sm:`100%`},
            }}>
                
            <Breadcrumbs sx={{marginY:"5px"}}>
                <TextButton isActive={true} onClick={() => navigate("/settings")}>
                    Settings
                </TextButton>
            </Breadcrumbs>
        <TabContext value={tabValue} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', width:"100%" }}>
                        <TabList onChange={handleChangeTabValue} aria-label="lab API tabs example" 
                            TabIndicatorProps={{
                                // sx: { backgroundColor: "#700E1C"}
                                // sx: { backgroundColor: "white"}
                            }}
                        >
                            <Tab label="Profile" value="user"
                                 sx={{
                                    fontWeight: "700",
                                    // color: "white", // Inactive tab color
                                    "&.Mui-selected": {
                                      color: "black", // Active tab color
                                    },
                                  }}
                                
                            />
                            <Tab label="Password" value="password" 
                                 sx={{
                                    fontWeight: "700",
                                    // color: "white", // Inactive tab color
                                    "&.Mui-selected": {
                                      color: "black ", // Active tab color
                                    },
                                  }}
                            />
                        </TabList>
                    </Box>
                    
                    <TabPanel value="user" sx={{
                        '&.MuiTabPanel-root': {
                            padding: 0,
                        }
                    }}>
                        <ProfileForm />
                    </TabPanel>
                    <TabPanel value="password" sx={{
                        '&.MuiTabPanel-root': {
                            padding: 0,
                        }
                    }}>
                        <PasswordChangeForm />
                    </TabPanel>
        </TabContext>
        </Stack>
        </Wrapper>
    )
}

export default Settings;