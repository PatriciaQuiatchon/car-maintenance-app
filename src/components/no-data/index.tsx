import { Stack, Box, Paper, Typography } from "@mui/material"
import React, { FC } from "react"
import { VscEmptyWindow } from "react-icons/vsc";
interface IEmptyData {
    icon?: React.ReactNode
    label: string
}

const EmptyData:FC<IEmptyData> = ({icon = <VscEmptyWindow />, label}) => {
    return (
        <Stack direction="column" component={Paper} 
            marginTop={"10px"} height="400px" display="flex" justifyContent="center" alignItems="center" width={"100%"}>
            <Box sx={{ fontSize: 100 }} >{icon}</Box>
            <Typography
            sx={{ color: "#1f222a", letterSpacing: 2, textTransform: "uppercase", fontSize:"15px", fontWeight: 600, }}
            >
                {label}
            </Typography>
        </Stack>
    )
}

export default EmptyData