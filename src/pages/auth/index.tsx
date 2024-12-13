import { Box, Stack, Typography } from "@mui/material";
import SignInForm from "../../components/auth/login"
import SignUpForm from "../../components/auth/register";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../../components/header";

interface IAuthPage {
    label: string
    type: string
    link: string
}
const AuthPage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { pathname } = location

    const isRegister = pathname.includes("register") 

    const accountLabel: IAuthPage = isRegister ? {
        label: "Already have an account?", type: "Login", link: "/"
    } : {
        label: "No account yet?", type: "Register", link: "/register"
    }

    const { label, type, link } = accountLabel
    return (
        <>
        <Header />
        <Box sx={{width: { xs: "400px", md: "600px"}}}>
            {
                isRegister ? <SignUpForm /> : <SignInForm />
            }
            <Stack sx={{width: "100%"}} direction={"row"} mt={2} justifyContent="center" spacing={1}>
                <Typography>{ label }</Typography>
                <Typography
                    sx={{ cursor: "pointer", fontWeight: 700 }}
                    onClick={() => { navigate(link) }}
                >{ type }</Typography>
            </Stack>
        </Box>
        </>
    )
}

export default AuthPage;