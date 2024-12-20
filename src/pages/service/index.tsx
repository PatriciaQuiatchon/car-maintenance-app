import { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import { IService } from "../../interface/shared";
import api from "../../config/api";
import CustomTable from "../../components/table";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useAuth } from "../../hooks/authProvider";
import CustomDialog from "../../components/dialog";

const Service = () => {

    const auth = useAuth();
    const hasEditAccess = ['admin', 'employee'].includes(auth.role || "")
    const [services, setServices] = useState<IService[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const fetchServices = async () => {
        try {
            setIsLoading(!isLoading)
            const response = await api.get("/api/services");
            console.log({response})
        } catch (e){

        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = () => {

    }

    const handleChangeModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const headers = ['Name', 'Description', 'Price', 'Action'];
    

    useEffect(() => {
        fetchServices();
    },[])
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
            { services?.length > 0 ? <CustomTable 
                headers={headers}
                rows={
                    services.map(item => [item.service_id, item.name, item.description, item.price])
                }
            />
            : <Box component={Paper} height="400px" display="flex" justifyContent="center" alignItems="center" width={"100%"}>
                <Typography>
                    No available Services
                </Typography>
            </Box>
            }
            <CustomDialog 
                title="New Services"
                isOpen={isModalOpen}
                isSubmitting={isSubmitting}
                handleClose={handleChangeModal}
                handleSubmit={handleSubmit}
            >
                <></>
            </CustomDialog>
            </>
        </Wrapper>
    )
}

export default Service;