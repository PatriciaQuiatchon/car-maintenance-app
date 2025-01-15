import { Box, Card, CardContent, Chip, CircularProgress, Divider, Grid2, Typography } from "@mui/material";
import PublicPageWrapper from "../../components/public-wrapper";
import { useEffect, useState } from "react";
import { IService } from "../../interface/shared";
import { FaOilCan } from "react-icons/fa";

import api from "../../config/api";

const PublicPage = () => {

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
                <Box>
                    {/* <Typography variant="h4" paddingY={2} fontWeight={600}>
                        Available Services
                    </Typography> */}
                    
                    <Divider>
                        <Chip label="Available Services"
                            sx={{
                                marginTop: "15px",
                                marginBottom: "35px",
                                backgroundColor: "#842433",
                                color: "whitesmoke",
                                fontSize: "35px",
                                padding: "30px",
                                fontWeight: "700",
                            }}
                        size="medium" />
                    </Divider>
                    <Grid2 container spacing={2}>
                        {
                            isLoading ? <CircularProgress size={40} />
                            : services?.length ?
                            <>
                                {
                                    services.map((item) => {
                                        return ( <Grid2 key={item.name} size={{ xs: 12, sm: 6 }}>
                                            <Card sx={{
                                                display: "flex", 
                                                justifyContent: "center", alignItems: "center", 
                                                padding:"5px", 
                                                width:"100%",
                                                height: "150px",
                                                borderRadius: "20px",
                                                backgroundColor: "#f7f7f6",
                                            }}>
                                                <CardContent >
                                                    <FaOilCan />
                                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                                        <strong><span>{item.name}</span></strong>
                                                    </Typography>
                                                </CardContent>
                                                
                                                <CardContent >
                                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                                        <strong> </strong> <span>{item.description}</span>
                                                    </Typography>
                                                </CardContent>
                                                    
                                                <CardContent >
                                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                                        <strong> </strong> <span>{item.price}</span>
                                                    </Typography>
                                                </CardContent>

                                                </Card>
                                        </Grid2>)
                                    })
                                }
                            </> : <></>

                        }
                        <Grid2></Grid2>
                    </Grid2>
                </Box>
            </PublicPageWrapper>
        </>
    )
}

export default PublicPage;