import { Box, CircularProgress, Paper } from "@mui/material";

const Loader = () => {
    return (
        <Box component={Paper}  marginTop={"10px"} height="400px" display="flex" justifyContent="center" alignItems="center" width={"100%"}>
            <CircularProgress />
        </Box>
    )
}

export default Loader;