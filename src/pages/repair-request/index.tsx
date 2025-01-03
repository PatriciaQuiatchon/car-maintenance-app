import { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import { ITable, IRepaireRequest, IRepaireRequestDetails } from "../../interface/shared";
import api from "../../config/api";
import { TableWrapper } from "../../components/table";
import {Button, Grid2, Typography } from "@mui/material";
import { useAuth } from "../../hooks/authProvider";
import RepaireRequestUpsert from "./component/upsert";
import ConfirmationRemove from "../../components/confirmation";
import EmptyData from "../../components/no-data";
import handleError from "../../components/error";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import TableLoading from "../../components/table-loading";
import toast from "react-hot-toast";
import { SAVED_MESSAGE } from "../../constant";
import CarRepairIcon from '@mui/icons-material/CarRepair';

const RepaireRequest = () => {

    const auth = useAuth();
    
    const initial:IRepaireRequestDetails = {
       name: "", plate_number: "", service_type: "", preferred_schedule: "", request_id: "", model: "", vehicle_name: "",
    }
    
    const [repaireRequests, setRepaireRequests] = useState<IRepaireRequestDetails[]>([])
    const [repaireRequest, setRepaireRequest] = useState<IRepaireRequestDetails>(initial)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            setIsLoading(!isLoading)
            const response = await api.get(`/api/service-requests/${auth.user?.user_id}`);
            setRepaireRequests(response.data?.requests)
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

    const RequestTable: ITable<IRepaireRequest> = {
        type: "IService",
        headers: ["request_id", "name", "preferred_schedule", "service_type", "plate_number"],
        rows:  repaireRequests?.map(item => [item.request_id, `${item.vehicle_name} - ${item.model}`, dayjs(item.preferred_schedule).format("DD/MM/YYYY"), item.service_type, item.plate_number]) || [],
        handleEdit: (data) => handleEdit(data),
        handleRemove: (id) => handleRemove(id),
    };

    return (
        <Wrapper>
            <>
                <Grid2 spacing={1} container padding={0} margin={0} sx={{ display: 'flex', width:"100%", justifyContent: 'end' }}>
                    <Grid2 size={ {xs: 12, sm: 12, md: 9} }>
                        <Typography textAlign="left" variant="h5" textTransform="uppercase" fontWeight={700}>
                            Request Service
                        </Typography>
                    </Grid2>
                    <Grid2 size={ {xs: 12, sm: 12, md: 3} }>
                        <Button 
                            startIcon={<CarRepairIcon />}
                            sx={{ width: "100%" }}
                            variant="contained" color="success" onClick={() => setIsModalOpen(!isModalOpen)}>
                            New Request
                        </Button>
                    </Grid2>
                </Grid2>
            { 
            isLoading ? <TableLoading columns={RequestTable.headers.length} />
            :repaireRequests?.length > 0 ? 
                <TableWrapper {...RequestTable} />
                : <EmptyData>
                    <Typography>
                        No available Requests
                    </Typography>
                </EmptyData>
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