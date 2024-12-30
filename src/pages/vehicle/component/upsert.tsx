import { Formik, Form } from "formik";
import * as Yup from "yup";

import CustomDialog from "../../../components/dialog";
import { Stack, TextField } from "@mui/material";
import { FC } from "react";
import api from "../../../config/api";
import { IVehicle } from "../../../interface/shared";
import { useAuth } from "../../../hooks/authProvider";

const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    type: Yup.string().required("Type is required"),
    model: Yup.string().required("Model is required"),
    plate_number: Yup.string().required("Plate Number is required"),
});

interface IVehicleUpsert {
    initialData: IVehicle
    isModalOpen: boolean
    isSubmitting: boolean
    handleCloseModal: () => void
    handleSucces: () => void
}

const VehicleUpsert:FC<IVehicleUpsert> = (props) => {

    const auth = useAuth();

    const { isModalOpen, isSubmitting, initialData} = props
    const { handleCloseModal, handleSucces } = props

    return (
        <Formik
            key={JSON.stringify(initialData)} 
            initialValues={initialData}
            enableReinitialize={true}
            validationSchema={schema}
            onSubmit={async (values) => {
                if (initialData.user_id === "") {
                    try {
                        const response = await api.post(`/api/vehicle/${auth.user?.user_id}`, values);
                        handleSucces();
                        handleCloseModal();
    
                        throw new Error(response.data.message);
                      } catch (err) {
                        console.error(err);
                    }
                } else {
                    try {
                        const response = await api.put(`/api/vehicle/${initialData.vehicle_id}`, values);
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