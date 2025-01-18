import { Accordion, Box, Chip, Grid2, Typography } from "@mui/material";
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { IService } from "../../interface/shared"
import { FC } from "react"
import Loader from "../loading"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaOilCan } from "react-icons/fa";
import { GiFlatTire } from "react-icons/gi";
import { FaFilter } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { FaCarBattery } from "react-icons/fa";
import { formatMoney } from "../../utils/helper";

interface IServicecDisplay {
    isLoading: boolean
    services: IService[]
}

const ServicesDisplay:FC<IServicecDisplay> = ({
    isLoading, 
    services
}) => {

    
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
    
    return (
        
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
                                    {
                                        
                                    }
                                    <Chip label={formatMoney(item.price)} color="success" variant="outlined" />
                                    </AccordionDetails>
                                </Accordion>
                                </div>
                        </Grid2>)
                    })
                }
            </> : <></>

        }
        <Grid2></Grid2>
    </Grid2>
    )
}

export default ServicesDisplay;