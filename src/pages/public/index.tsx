import { Accordion, Box, Chip, Divider, Grid2, Typography } from "@mui/material";
  import AccordionSummary from '@mui/material/AccordionSummary';
  import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PublicPageWrapper from "../../components/public-wrapper";
import { useEffect, useState } from "react";
import { IService } from "../../interface/shared";
import { FaOilCan } from "react-icons/fa";
import { GiFlatTire } from "react-icons/gi";
import { FaFilter } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { FaCarBattery } from "react-icons/fa";

import api from "../../config/api";
import Loader from "../../components/loading";

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

    const getIcon = (label: string) => {
        if (label.toLowerCase().includes("oil")) {
            return <FaOilCan />
        }

        if (label.toLowerCase().includes("tire")) {
            return <GiFlatTire />
        }

        if (label.toLowerCase().includes("filter")) {
            return <FaFilter />
        }
        
        if (label.toLowerCase().includes("battery")) {
            return <FaCarBattery />
        }

        return <FaCarSide />
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
                            isLoading ? 
                            <Loader />
                            : services?.length ?
                            <>
                                {
                                    services.map((item) => {
                                        return ( <Grid2 display="flex" justifyContent="center"  key={item.name} size={{ xs: 12 }}>
                                             <div>
                                                <Accordion sx={{ width: "100%", boxShadow: "none",borderBottom: "1px solid gray", marginBottom: "10px" }}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel2-content"
                                                    id="panel2-header"
                                                    sx={{
                                                        display: "flex", justifyContent: "center", 
                                                    }}
                                                    >
                                                    <Typography 
                                                        sx={{ textTransform: "uppercase", letterSpacing: "2px" }} 
                                                        color="#455a64"
                                                        fontWeight="500" 
                                                        variant="h6" component="span">
                                                        <Box component="span" sx={{ 
                                                        paddingRight: "10px"
                                                        }}>{ getIcon(item.name) }</Box>
                                                        { item.name }
                                                    </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails sx={{ width: "70vw", textAlign: "left" }}>
                                                    <Typography sx={{ paddingBottom: "15px" }}>
                                                        { item.description }
                                                    </Typography>
                                                    
                                                    <Chip label={`PHP ${item.price}`} color="success" variant="outlined" />
                                                    </AccordionDetails>
                                                </Accordion>
                                                </div>
                                            {/* <Card sx={{
                                                display: "flex", 
                                                justifyContent: "center", alignItems: "center", 
                                                padding:"5px", 
                                                width:"100%",
                                                height: "150px",
                                                borderRadius: "20px",
                                                backgroundColor: "#f7f7f6",
                                            }}>
                                                <CardContent >
                                                    { getIcon(item.name) }
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

                                            </Card> */}
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