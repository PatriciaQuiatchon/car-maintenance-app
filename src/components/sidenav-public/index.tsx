import { Box, Button, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import CircleIcon from '@mui/icons-material/Circle';
import Logo from '../../assets/logo.jpg'

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

    const checkCurrentTab = (tab: string) => {
        return location.pathname.includes(tab)
    }

    const businessDetails = ["Mon-Sat 8 AM - 5 PM",
        "Angeles City, Pampanga", "+639 566 121 974"
    ]
    return (
        <Box position={"absolute"} sx={{ width:"250px", boxShadow: "15px", backgroundColor: "#842433", top: 0, left:0}} height={"100vh"}
        
        >
            <Stack direction="column" height="100vh" position={"relative"} justifyContent="space-between" display="flex" alignItems="center">
                <Stack direction="column"
                    position={"relative"} width={{ xs: '200px', sm:"100vw" }}  display="flex" 
                    alignContent="center" justifyItems="center" justifyContent={{xs:"center", sm:"space-around", }} 
                    spacing={2} alignItems="center"  height={{xs: "100vh", sm: "auto"}}>
                <Stack direction="row" spacing={2} >
                    <Button
                        onClick={() => { navigate("/") }}
                    >
                        <img
                            src={Logo}
                            loading="lazy"
                            width={180}
                            style={{
                                // mixBlendMode: "multiply",
                                filter: "brightness(1) contrast(1)",
                            }}
                        />
                    </Button>
                </Stack>
            
                <Stack direction="column" spacing={1} >
                    <StyledButton 
                        sx={{ backgroundColor: checkCurrentTab("services") ? "#1f222a" : "" }}
                        onClick={() => { navigate("/auto-services") }}
                    >Services Offers</StyledButton>
                    <StyledButton
                        sx={{  }}
                        onClick={() => { navigate("/login") }}
                    >Login / Register</StyledButton>
                </Stack>
                </Stack>
                <Stack sx={{
                    margin:"0",
                    backgroundColor: "#842433"
                }} direction={{xs: "column", sm: "row"}} paddingY={1} 
                    position={"relative"} width={{ xs: '200px', sm:"100vw" }}  display="flex" 
                    alignContent="center" justifyItems="center" justifyContent={{xs:"center", sm:"space-around", md: "space-evenly"}} 
                    spacing={2} alignItems="center"  height={{xs: "100vh", sm: "auto"}}>
                    {
                        businessDetails.map((item) => {
                            return (
                                <Typography variant="caption" sx={{ color:"whitesmoke" }}> <CircleIcon sx={{ fontSize:"10px", paddingRight: "5px" }} />{item}</Typography>
                            )
                        })
                    }
                </Stack>
            </Stack>
        </Box>
    )

}

export default SideBar;