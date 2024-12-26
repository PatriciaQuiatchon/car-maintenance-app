import { Box, Paper } from "@mui/material"
import React, { FC } from "react"

interface IEmptyData {
    children: React.ReactNode
}

const EmptyData:FC<IEmptyData> = ({children}) => {
    return (
        <Box component={Paper} marginTop={"10px"} height="400px" display="flex" justifyContent="center" alignItems="center" width={"100%"}>
            {children}
        </Box>
    )
}

export default EmptyData