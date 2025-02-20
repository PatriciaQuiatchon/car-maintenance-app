import { Formik, Form } from "formik";
import * as Yup from "yup";

import CustomDialog from "../../../components/dialog";
import { Stack, TextField } from "@mui/material";
import { FC, useState } from "react";
import api from "../../../config/api";
import { IVehicle } from "../../../interface/shared";
import { useAuth } from "../../../hooks/authProvider";
import handleError from "../../../components/error";
import { AxiosError } from "axios";

const currentYear = new Date().getFullYear();

const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    type: Yup.string().required("Type is required"),
    model: Yup.string().required("Model is required"),
    year: Yup.number()
    .required("Year is required")
    .min(1886, "Year must be 1886 or later")
    .max(currentYear, `Year must not exceed ${currentYear}`),
    plate_number: Yup.string().required("Plate Number is required"),
});

interface IVehicleUpsert {
    initialData: IVehicle
    isModalOpen: boolean
    handleCloseModal: () => void
    handleSucces: () => void
}

const VehicleUpsert:FC<IVehicleUpsert> = (props) => {

    const auth = useAuth();

    const { isModalOpen, initialData} = props
    const { handleCloseModal, handleSucces } = props

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    return (
        <Formik
            key={JSON.stringify(initialData)} 
            initialValues={initialData}
            enableReinitialize={true}
            validationSchema={schema}
            onSubmit={async (values) => {
                try {
                    setIsSubmitting(!isSubmitting)
                    if (initialData.user_id === "") {
                        await api.post(`/api/vehicle/${auth.user?.user_id}`, values);

                    } else {
                       await api.put(`/api/vehicle/${initialData.vehicle_id}`, values);
                    }
                    handleSucces();
                    handleCloseModal();
                } catch(err){
                    handleError(err as AxiosError)
                } finally {
                    setIsSubmitting(false)
                }
            }}
            >
            {(formik) => {
                const { errors, touched, isValid, dirty, values, handleSubmit, handleBlur, handleChange } = formik;
                return (
                    <Form onSubmit={handleSubmit} style={{width: "auto"}}>
                        
                        <CustomDialog 
                            title="Register Vehicle"
                            isOpen={isModalOpen}
                            isSubmitting={isSubmitting}
                            handleClose={handleCloseModal}
                            handleSubmit={handleSubmit}
                            isSubmitButtonDisabled={!(dirty && isValid)}
                        >
                        <Stack className="form-row" spacing={2} mb={2}>
                            <TextField
                                size="medium"
                                hiddenLabel
                                type="name"
                                name="name"
                                id="name"
                                placeholder="Enter Brand Name"
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
                            
                            <TextField
                                type="text"
                                name="type"
                                id="type"
                                placeholder="Enter Car Type"
                                sx={{
                                    color: "white",
                                    backgroundColor: "white"
                                }}
                                error={errors.type && touched.type || undefined}
                                helperText={errors.type && touched.type && errors.type}
                                onBlur={handleBlur}
                                value={values.type}
                                onChange={handleChange}
                                className={errors.type && touched.type ? "input-error" : ""}
                            />
                            
                            <TextField
                                label="Model"
                                error={errors.model && touched.model || undefined}
                                helperText={errors.model && touched.model && errors.model}
                                type="text"
                                name="model"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.model}
                                placeholder="Enter Car Model"
                                className="form-control"
                            />
                            
                            <TextField
                                label="Year"
                                error={errors.year && touched.year || undefined}
                                helperText={errors.year && touched.year && errors.year}
                                type="number"
                                name="year"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.year}
                                placeholder="Enter Car Year"
                                className="form-control"
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

export default VehicleUpsert