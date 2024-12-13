import { Avatar, Box, Stack, Typography } from "@mui/material";
import { blueGrey } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();

    return (
        <Box position="absolute" top={0} left={0} sx={{ width:"100%", }}>
            <Stack position="relative" mx={5} mt={2} direction={"row"} justifyContent="space-between">
                <Avatar sx={{ bgcolor: blueGrey[500] }}>
                CM
                </Avatar>
                <Stack direction={"row"} spacing={1} display="flex" justifyItems="center" alignItems="center">
                    <Typography>Log in as Admin?</Typography>
                    <Typography onClick={() => { navigate("/admin/login") }} sx={{ cursor: "pointer", fontWeight: 700 }}>Login</Typography>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Header;