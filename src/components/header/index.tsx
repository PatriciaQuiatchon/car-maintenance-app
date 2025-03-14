import { FC } from 'react';
import { Avatar, Box, Stack } from "@mui/material";
import { blueGrey } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";

interface IHeader {
    isAdmin: boolean
}

const Header:FC<IHeader> = () => {

    // const { isAdmin } = props

    const navigate = useNavigate();

    return (
        <Box position="absolute" top={0} left={0} sx={{ width:"100%", }}>
            <Stack position="relative" mx={5} mt={2} direction={"row"} justifyContent="space-between">
                <Avatar onClick={() => navigate("/")} sx={{ bgcolor: blueGrey[500] }}>
                PP
                </Avatar>
                {/* { !isAdmin && (<Stack direction={"row"} spacing={1} display="flex" justifyItems="center" alignItems="center">
                    <Typography>Log in as Admin?</Typography>
                    <Typography onClick={() => { navigate("/admin") }} sx={{ cursor: "pointer", fontWeight: 700 }}>Login</Typography>
                </Stack>)} */}
            </Stack>
        </Box>
    )
}

export default Header;