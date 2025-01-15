import { Box, Button, Stack, Typography, } from "@mui/material";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import CircleIcon from '@mui/icons-material/Circle';
const StyledButton = styled(Button)(({  }) => ({
    color: "#fff",
    width:"150px",
    height:"50px",
    fontSize: "12px",
    borderRadius: "8px",
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

    const checkCurrentTab = (tab: string) => {
        return location.pathname.includes(tab)
    }

    const businessDetails = ["Working Hours: Mon-Fri 9 AM - 6 PM",
        "Location: 123 Business St, City", "Phone: (123) 456-7890"
    ]

    return (
        <Box position={"absolute"} sx={{ top: 0, left:0, paddingY:"10px"}} height={{ sm: "auto"}}>
            <Stack direction={{xs: "column", sm: "row"}} 
                position={"relative"} width={{ xs: '200px', sm:"100vw" }}  display="flex" 
                alignContent="center" justifyItems="center" justifyContent={{xs:"center", sm:"space-around", }} 
                spacing={2} alignItems="center"  height={{xs: "100vh", sm: "auto"}}>
            <Stack direction="row" spacing={2} >
                <Typography variant="h6">Perfomance Plus</Typography>
            </Stack>
           
            <Stack direction="row" spacing={1} >
                <StyledButton 
                    sx={{ backgroundColor: checkCurrentTab("services") ? blue[600] : "" }}
                    onClick={() => { navigate("/services") }}
                >Servicers</StyledButton>
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
                            <Typography variant="subtitle2"> <CircleIcon sx={{ fontSize:"10px", paddingRight: "5px" }} />{item}</Typography>
                        )
                    })
                }
            </Stack>
        </Box>
    )

}

export default NavBar;