import { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import { ITable, IVehicle } from "../../interface/shared";
import api from "../../config/api";
import { TableWrapper } from "../../components/table";
import {Button, Grid2, Typography } from "@mui/material";
import { useAuth } from "../../hooks/authProvider";
import VehicleUpsert from "./component/upsert";
import ConfirmationRemove from "../../components/confirmation";
import EmptyData from "../../components/no-data";
import handleError from "../../components/error";
import { AxiosError } from "axios";
import Loader from "../../components/loading";

const Vehicle = () => {

    const auth = useAuth();
    
    const initial:IVehicle = {
       name: "", model: "", plate_number: "", type: "", vehicle_id: "", user_id: "",
    }
    
    const [vehicles, setVehicles] = useState<IVehicle[]>([])
    const [vehicle, setVehicle] = useState<IVehicle>(initial)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isSubmitting, _setIsSubmitting] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            setIsLoading(!isLoading)
            const response = await api.get(`/api/vehicles/${auth.user?.user_id}`);
            setVehicles(response.data)
        } catch (error){
            handleError(error as AxiosError); 
        } finally {
            setIsLoading(false)
        }
    }

    const handleSucces = () => {
        fetchData();
    }

    const handleEdit = (data: IVehicle) => {
        setIsModalOpen(!isModalOpen)
        setVehicle(data)
    }

    const handleRemove = (id: string) => {
        setVehicle((prev) => ({
            ...prev,
            vehicle_id: id,
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

    const removeVehicle = async () => {
        try {
            const response = await api.delete(`/api/vehicle/${vehicle.vehicle_id}`);

            if (response) {
                fetchData();
            } else {
            }
        } catch (e){

        } finally {
            setIsDelete(!isDelete)
            setVehicle(initial)
        }
    }

    const handleChangeModal = () => {
        setVehicle(initial)
        setIsModalOpen(!isModalOpen)
    }

    const UserTable: ITable<IVehicle> = {
        type: "IService",
        headers: ["vehicle_id", "name", "type", "model", "plate_number"],
        rows:  vehicles.map(item => [item.vehicle_id, item.name, item.type, item.model, item.plate_number]),
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
                            Register Vehicle
                        </Button>
                    </Grid2>
                </Grid2>
            { !isLoading ?  vehicles?.length > 0 ? 
                <TableWrapper {...UserTable} />
                : <EmptyData>
                    <Typography>
                        No available Vehicles
                    </Typography>
                </EmptyData>
                : <Loader />
            }
            { isModalOpen && (<VehicleUpsert 
                handleCloseModal={handleChangeModal}
                handleSucces={handleSucces}
                isModalOpen={isModalOpen}
                isSubmitting={isSubmitting}
                initialData={vehicle}
            />)}
            </>
            {
                isDelete && (
                    <ConfirmationRemove 
                        isOpen={isDelete}
                        onClose={() => setIsDelete(false)}
                        onSubmit={removeVehicle}
                    />
                )
            }
        </Wrapper>
    )
}

export default Vehicle;