import { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import { IServiceHistory, ITable } from "../../interface/shared";
import api from "../../config/api";
import { TableWrapper } from "../../components/table";
import { Grid2, Typography } from "@mui/material";
import { useAuth } from "../../hooks/authProvider";
// import UserUpsert from "./component/upsert";
import ConfirmationRemove from "../../components/confirmation";
import EmptyData from "../../components/no-data";
import handleError from "../../components/error";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { FaHistory } from "react-icons/fa";
import Loader from "../../components/loading";

const ServiceHistory = () => {

    const auth = useAuth();
    // const _hasEditAccess = ['admin', 'employee'].includes(auth.role || "")
    
    const initial:IServiceHistory = {
       car_name: "", date: "", history_id: "",
       name: "", plate_number: "", amount: "",
       service_name: "", user_name: "",
    }
    
    const [histories, setHistories] = useState<IServiceHistory[]>([])
    const [_serviceHistory, setHistory] = useState<IServiceHistory>(initial)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [_isSubmitting, _setIsSubmitting] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const fetchServiceHistory = async () => {
        try {
            setIsLoading(!isLoading)
            const isUser = auth.role === "customer"
            const response = await api.get(`/api/history/${isUser ? auth.user?.user_id : ""}`);
            setHistories(response.data)
        } catch (error){
            handleError(error as AxiosError); 
        } finally {
            setIsLoading(false)
        }
    }

    // const _handleChangeRole = (role:string) => {
    //     setRole(role)
    // }

    const handleEdit = (data: IServiceHistory) => {
        setIsModalOpen(!isModalOpen)
        setHistory(data)
    }

    const handleRemove = (id: string) => {
        setHistory((prev) => ({
            ...prev,
            user_id: id,
        }))
        setIsDelete(!isDelete)
    }

    const refreshPage = async () => {
        if(!auth.user?.user_id) {
            await auth.getUserProfile();
        }
    }
    useEffect(() => {
        refreshPage();
    }, [])

    useEffect(() => {
        auth.user?.user_id && fetchServiceHistory();
    }, [auth.user?.user_id])

    const removeHistory = async () => {
        try {
            const response = await api.delete(`/api/history/${history}`);

            if (response) {
                fetchServiceHistory();
            } else {
            }
        } catch (e){

        } finally {
            setIsDelete(!isDelete)
            setHistory(initial)
        }
    }

    const HistoryTable: ITable<IServiceHistory> = {
        type: "IServiceHistory",
        headers: ["history_id", "date", "customer", "car", "plate_number", "service", "amount"],
        rows:  histories.map(item => [item.history_id, dayjs(item.date).format("YYYY/MM/DD"), item.user_name, item.car_name, item.plate_number, item.service_name, item.amount]),
        handleEdit: (data) => handleEdit(data),
        handleRemove: (id) => handleRemove(id),
    };

    return (
        <Wrapper>
            <>
            <Grid2 spacing={1} container padding={0} margin={0} sx={{ display: 'flex', width:"100%", justifyContent: 'end' }}>
                <Grid2 size={ {xs: 12, sm: 12, md: auth.role === "customer" ? 12 : 7} }>
                    <Typography textAlign="left" variant="h5" textTransform="uppercase" fontWeight={700}>
                    History
                    </Typography>
                </Grid2>
            </Grid2>
            { 
            isLoading ? <Loader />
            :
            histories?.length > 0 ? 
                <TableWrapper {...HistoryTable} />
                : <EmptyData icon={<FaHistory />} label="No available History" />
            }
            {/* { isModalOpen && (<UserUpsert 
                handleCloseModal={handleChangeModal}
                handleSucces={handleSucces}
                isModalOpen={isModalOpen}
                isSubmitting={isSubmitting}
                initialData={serviceHistory}
            />)} */}
            </>
            {
                isDelete && (
                    <ConfirmationRemove 
                        isOpen={isDelete}
                        onClose={() => setIsDelete(false)}
                        onSubmit={removeHistory}
                    />
                )
            }
        </Wrapper>
    )
}

export default ServiceHistory;