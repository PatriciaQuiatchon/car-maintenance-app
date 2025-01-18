import { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import api from "../../config/api";
import Loader from "../../components/loading";
import EmptyData from "../../components/no-data";
import { BarChart } from '@mui/x-charts/BarChart';
import handleError from "../../components/error";
import { AxiosError } from "axios";
import { PieChart } from "@mui/x-charts";
import { Grid2, Stack, Typography } from "@mui/material";
import { useAuth } from "../../hooks/authProvider";

interface ICount {
    name: string
    count: number
}
interface IData{
    history: ICount[]
    request: ICount[]
}

const Dashboard = () => {
    const auth = useAuth();

    const [dashboardData, setData] = useState<IData>({
        history: [], request: [],
    })
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            setIsLoading(!isLoading)
            const response = await api.get("/api/dashboard");
            setData(response.data)
        } catch (error){
            handleError(error as AxiosError); 
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    const { history, request } = dashboardData
    return (
        <Wrapper>
            <>
                <Grid2 container padding={0} margin={0} sx={{ display: 'flex', width:"100%",  }}>
                    <Grid2 size={ {xs: 12, sm: 12, md: auth.role === "customer" ? 12 : 7} }>
                        <Typography textAlign="left" variant="h5" textTransform="uppercase" fontWeight={700}>
                        Dashboard
                        </Typography>
                    </Grid2>
                </Grid2>
                {
                    isLoading ? <Loader /> :
                    <>
                    {request?.length !== 0  ? 
                    <Stack display="flex" justifyContent="center" spacing={2}>
                        <Typography
                            sx={{ color: "#1f222a", letterSpacing: 2, textTransform: "uppercase", fontSize:"20px", fontWeight: 600, }}
                        >
                            Request Status
                        </Typography>
                        <PieChart
                            series={[
                            {
                                data: [
                                { id: 0, value: request.find(item => item.name.toLowerCase() === "pending")?.count || 0, label: 'PENDING' },
                                { id: 1, value: request.find(item => item.name.toLowerCase() === "in progress")?.count || 0, label: 'IN PROGRESS' },
                                { id: 2, value: request.find(item => item.name.toLowerCase() === "done")?.count || 0, label: 'DONE' },
                                ],
                            },
                            ]}
                            width={700}
                            height={200}
                        /> 
                    </Stack>
                    :
                    <EmptyData 
                        label={"No available request data"}
                    />
                    
                    }

                    {history?.length !== 0  ? 
                    <Stack display="flex" justifyContent="center" spacing={1} mt={8}>
                        <Typography
                            sx={{ color: "#1f222a", letterSpacing: 2, textTransform: "uppercase", fontSize:"20px", fontWeight: 600, }}
                        >
                            Service History
                        </Typography>
                        <BarChart
                            width={700}
                            height={300}
                            series={[
                                { data: history.map(item => item.count),  },
                            ]}
                            xAxis={[{ data: history.map(item => item.name), scaleType: 'band' }]}
                        /> 
                    </Stack>
                    :
                    <EmptyData 
                        label={"No available Data"}
                    />}
                    </>
                }
            </>
        </Wrapper>
    )
}

export default Dashboard;