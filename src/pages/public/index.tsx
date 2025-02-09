import { Box, Chip, Divider, useTheme, useMediaQuery } from "@mui/material";
import PublicPageWrapper from "../../components/public-wrapper";
import { useEffect, useState } from "react";
import { IService } from "../../interface/shared";
import api from "../../config/api";
import ServicesDisplay from "../../components/services";
import Footer from "../../components/Footer";

const PublicPage = () => {
    
    const theme = useTheme();
    
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [services, setServices] = useState<IService[]>([])
    
    const fetchServices = async () => {
        try {
            setIsLoading(!isLoading)
            const response = await api.get("/api/services");
            setServices(response.data)
        } catch (e){

        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        fetchServices()
    },[])

    return (
        <>
            <PublicPageWrapper>
                <Box mb={3}>
                    {/* <Typography variant="h4" paddingY={2} fontWeight={600}>
                        Available Services
                    </Typography> */}
                    
                    <Divider>
                        <Chip label="Available Services"
                            sx={{
                                marginTop: isMobile ? "5rem" : "8rem",
                                marginBottom: "35px",
                                backgroundColor: "#b10000",
                                color: "whitesmoke",
                                fontSize: "35px",
                                padding: "30px",
                                fontWeight: "700",
                            }}
                        size="medium" />
                    </Divider>
                    <ServicesDisplay 
                        isLoading={isLoading}
                        services={services}
                    />
                </Box>
                <Footer />

            </PublicPageWrapper>
        </>
    )
}

export default PublicPage;