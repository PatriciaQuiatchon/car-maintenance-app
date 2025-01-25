import { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import api from "../../config/api";
import Loader from "../../components/loading";
import EmptyData from "../../components/no-data";
import handleError from "../../components/error";
import { AxiosError } from "axios";
import { Chip, Grid2, Stack, Typography } from "@mui/material";
import { useAuth } from "../../hooks/authProvider";
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ArcElement
  } from 'chart.js';

interface ICount {
    name: string
    count: number
}
interface IData{
    history: ICount[]
    request: ICount[]
}

interface ISales {
    total_sales: number;
    week_number?: number;
    month_number?: number;
    month_name?: string;
    year: number;
  }

interface IresponseChart {
    totalSales: ISales[]
}
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
const Dashboard = () => {
    const auth = useAuth();
    const isCustomer = auth.role === "customer"
    const [dashboardData, setData] = useState<IData>({
        history: [], request: [],
    })
    const [salesData, setDataSales] = useState<IresponseChart>({
        totalSales: [],
    })
    const { history, request } = dashboardData

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingSales, setIsLoadingSales] = useState<boolean>(false);

    const [salesChart, setSalesChart] = useState<ChartData<'line'>>()
    const [historyChart, setHistoryChart] = useState<ChartData<'bar'>>()
    const [requestChart, setRequestChart] = useState<ChartData<'pie'>>()
    const [type, setType] = useState<"week" | "month" | "year">("week")
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
    const fetchSales = async () => {
        try {
            setIsLoadingSales(!isLoadingSales)

        const responseSales = await api.get<IresponseChart>(`/api/sales?type=${type}`);
        setDataSales(responseSales.data)

        } catch (err) {

        } finally {
            setIsLoadingSales(false)
        }
    }
    useEffect(()=>{
        fetchSales()
    },[type])

    useEffect(()=>{

        const labels = salesData.totalSales.map((item) =>
            type === 'week'
            ? `Week ${item.week_number}, ${item.year}`
            : type === 'month'
            ? `${item.month_name} ${item.year}`
            : `Year ${item.year}`
        );

        const values = salesData.totalSales.map((item) => item?.total_sales);
        setSalesChart({
            labels,
            datasets: [
            {
                label: 'Total Sales',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            ],
        });
        
    }, [salesData.totalSales])

    useEffect(()=>{
        setRequestChart(
            {
                labels: ['Pending', 'In Progress', 'Done'],
                datasets: [
                  {
                    label: '# of Request',
                    data: [
                        request.find(item => item.name.toLowerCase() === "pending")?.count || 0, 
                        request.find(item => item.name.toLowerCase() === "in progress")?.count || 0,
                        request.find(item => item.name.toLowerCase() === "done")?.count || 0,
                        ],
                    backgroundColor: [
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 206, 86, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1,
                },
                ],
              }
        )

        setHistoryChart({
            labels: history.map(item => item.name),
            datasets: [
            {
                label: 'Total History',
                data: history.map(item => item?.count || 0), 
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            ],
        });
    }, [history, request])

    useEffect(() => {
        fetchData()
    }, [])

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
                    isLoading || isLoadingSales ? <Loader /> :
                    <>
                    <Grid2 container sx={{ mt:5, }} spacing={2}>
                        <Grid2 size={{ xs: 12, md:6 }}>
                        {requestChart  ? 
                        <Stack direction="column" display="flex" justifyContent="center" sx={{ height: { xs: "50vh", md: "50vh" } }} spacing={2}>
                            <Pie data={requestChart} options={{ responsive: true,
                                plugins: {
                                    title: {
                                      display: true,
                                      text: "Total Requests",
                                      font: {
                                        size: 18, 
                                        weight: "bold", 
                                      },
                                      padding: {
                                        top: 10,
                                        bottom: 20,
                                      },
                                    },
                                  },
                             }} />
                        </Stack>
                        :
                        <EmptyData 
                            label={"No available request data"}
                        />
                        }
                        </Grid2>
                       {!isCustomer && 
                        <Grid2 size={{ xs: 12, md:6 }}>
                            {
                                salesChart && 
                                <Stack spacing={2}>
                                <Stack direction="row" spacing={1}>
                                    <Chip onClick={()=> setType("week")} label="Week" />
                                    <Chip onClick={()=> setType("month")} label="Month" />
                                    <Chip onClick={()=> setType("year")} label="Year" />
                                </Stack>
                                <Line
                                    data={salesChart}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: { position: 'top' },
                                        },
                                        scales: {
                                            x: { title: { display: true, text: type === 'week' ? 'Week' : type === 'month' ? 'Month' : 'Year' } },
                                            y: { title: { display: true, text: 'Total Sales', font: {
                                                size: 18, 
                                                weight: "bold", 
                                              },
                                              padding: {
                                                top: 10,
                                                bottom: 20,
                                              }, } },
                                        },
                                    }}
                                />
                                </Stack>
                            }
                        </Grid2>}
                   </Grid2>
                    {historyChart ? 
                    <Stack display="flex" justifyContent="center" spacing={1} mt={3}>
                        {
                            <Stack sx={{ height:"350px" }}>
                            <Bar
                                data={historyChart}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { position: 'top' },
                                        // title: {
                                        //   display: true,
                                        //   text: "Total Histories",
                                        //   font: {
                                        //     size: 18, 
                                        //     weight: "bold", 
                                        //   },
                                        //   padding: {
                                        //     top: 10,
                                        //     bottom: 20,
                                        //   },
                                        // },
                                      },
                                    scales: {
                                        y: { title: { display: true, text: 'Total History', font: {
                                            size: 18, 
                                            weight: "bold", 
                                          },
                                          padding: {
                                            top: 10,
                                            bottom: 20,
                                          }, } },
                                    },
                                }}
                            />
                            </Stack>
                        }
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