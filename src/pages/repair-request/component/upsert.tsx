import { Formik, Form } from "formik";
import * as Yup from "yup";

import CustomDialog from "../../../components/dialog";
import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

import { FC, useEffect, useState } from "react";
import api from "../../../config/api";
import { IRepaireRequestDetails, IService, IUserDetails, IVehicle } from "../../../interface/shared";
import { useAuth } from "../../../hooks/authProvider";
import { AxiosError } from "axios";
import handleError from "../../../components/error";
import ResponsiveDatePickers from "../../../components/datepicker";
import dayjs from "dayjs";

const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    service_type: Yup.string().required("Service Type is required"),
    preferred_schedule: Yup.date().required("Date is required"),
    available_mechanic: Yup.string(),
    note: Yup.string(),
});

interface IRepaireRequestUpsert {
    initialData: IRepaireRequestDetails
    isModalOpen: boolean
    isSubmitting: boolean
    handleCloseModal: () => void
    handleSucces: () => void
}

interface IOptions {
    label: "",
    value:"",
}

const RepaireRequestUpsert:FC<IRepaireRequestUpsert> = (props) => {

    const auth = useAuth();
    
    const { isModalOpen, isSubmitting, initialData} = props
    const { handleCloseModal, handleSucces } = props

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [carOptions, setCarOptions] = useState<IOptions[]>([])
    const [serviceTypeOptions, setServiceTypeptions] = useState<IOptions[]>([])
    const [mechanicOptions, setMechanics] = useState<IOptions[]>([])


    const fetchData = async () => {
        try {
            setIsLoading(!isLoading)
            const response = await api.get(`/api/service-requests/${auth.user?.user_id}`);
            const { mechanics, services, vehicles } = response.data
            const options = vehicles.map((item:IVehicle) => ({ label: `${item.name} ${item.model} ${item.plate_number}`, value: item.vehicle_id }))
            setCarOptions(options)

            const servicesOptions = services.map((item:IService) => ({ label: `${item.name}`, value: item.service_id }))
            setServiceTypeptions(servicesOptions)

            
            const mechanicsOps = mechanics.map((item:IUserDetails) => ({ label: `${item.name}`, value: item.user_id }))
            setMechanics(mechanicsOps)
        } catch (error){
            handleError(error as AxiosError); 
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (isModalOpen) {
            fetchData()
        }
    }, [isModalOpen])
    return (
        <Formik
            key={JSON.stringify(initialData)} 
            initialValues={initialData}
            enableReinitialize={true}
            validationSchema={schema}
            onSubmit={async (values) => {
                if (initialData.request_id === "") {
                    try {
                        const response = await api.post(`/api/service-request/${auth.user?.user_id}`, values);
                        handleSucces();
                        handleCloseModal();
    
                        throw new Error(response.data.message);
                      } catch (err) {
                        console.error(err);
                    }
                } else {
                    try {
                        const response = await api.put(`/api/service-request/${initialData.request_id}`, values);
                        handleSucces();
                        handleCloseModal();
    
                        throw new Error(response.data.message);
                      } catch (err) {
                        console.error(err);
                    }
                }
            }}
            >
            {(formik) => {
                const { errors, touched, isValid, dirty, values, handleSubmit, handleBlur, handleChange, setFieldValue } = formik;
                return (
                    <Form onSubmit={handleSubmit} style={{width: "1000px"}}>
                        
                        <CustomDialog 
                            title="Register Vehicle"
                            isOpen={isModalOpen}
                            isSubmitting={isSubmitting}
                            handleClose={handleCloseModal}
                            handleSubmit={handleSubmit}
                            isSubmitButtonDisabled={!(dirty && isValid)}
                        >
                        <Stack className="form-row" spacing={2} mb={2}>
                             <FormControl fullWidth>
                                <InputLabel id="input-car">Car</InputLabel>
                                <Select
                                    labelId="input-car"
                                    name="name"
                                    id="name"
                                    value={values.name}
                                    label="Car"
                                    onChange={handleChange}
                                    error={errors.name && touched.name || undefined}
                                    onBlur={handleBlur}
                                    className={errors.name && touched.name ? "input-error" : ""}
                                >   
                                    {   
                                        carOptions.map(({label, value}) => {
                                            return (
                                                <MenuItem value={value}>{label}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                                </FormControl>
                                { errors.name && touched.name && (
                                    <span className="error">{errors.name}</span>
                                ) }
                            <FormControl fullWidth>
                                <InputLabel id="input-service">Service Type</InputLabel>
                                <Select
                                    labelId="input-service"
                                    name="service_type"
                                    id="service_type"
                                    value={values.service_type}
                                    label="Service Type"
                                    onChange={handleChange}
                                    error={errors.service_type && touched.service_type || undefined}
                                    onBlur={handleBlur}
                                    className={errors.service_type && touched.service_type ? "input-error" : ""}
                                >   
                                    {   
                                        serviceTypeOptions.map(({label, value}) => {
                                            return (
                                                <MenuItem value={value}>{label}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                                </FormControl>
                                { errors.service_type && touched.service_type && (
                                    <span className="error">{errors.service_type}</span>
                                ) }
                            <FormControl fullWidth>
                                <InputLabel id="input-mechanic">Mechanics</InputLabel>
                                <Select
                                    labelId="input-mechanic"
                                    name="available_mechanic"
                                    id="available_mechanic"
                                    value={values.available_mechanic}
                                    label="Service Type"
                                    onChange={handleChange}
                                    error={errors.available_mechanic && touched.available_mechanic || undefined}
                                    onBlur={handleBlur}
                                    className={errors.available_mechanic && touched.available_mechanic ? "input-error" : ""}
                                >   
                                    {   
                                        mechanicOptions.map(({label, value}) => {
                                            return (
                                                <MenuItem value={value}>{label}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                                </FormControl>
                                { errors.available_mechanic && touched.available_mechanic && (
                                    <span className="error">{errors.available_mechanic}</span>
                                ) }
                            <FormControl fullWidth>
                                <ResponsiveDatePickers 
                                    label="Select a Date"
                                    value={dayjs(values.preferred_schedule)}
                                    onChange={(newValue) => setFieldValue('preferred_schedule', newValue)} // Update Formik state
                                    error={touched.preferred_schedule && Boolean(errors.preferred_schedule)} // Show error if touched and invalid
                                    helperText={touched.preferred_schedule && errors.preferred_schedule}
                                />
                                { errors.preferred_schedule && touched.preferred_schedule && (
                                    <span className="error">{errors.preferred_schedule}</span>
                                ) }
                            </FormControl>
                            <TextareaAutosize  
                                name="note"
                                id="note"
                                onBlur={handleBlur}
                                value={values.note}
                                style={{
                                    color: "black",
                                    backgroundColor: "white"
                                }}
                                onChange={handleChange}
                                aria-label="enter note" 
                                minRows={3} 
                                placeholder="Enter Note" 
                            />
                        </Stack>
                        </CustomDialog>

                    </Form>
                );
            }}
        </Formik>
    )
}

export default RepaireRequestUpsert