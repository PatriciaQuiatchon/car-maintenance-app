import { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import { ITable, IRepaireRequest, IRepaireRequestDetails, IService } from "../../interface/shared";
import api from "../../config/api";
import { TableWrapper } from "../../components/table";
import {Button, Chip, Grid2, Stack, Typography } from "@mui/material";
import { useAuth } from "../../hooks/authProvider";
import RepaireRequestUpsert from "./component/upsert";
import ConfirmationRemove from "../../components/confirmation";
import EmptyData from "../../components/no-data";
import handleError from "../../components/error";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { SAVED_MESSAGE } from "../../constant";
import CarRepairIcon from '@mui/icons-material/CarRepair';
import { GiAutoRepair } from "react-icons/gi";
import Loader from "../../components/loading";
import { formatMoney, parseMoney } from "../../utils/helper";


const RepaireRequest = () => {

    const auth = useAuth();
    
    const initial:IRepaireRequestDetails = {
       name: "", plate_number: "", service_type: "", preferred_schedule: "", 
       request_id: "", model: "", vehicle_name: "",  vehicle_id: "",
       service_id: "", year: "",
    }
    
    const [repaireRequests, setRepaireRequests] = useState<IRepaireRequestDetails[]>([])
    const [serviceData, setServiceData] = useState<IService[]>([])
    const [repaireRequest, setRepaireRequest] = useState<IRepaireRequestDetails>(initial)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedStatus, setSelectedStatus] = useState<string>("PENDING");

    const fetchData = async () => {
        
        try {
            setIsLoading(!isLoading)
            let href = `/api/service-requests/`
            if (selectedStatus) {
                href += `?status=${selectedStatus}`
            }
            const response = await api.get(href);
            setRepaireRequests(response.data?.requests)
            setServiceData(response.data?.services)
        } catch (error){
            handleError(error as AxiosError); 
        } finally {
            setIsLoading(false)
        }
    }

    const handleSucces = () => {
        toast.success(SAVED_MESSAGE("Request", "sent"))
        fetchData();
    }

    const handleEdit = (data: IRepaireRequest) => {
        setIsModalOpen(!isModalOpen)
        setRepaireRequest(data)
    }

    const handleRemove = (id: string) => {
        setRepaireRequest((prev) => ({
            ...prev,
            request_id: id,
        }))
        setIsDelete(!isDelete)
    }

    const refreshPage = async () => {
        await auth.getUserProfile();
    }
    useEffect(() => {
        refreshPage();
    }, [])

    useEffect(() => {
        auth.user?.user_id && fetchData();
    }, [auth.user?.user_id])

    const removeRepaireRequest = async () => {
        try {
            const response = await api.delete(`/api/service-request/${repaireRequest.request_id}`);

            if (response) {
                toast.success(SAVED_MESSAGE("Request", "removed"))
                fetchData();
            }
        } catch (e){

        } finally {
            setIsDelete(!isDelete)
            setRepaireRequest(initial)
        }
    }

    const handleChangeModal = () => {
        setRepaireRequest(initial)
        setIsModalOpen(!isModalOpen)
    }

    const handleChangeStatus = async (data: IRepaireRequest, status: string) => {
        await api.post(`/api/service-request/change/${data.request_id}`, {
            ...data, price: parseMoney(data?.price || ""), request_status: status, user_id: data.requested_by_id
        });
        toast.success(SAVED_MESSAGE("Status", "changed"))
        fetchData();
    }

    const requestHeaders:  (keyof IRepaireRequest)[] = ["request_id","service_id", "vehicle_id", "name",  "plate_number", "preferred_schedule", "service_type", "price", "request_status"]
    if (auth.role != "customer") {
        requestHeaders.push("requested_by")
        requestHeaders.push("requested_by_id")
    }

    requestHeaders.push()

    const generateServiceName = (serviceIds: string) => {
        const dataSplit = serviceIds.split(", ")
        const serviceNames = dataSplit.map(item => serviceData.find(data => data.service_id === item)?.name || "")
        return serviceNames.join(", ")
    }
    const requestRows = repaireRequests?.map(item => {
        const formattedMoney = Number(item?.price || 0)
        const data = [
            item.request_id, 
            item.service_id,
            item.vehicle_id,
            `${item.vehicle_name} - ${item.model} - ${item.year || ""}`,
            item.plate_number,
            dayjs(item.preferred_schedule).format("DD/MM/YYYY"), 
            generateServiceName(item?.service_ids || ""),
            formattedMoney != 0 ? formatMoney(formattedMoney) : "Price not set",
            item.request_status?.toUpperCase() || "PENDING",
        ]
        if (auth.role !== "customer") {
            data.push(item?.requested_by || "")
            data.push(item?.requested_by_id || "")
        }
        return data;
    }
    
    ) || []

    const RequestTable: ITable<IRepaireRequest> = {
        type: "IService",
        headers: requestHeaders,
        rows:  requestRows,
        handleEdit: (data) => handleEdit(data),
        handleRemove: (id) => handleRemove(id),
        handleChange: (data, status) => handleChangeStatus(data, status),
        hideUserID: true,
    };

    useEffect(() => {
        selectedStatus && fetchData();
    }, [selectedStatus])

    return (
        <Wrapper>
            <>
                <Grid2 spacing={1} container padding={0} margin={0} sx={{ display: 'flex', width:"100%", justifyContent: 'end' }}>
                    <Grid2 size={ {xs: 12, sm: 12, md:  auth.role == "customer" ? 8 : 12} }>
                        <Typography textAlign="left" variant="h5" textTransform="uppercase" fontWeight={700} color="white" >
                            Request Service
                        </Typography>
                    </Grid2>
                   { auth.role == "customer" && <Grid2 size={ {xs: 12, sm: 12, md: 4} }>
                        <Button 
                            startIcon={<CarRepairIcon />}
                            sx={{ width: "100%" }}
                            variant="contained" color="success" onClick={() => setIsModalOpen(!isModalOpen)}>
                            New Request
                        </Button>
                    </Grid2>}
                </Grid2>
            <Stack direction="row" spacing={1} marginY={2}>
                {
                    ["PENDING", "IN PROGRESS", "DONE"].map((item) => {
                        return (
                            <Chip label={item} 
                            id={item}
                            color={selectedStatus === item ? "info" : "primary"} 
                            variant={selectedStatus === item ? "filled" : "outlined"} 
                            sx={{ fontSize:"16px", fontWeight: 700 }}
                            onClick={() => { setSelectedStatus(item) }} />
                        )
                    })
                }
                {/* <Chip label={"PENDING"} 
                    sx=
                    color={selectedStatus === "PENDING" ? "primary" : "default"} onClick={() => { setSelectedStatus("PENDING") }} />
                <Chip label={"IN PROGRESS"} color={selectedStatus === "IN PROGRESS" ? "primary" : "default"} onClick={() => { setSelectedStatus("IN PROGRESS") }} />
                <Chip label={"DONE"} color={selectedStatus === "DONE" ? "primary" : "default"} onClick={() => { setSelectedStatus("DONE") }} /> */}
            </Stack>
            { 
            isLoading ? <Loader />
            :repaireRequests?.length > 0 ? 
                <TableWrapper {...RequestTable} />
                : <EmptyData icon={<GiAutoRepair />} label="No available Requests" />
            }
            { isModalOpen && (<RepaireRequestUpsert 
                handleCloseModal={handleChangeModal}
                handleSucces={handleSucces}
                isModalOpen={isModalOpen}
                initialData={repaireRequest}
            />)}
            </>
            {
                isDelete && (
                    <ConfirmationRemove 
                        isOpen={isDelete}
                        onClose={() => setIsDelete(false)}
                        onSubmit={removeRepaireRequest}
                    />
                )
            }
        </Wrapper>
    )
}

export default RepaireRequest;