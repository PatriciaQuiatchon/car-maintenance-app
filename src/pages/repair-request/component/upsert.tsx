import { Formik, Form } from "formik";
import * as Yup from "yup";

import CustomDialog from "../../../components/dialog";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

import { FC, useEffect, useState } from "react";
import api from "../../../config/api";
import { IRepaireRequestDetails, IRepairUpdate, IService, IUserDetails, IVehicle } from "../../../interface/shared";
import { useAuth } from "../../../hooks/authProvider";
import { AxiosError } from "axios";
import handleError from "../../../components/error";
import ResponsiveDatePickers from "../../../components/datepicker";
import dayjs from "dayjs";

const schema = Yup.object().shape({
    vehicle_id: Yup.string().required("Vehicle is required"),
    service_id: Yup.lazy((value) => {
        if (Array.isArray(value)) {
            return Yup.string()
                .transform((val) => val.join(','))
                .required("Service is required");
        }
        return Yup.string().required("Service is required");
    }),
    mechanic_id: Yup.string().required("Mechanic is required"),
    preferred_schedule: Yup.date().required("Date is required"),
    notes: Yup.string(),
});

const mechanicSchema = Yup.object().shape({
    request_status: Yup.string().required("Status is required"),
    mechanic_notes: Yup.date().required("notes is required"),
    images: Yup.string(),
});

interface IRepaireRequestUpsert {
    initialData: IRepaireRequestDetails
    isModalOpen: boolean
    handleCloseModal: () => void
    handleSucces: () => void
}

interface IOptions {
    label: "",
    value:"",
}

const RepaireRequestUpsert:FC<IRepaireRequestUpsert> = (props) => {

    const auth = useAuth();
    
    const { isModalOpen, initialData} = props
    const { handleCloseModal, handleSucces } = props

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [carOptions, setCarOptions] = useState<IOptions[]>([])
    const [serviceTypeOptions, setServiceTypeptions] = useState<IOptions[]>([])
    const [mechanicOptions, setMechanics] = useState<IOptions[]>([])

    const [editData, setEditData] = useState<IRepairUpdate>({
        mechanic_id: "",
        preferred_schedule: "",
        request_id: "",
        service_id:"",
        vehicle_id:"",
        notes:"",
        request_status:"",
        mechanic_notes: "",
    })
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
            if(initialData.request_id != "") {
                fetchRequest()
            }
        } catch (error){
            handleError(error as AxiosError); 
        } finally {
            setIsLoading(false)
        }
    }

    const fetchRequest = async () => {
        try {
            const response = await api.get(`/api/service-request/${initialData.request_id}`);
            setEditData({
                ...response.data
            })
        } catch (err) {

        } finally {

        }
        
    }

    const [services, setServices] = useState<string[]>([]);

    useEffect(() => {
        if (isModalOpen) {
            fetchData()
        }
    }, [isModalOpen])
    return (
        <Formik
            initialValues={editData}
            enableReinitialize={true}
            validationSchema={ auth.role == "customer" ? schema : mechanicSchema}
            onSubmit={async (values) => {
                const formValues = {
                    ...values,
                    service_id: services.join(", ")
                }
                try {
                    if (initialData.request_id === "") {
                        await api.post(`/api/service-request/`, formValues);
                    } else {
                        await api.put(`/api/service-request/${initialData.request_id}`, formValues);
                    }
                    handleSucces();
                    handleCloseModal();
                } catch (err) {
                    handleError(err as AxiosError)
                } finally {
                    setIsLoading(false)
                }
            }}
            >
            {(formik) => {
                const { errors, touched, isValid, dirty, values, handleSubmit, handleBlur, handleChange, setFieldValue } = formik;
                
                const handleSelectChange = (event: SelectChangeEvent<typeof services>) => {
                    const {
                    target: { value },
                    } = event;
                    setServices(
                    typeof value === 'string' ? value.split(',') : value,
                    );
                    setFieldValue("service_id", 
                    typeof value === 'string' ? value.split(',') : value,
                    )
                };

                return (
                    <Form onSubmit={handleSubmit} style={{width: "1000px"}}>
                        
                        <CustomDialog 
                            title="Service Request"
                            isOpen={isModalOpen}
                            isSubmitting={isLoading}
                            handleClose={handleCloseModal}
                            handleSubmit={handleSubmit}
                            isSubmitButtonDisabled={!(dirty && isValid)}
                        >
                        <Stack className="form-row" spacing={2} mb={2}>
                             <FormControl fullWidth>
                                <InputLabel id="input-car">Car</InputLabel>
                                <Select
                                    labelId="input-car"
                                    name="vehicle_id"
                                    id="vehicle_id"
                                    value={values.vehicle_id}
                                    label="Car"
                                    onChange={handleChange}
                                    error={errors.vehicle_id && touched.vehicle_id || undefined}
                                    onBlur={handleBlur}
                                    className={errors.vehicle_id && touched.vehicle_id ? "input-error" : ""}
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
                                { errors.vehicle_id && touched.vehicle_id && (
                                    <span className="error">{errors.vehicle_id}</span>
                                ) }
                            <FormControl fullWidth>
                                <InputLabel id="input-service">Service Type</InputLabel>
                                <Select
                                    labelId="input-service"
                                    name="service_id"
                                    id="service_id"
                                    multiple
                                    value={services}
                                    label="Service Type"
                                    onChange={handleSelectChange}
                                    error={touched.service_id && Boolean(errors.service_id)}
                                    onBlur={handleBlur}
                                    className={errors.service_id && touched.service_id ? "input-error" : ""}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                              maxHeight: 48 * 4.5 + 8,
                                              width: 250,
                                            },
                                          },
                                    }}
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
                                { errors.service_id && touched.service_id && (
                                    <span className="error">{errors.service_id}</span>
                                ) }
                            <FormControl fullWidth>
                                <InputLabel id="input-mechanic">Mechanics</InputLabel>
                                <Select
                                    labelId="input-mechanic"
                                    name="mechanic_id"
                                    id="mechanic_id"
                                    value={values.mechanic_id}
                                    label="Service Type"
                                    onChange={handleChange}
                                    error={touched.mechanic_id && Boolean(errors.mechanic_id)}
                                    onBlur={handleBlur}
                                    className={errors.mechanic_id && touched.mechanic_id ? "input-error" : ""}
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
                                { errors.mechanic_id && touched.mechanic_id && (
                                    <span className="error">{errors.mechanic_id}</span>
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
                                name="notes"
                                id="notes"
                                onBlur={handleBlur}
                                value={values.notes}
                                style={{
                                    color: "black",
                                    backgroundColor: "white"
                                }}
                                onChange={handleChange}
                                aria-label="enter note" 
                                minRows={3} 
                                placeholder="Enter Note" 
                            />
                            <TextareaAutosize  
                                name="mechanic_notes"
                                id="mechanic_notes"
                                onBlur={handleBlur}
                                value={values.mechanic_notes}
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