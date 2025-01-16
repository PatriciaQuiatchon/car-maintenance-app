import { Box, Divider, Stack, Typography } from "@mui/material";
import SignInForm from "../../components/auth/login"
import SignUpForm from "../../components/auth/register";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../../components/header";
import { useAuth } from "../../hooks/authProvider";

interface IAuthPage {
    label: string
    type: string
    link: string
}
const AuthPage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();
    
    if (auth.token) {
       navigate("/dashboard") 
    }

    const { pathname } = location

    const isAdmin = pathname.includes("admin") 
    const isRegister = pathname.includes("register") 

    const accountLabel: IAuthPage = isRegister ? {
        label: "Already have an account?", type: "Login", link: "/login"
    } : {
        label: "No account yet?", type: "Register", link: "/register"
    }

    const { label, type, link } = accountLabel
    return (
        <>
        { <Header isAdmin={isAdmin} /> }
        <Box display="flex" height="90vh" justifyContent="center" alignItems="center">
            <Box sx={{width: { xs: "400px", md: "600px"}}}>
                {
                    isRegister ? <SignUpForm /> : <SignInForm />
                }
            { !isAdmin && (
                <Stack direction="column" spacing={2} mt={2}>
                    <Stack sx={{width: "100%"}} direction={"row"} mt={2} justifyContent="center" spacing={1}>
                        <Typography>{ label }</Typography>
                        <Typography
                            sx={{ cursor: "pointer", fontWeight: 700 }}
                            onClick={() => { navigate(link) }}
                        >{ type }</Typography>
                    </Stack>
                    <Stack spacing={1} alignItems="center" >
                    <Divider sx={{ border:"2px ", width:"200px" }}/>
                    {/* <Typography variant="caption">
                        or {isRegister ? "Sign up" : "Login"} with 
                    </Typography>
                    <button
                        style={{color: "whitesmoke", width:"100px",}}
                        type="submit"
                    >
                        Google
                    </button> */}
                    </Stack>
                </Stack>
            )}
                
            </Box>
        </Box>
        </>
    )
}

export default AuthPage;