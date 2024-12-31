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
import Loader from "../../components/loading";
import dayjs from "dayjs";

const RepaireRequest = () => {

    const auth = useAuth();
    
    const initial:IRepaireRequestDetails = {
       name: "", plate_number: "", service_type: "", preferred_schedule: "", request_id: "", model: "", vehicle_name: "",
    }
    
    const [repaireRequests, setRepaireRequests] = useState<IRepaireRequestDetails[]>([])
    const [repaireRequest, setRepaireRequest] = useState<IRepaireRequestDetails>(initial)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isSubmitting, _setIsSubmitting] = useState<boolean>(false);
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
        fetchData();
    }

    const handleEdit = (data: IRepaireRequest) => {
        setIsModalOpen(!isModalOpen)
        setRepaireRequest(data)
    }

    const handleRemove = (id: string) => {
        setRepaireRequest((prev) => ({
            ...prev,
            repaireRequest_id: id,
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
            const response = await api.delete(`/api/repaireRequest/${repaireRequest.request_id}`);

            if (response) {
                fetchData();
            } else {
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

    const UserTable: ITable<IRepaireRequest> = {
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
                    <Grid2 size={ {xs: 12, sm: 12, md: 3} }>
                        <Button 
                            sx={{ width: "100%" }}
                            variant="contained" color="success" onClick={() => setIsModalOpen(!isModalOpen)}>
                            New Request
                        </Button>
                    </Grid2>
                </Grid2>
            { !isLoading ?  repaireRequests?.length > 0 ? 
                <TableWrapper {...UserTable} />
                : <EmptyData>
                    <Typography>
                        No available Requests
                    </Typography>
                </EmptyData>
                : <Loader />
            }
            { isModalOpen && (<RepaireRequestUpsert 
                handleCloseModal={handleChangeModal}
                handleSucces={handleSucces}
                isModalOpen={isModalOpen}
                isSubmitting={isSubmitting}
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