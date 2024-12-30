import { Formik, Form } from "formik";
import * as Yup from "yup";

import CustomDialog from "../../../components/dialog";
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

import { FC, useEffect, useState } from "react";
import api from "../../../config/api";
import { IRepaireRequestDetails, IVehicle } from "../../../interface/shared";
import { useAuth } from "../../../hooks/authProvider";
import { AxiosError } from "axios";
import handleError from "../../../components/error";

const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    type: Yup.string().required("Type is required"),
    plate_number: Yup.string().required("Plate Number is required"),
    date: Yup.string().required("Date is required"),
    mechianic: Yup.string(),
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

    const fetchData = async () => {
        try {
            setIsLoading(!isLoading)
            const response = await api.get(`/api/vehicles/${auth.user?.user_id}`);

            const options = response.data.map((item:IVehicle) => ({ label: item.name, value: item.vehicle_id }))
            setCarOptions(options)
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
                        const response = await api.post(`/api/request/${auth.user?.user_id}`, values);
                        handleSucces();
                        handleCloseModal();
    
                        throw new Error(response.data.message);
                      } catch (err) {
                        console.error(err);
                    }
                } else {
                    try {
                        const response = await api.put(`/api/vehicle/${initialData.request_id}`, values);
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
                const { errors, touched, isValid, dirty, values, handleSubmit, handleBlur, handleChange } = formik;
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
                            <TextField
                                size="medium"
                                hiddenLabel
                                type="name"
                                name="name"
                                id="name"
                                placeholder="Enter Ca Name"
                                sx={{
                                    color: "white",
                                    backgroundColor: "white"
                                }}
                                value={values.name}
                                onChange={handleChange}
                                error={errors.name && touched.name || undefined}
                                helperText={errors.name && touched.name && errors.name}
                                onBlur={handleBlur}
                                className={errors.name && touched.name ? "input-error" : ""}
                            />
                            
                            <TextareaAutosize  
                                name="note"
                                id="note"
                                onBlur={handleBlur}
                                value={values.note}
                                onChange={handleChange}
                                aria-label="enter note" 
                                minRows={3} 
                                placeholder="Enter Note" 
                            />
                            
                            <TextField
                                label="Plate Number"
                                error={errors.plate_number && touched.plate_number || undefined}
                                helperText={errors.plate_number && touched.plate_number && errors.plate_number}
                                type="text"
                                name="plate_number"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.plate_number}
                                placeholder="Enter Car Plate Number"
                                className="form-control"
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