import { useSearchParams } from "react-router-dom"
import PublicWrapper from "../../public-wrapper"
import ResetPassword from "./components/reset-password"
import ForgotPassword from "./components/email"
import { Box } from "@mui/material"
import Footer from "../../Footer"

const ResetPasswordPage = () => {
    const [searchParams, _setSearchParams] = useSearchParams();
    const token = searchParams.get('token');
    
    return (
        <PublicWrapper>
            <Box sx={{ display: "flex", width: "100%", height: "90vh", justifyContent: "center", alignItems: "center" }}>
                {
                    token ? (
                        <ResetPassword token={token} />
                    ) : (
                        <ForgotPassword />
                    )
                }
            </Box>
            <Footer />
        </PublicWrapper>
    )
}

export default ResetPasswordPage;