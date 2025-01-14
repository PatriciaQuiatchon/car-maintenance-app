import { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import { IServiceHistory, ITable } from "../../interface/shared";
import api from "../../config/api";
import { TableWrapper } from "../../components/table";
import { Typography } from "@mui/material";
import { useAuth } from "../../hooks/authProvider";
// import UserUpsert from "./component/upsert";
import ConfirmationRemove from "../../components/confirmation";
import EmptyData from "../../components/no-data";
import handleError from "../../components/error";
import { AxiosError } from "axios";
import TableLoading from "../../components/table-loading";

const ServiceHistory = () => {

    const auth = useAuth();
    // const _hasEditAccess = ['admin', 'employee'].includes(auth.role || "")
    
    const initial:IServiceHistory = {
       car_name: "", date: "", history_id: "",
       name: "", plate_number: "", amount: "",
       service: "", user_name: "",
    }
    
    const [histories, setHistories] = useState<IServiceHistory[]>([])
    const [_serviceHistory, setHistory] = useState<IServiceHistory>(initial)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [_isSubmitting, _setIsSubmitting] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // const [_role, setRole] = useState<string>("admin")


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
        headers: ["history_id", "date", "name", "car_name", "plate_number", "service", "amount"],
        rows:  histories.map(item => [item.history_id, item.date, item.name, item.car_name, item.plate_number, item.service, item.amount]),
        handleEdit: (data) => handleEdit(data),
        handleRemove: (id) => handleRemove(id),
    };

    return (
        <Wrapper>
            <>
            {/* {
                hasEditAccess && 
                <Grid2 spacing={1} container padding={0} margin={0} sx={{ display: 'flex', marginLeft:"20px", width:"100%", justifyContent: 'space-between' }}>
                    <Grid2 size={ {xs: 11, sm: 11, md: 3} }>
                        <Select
                            sx={{ width: "100%", height: "40px" }}
                            labelId="demo-simple-select-label"
                            name="role"
                            id="role"
                            value={role}
                            onChange={(event) => handleChangeRole(event.target.value)}
                        >
                            <MenuItem value={"admin"}>Admin</MenuItem>
                            <MenuItem value={"employee"}>Employee</MenuItem>
                            <MenuItem value={"user"}>User</MenuItem>
                        </Select>

                    </Grid2>
                    <Grid2 size={ {xs: 11, sm: 11, md: 3} }>
                        <Button 
                            sx={{ width: "100%" }}
                            variant="contained" color="success" onClick={() => setIsModalOpen(!isModalOpen)}>
                            New User
                        </Button>
                    </Grid2>
                </Grid2>
            } */}
            { 
            isLoading ? <TableLoading columns={HistoryTable.headers.length} />
            :
            histories?.length > 0 ? 
                <TableWrapper {...HistoryTable} />
                : <EmptyData>
                    <Typography>
                        No available History
                    </Typography>
                </EmptyData>
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