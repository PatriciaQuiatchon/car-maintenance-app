import { useTheme, useMediaQuery, Skeleton, Stack, Paper, Box } from "@mui/material";
import { FC } from "react";

interface ITableLoading {
    columns?: number
}

const TableLoading:FC<ITableLoading> = (props) => {
    const { columns = 3 } = props

    const length = columns
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    
    return (
        <>
            {
                isMobile ? 
                <Stack spacing={2}>
                    <Skeleton animation="wave" variant="rounded" width="auto" height={120} />
                    <Skeleton animation="wave" variant="rounded" width="auto" height={120} />
                    <Skeleton animation="wave" variant="rounded" width="auto" height={120} />
                </Stack>
                :
                <Stack spacing={1} component={Paper} paddingY="15px" paddingX="5px" margin="10px">
                    <Stack direction="row" spacing={4}>
                    {Array.from({ length }, (_, i) => (
                        <Skeleton key={i} animation="wave" variant="rounded" width={`${(100/length)-5}%`} height={30} />
                    ))}
                    </Stack>
                    <Stack direction="row" spacing={1}>
                    {Array.from({ length }, (_, i) => (
                        <Skeleton key={i} animation="wave" variant="rounded" width={`${(100/length)-1}%`} height={20} />
                    ))}
                    </Stack>
                    
                    <Stack direction="row" spacing={3}>
                    {Array.from({ length }, (_, i) => (
                        <Skeleton key={i} animation="wave" variant="rounded" width={`${(100/length)-3}%`} height={20} />
                    ))}
                    </Stack>
                    
                    <Stack direction="row" spacing={3}>
                    {Array.from({ length }, (_, i) => (
                        <Skeleton key={i} animation="wave" variant="rounded" width={`${(100/length)-3}%`} height={20} />
                    ))}
                    </Stack>
                </Stack>
            }
        </>
    )
}

export default TableLoading;