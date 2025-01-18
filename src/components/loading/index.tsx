import { Box } from "@mui/material";
import './style.css'
const Loader = () => {
    return (
        <Box display="flex" 
        justifyContent="center" 
        alignItems="center"
        height="350px" width="100%">
            <Box width="100%">
                <div className="loader"></div>

            </Box>
        </Box>
    )
}

export default Loader;