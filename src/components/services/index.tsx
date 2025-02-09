import {  Grid2, Paper,  } from "@mui/material";
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
import { IService } from "../../interface/shared"
import { FC } from "react"
import Loader from "../loading"
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaOilCan } from "react-icons/fa";
import { GiFlatTire } from "react-icons/gi";
import { FaFilter } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { FaCarBattery } from "react-icons/fa";
import { formatMoney } from "../../utils/helper";
import CardComponent from "../Card";

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
            return <FaOilCan size={32} />
        }

        if (label.toLowerCase().includes("tire")) {
            return <GiFlatTire size={32} />
        }

        if (label.toLowerCase().includes("filter")) {
            return <FaFilter size={32} />
        }
        
        if (label.toLowerCase().includes("battery")) {
            return <FaCarBattery size={32} />
        }

        return <FaCarSide size={32} />
    }
    
    return (
        
        <Grid2 container spacing={2} px={5}>
        {
            isLoading ? 
            <Loader />
            : services?.length ?
            <>
                {
                    services.map((item) => {
                        return ( 
                        <Grid2 display="flex" justifyContent="center" component={Paper}  
                        height={250}
                        width="auto"
                        sx={{
                            flexGrow:1
                        }}
                        key={item.name} size={{ xs: 12, sm: 6, md: 4 }}>
                            <CardComponent 
                                icon={getIcon(item.name)}
                                name={item.name}
                                description={item.description}
                                price={
                                    `${formatMoney(item.price_b)} - ${formatMoney(item.price)}`
                                }
                            />
                        </Grid2>
                        // <Grid2 display="flex" justifyContent="center"  key={item.name} size={{ xs: 12 }}>
                        //      <div>
                        //         <Accordion sx={{ width: "100%", boxShadow: "none",borderBottom: "1px solid gray", marginBottom: "10px" }}>
                        //             <AccordionSummary
                        //             expandIcon={<ExpandMoreIcon />}
                        //             aria-controls="panel2-content"
                        //             id="panel2-header"
                        //             sx={{
                        //                 display: "flex", justifyContent: "center", 
                        //             }}
                        //             >
                        //             <Typography 
                        //                 sx={{ textTransform: "uppercase", letterSpacing: "2px" }} 
                        //                 color="#455a64"
                        //                 fontWeight="500" 
                        //                 variant="h6" component="span">
                        //                 <Box component="span" sx={{ 
                        //                 paddingRight: "10px"
                        //                 }}>{ getIcon(item.name) }</Box>
                        //                 { item.name }
                        //             </Typography>
                        //             </AccordionSummary>
                        //             <AccordionDetails sx={{ width: "70vw", textAlign: "left" }}>
                        //             <Typography sx={{ paddingBottom: "15px" }}>
                        //                 { item.description }
                        //             </Typography>
                        //             {
                                        
                        //             }
                        //             <Chip label={formatMoney(item.price)} color="success" variant="outlined" />
                        //             </AccordionDetails>
                        //         </Accordion>
                        //         </div>
                        // </Grid2>
                        )
                    })
                }
            </> : <></>

        }
        <Grid2></Grid2>
    </Grid2>
    )
}

export default ServicesDisplay;