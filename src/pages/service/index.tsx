import { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import { IService, ITable } from "../../interface/shared";
import api from "../../config/api";
import { TableWrapper } from "../../components/table";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useAuth } from "../../hooks/authProvider";
import ServiceUpsert from "./component/upsert";
import ConfirmationRemove from "../../components/confirmation";

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
    const [isSubmitting, _setIsSubmitting] = useState<boolean>(false);
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
            {
                hasEditAccess && 
                <Box sx={{ display: 'flex', marginBottom:"5px", marginRight:"5px", justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="success" onClick={() => setIsModalOpen(!isModalOpen)}>
                        New Service
                    </Button>
                </Box>
            }
            { services?.length > 0 ? 
            <TableWrapper {...ServiceTable} />
            // <CustomTable 
            //     handleEdit={(data: IService) => handleEdit(data)}
            //     handleRemove={(id: string) => handleRemove(id)}
            //     headers={headers}
            //     rows={
            //         services.map(item => [item.service_id, item.name, item.description, item.price])
            //     }
            // />
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
                isSubmitting={isSubmitting}
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