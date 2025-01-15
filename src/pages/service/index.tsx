import { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import { IService, ITable } from "../../interface/shared";
import api from "../../config/api";
import { TableWrapper } from "../../components/table";
import { Box, Button, Grid2, Paper, Typography } from "@mui/material";
import { useAuth } from "../../hooks/authProvider";
import ServiceUpsert from "./component/upsert";
import ConfirmationRemove from "../../components/confirmation";
import TableLoading from "../../components/table-loading";
import { SAVED_MESSAGE } from "../../constant";
import toast from "react-hot-toast";
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';

const Service = () => {

    const auth = useAuth();
    const hasEditAccess = ['admin', 'employee'].includes(auth.role || "")
    
    const initial = {
        description: "", name: "", price: 0, service_id: "",
    }
    
    const [services, setServices] = useState<IService[]>([])
    const [service, setService] = useState<IService>(initial)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);



    const fetchServices = async () => {
        try {
            setIsLoading(!isLoading)
            const response = await api.get("/api/services");
            setServices(response.data)
        } catch (e){

        } finally {
            setIsLoading(false)
        }
    }

    const handleSucces = () => {
        toast.success(SAVED_MESSAGE("Service", "saved"))
        fetchServices();
    }

    const handleEdit = (data: IService) => {
        setIsModalOpen(!isModalOpen)
        setService(data)
    }

    const handleRemove = (id: string) => {
        setService((prev) => ({
            ...prev,
            service_id: id,
        }))
        setIsDelete(!isDelete)
    }

    const removeService = async () => {
        try {
            const response = await api.delete(`/api/service/${service.service_id}`);

            if (response) {
                toast.success(SAVED_MESSAGE("Service", "removed"))
                fetchServices();
            }
        } catch (e){

        } finally {
            setIsDelete(!isDelete)
            setService(initial)
        }
    }

    const handleChangeModal = () => {
        setService(initial)
        setIsModalOpen(!isModalOpen)
    }

    const headers = ['service_id', 'Name', 'Description', 'Price'];
    if (hasEditAccess) {
        headers.push("Action")
    }

    useEffect(() => {
        fetchServices();
    },[])

    const ServiceTable: ITable<IService> = {
        type: "IService",
        headers: ["service_id", "name", "description", "price"],
        rows: services.map(item => [item.service_id, item.name, item.description, item.price]),
        handleEdit: (data) => handleEdit(data),
        handleRemove: (id) => handleRemove(id),
    };
    return (
        <Wrapper>
            <>
            
            <Grid2 spacing={1} container padding={0} margin={0} sx={{ display: 'flex', width:"100%", justifyContent: 'end' }}>
                <Grid2 size={ {xs: 12, sm: 12, md: auth.role === "customer" ? 12 : 7} }>
                    <Typography textAlign="left" variant="h5" textTransform="uppercase" fontWeight={700}>
                    Services
                    </Typography>
                </Grid2>
                
                {
                    hasEditAccess && 
                    <Grid2 size={ {xs: 12, sm: 12, md: 5} }>
                            <Button 
                                startIcon={<MiscellaneousServicesIcon />}
                                sx={{ width: "100%" }}
                                variant="contained" color="success" onClick={() => setIsModalOpen(!isModalOpen)}>
                                New Service
                            </Button>
                    </Grid2>
                }
            </Grid2>
            { 
                isLoading ? <TableLoading columns={ServiceTable.headers.length} />
                :
                services?.length > 0 ? 
                <TableWrapper {...ServiceTable} />
                : <Box component={Paper} height="400px" display="flex" justifyContent="center" alignItems="center" width={"100%"}>
                    <Typography>
                        No available Services
                    </Typography>
                </Box>
            }
            { isModalOpen && (<ServiceUpsert 
                handleCloseModal={handleChangeModal}
                handleSucces={handleSucces}
                isModalOpen={isModalOpen}
                initialData={service}
            />)}
            </>
            {
                isDelete && (
                    <ConfirmationRemove 
                        isOpen={isDelete}
                        onClose={() => setIsDelete(false)}
                        onSubmit={removeService}
                    />
                )
            }
        </Wrapper>
    )
}

export default Service;