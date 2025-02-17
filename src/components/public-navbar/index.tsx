import { Box, Button, Stack, Typography, } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import CircleIcon from '@mui/icons-material/Circle';
import Logo from '../../assets/logo.jpg'

const StyledButton = styled(Button)(({ }) => ({
    color: "#fff",
    width: "150px",
    height: "50px",
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

    const businessDetails = ["Mon-Sat 8 AM - 5 PM",
        "Angeles City, Pampanga", "+63 9952 121 6974"
    ]

    return (
        <Box position={"absolute"} sx={{ top: 0, left: 0, paddingY: "10px" }} width={{ xs: '400px', sm: "100vw" }} height={{ xs: "100vh", sm: "auto" }}>

            <Stack sx={{
                borderBottom: ".5px solid",
                margin: "0",
                backgroundColor: "#b10000"
            }} direction={{ xs: "column", sm: "row" }} paddingY={1}
                position={"relative"} display="flex"
                alignContent="center" justifyItems="center" justifyContent={{ xs: "center", sm: "space-around", md: "space-evenly" }}
                spacing={2} alignItems="center" >
                {
                    businessDetails.map((item) => {
                        return (
                            <Typography variant="subtitle2" display="flex" justifyContent="center" fontSize={14}> <CircleIcon sx={{ fontSize: "15px", paddingRight: "5px" }} />{item}</Typography>
                        )
                    })
                }
            </Stack>
            <Stack direction={{ xs: "row", }}
                position={"relative"} display="flex"
                alignContent="center" justifyItems="center" justifyContent={{ xs: "center", sm: "space-between", }}
                spacing={2} alignItems="center"
                px={2}
                sx={{
                    backgroundColor: "#b10000"
                }}
            >
                <Stack direction="row" spacing={2} py={1} >
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

                <Stack direction="row" spacing={1} >
                    <StyledButton
                        sx={{ backgroundColor: checkCurrentTab("services") ? "#1f222a" : "" }}
                        onClick={() => { navigate("/auto-services") }}
                    >Services Offers</StyledButton>
                    <StyledButton
                        sx={{}}
                        onClick={() => { navigate("/login") }}
                    >Login / Register</StyledButton>
                </Stack>
            </Stack>
        </Box>
    )

}

export default NavBar;