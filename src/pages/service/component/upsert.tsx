import { Formik, Form } from "formik";
import * as Yup from "yup";

import CustomDialog from "../../../components/dialog";
import { Stack, TextField } from "@mui/material";
import { FC, useState } from "react";
import api from "../../../config/api";
import { IService } from "../../../interface/shared";
import handleError from "../../../components/error";
import { AxiosError } from "axios";

const registerSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string(),
    price: Yup.number().required("Price is required"),
});

interface IServiceUpsert {
    initialData: IService
    isModalOpen: boolean
    handleCloseModal: () => void
    handleSucces: () => void
}

const ServiceUpsert: FC<IServiceUpsert> = (props) => {

    const { isModalOpen, initialData } = props
    const { handleCloseModal, handleSucces } = props
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <Formik
            key={JSON.stringify(initialData)}
            initialValues={initialData}
            enableReinitialize={true}
            validationSchema={registerSchema}
            onSubmit={async (values) => {
                try {
                    setIsLoading(!isLoading)
                    if (!initialData.service_id) {
                        await api.post("/api/service", values);
                    } else {
                        await api.put(`/api/service/${initialData.service_id}`, values);
                    }
                    handleSucces();
                    handleCloseModal();
                } catch(err) {
                    handleError(err as AxiosError)
                } finally {
                    setIsLoading(false)
                }
            }}
        >
            {(formik) => {
                const { errors, touched, isValid, dirty, values, handleSubmit, handleChange } = formik;
                return (
                    <Form onSubmit={handleSubmit} style={{ width: "1000px" }}>

                        <CustomDialog
                            title="New Services"
                            isOpen={isModalOpen}
                            isSubmitting={isLoading}
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
                                    placeholder="Name"
                                    sx={{
                                        color: "white",
                                        backgroundColor: "white"
                                    }}
                                    value={values.name}
                                    onChange={handleChange}
                                    className={errors.name && touched.name ? "input-error" : ""}
                                />
                                {errors.name && touched.name && (
                                    <span className="error">{errors.name}</span>
                                )}

                                <TextField
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Description"
                                    sx={{
                                        color: "white",
                                        backgroundColor: "white"
                                    }}
                                    value={values.description}
                                    onChange={handleChange}
                                    className={errors.description && touched.description ? "input-error" : ""}
                                />
                                {errors.description && touched.description && (
                                    <span className="error">{errors.description}</span>
                                )}

                                <TextField
                                    type="number"
                                    name="price"
                                    id="price"
                                    InputProps={{
                                        inputMode: 'decimal',  // Optional, ensures decimal input mode
                                        inputProps: {
                                            step: "0.01",  // Set the step interval to 0.01
                                        },
                                    }}
                                    placeholder="Price Amount"
                                    sx={{
                                        color: "white",
                                        backgroundColor: "white"
                                    }}
                                    value={values.price}
                                    onChange={handleChange}
                                    className={errors.price && touched.price ? "input-error" : ""}
                                />
                                {errors.price && touched.price && (
                                    <span className="error">{errors.price}</span>
                                )}
                            </Stack>
                        </CustomDialog>

                    </Form>
                );
            }}
        </Formik>
    )
}

export default ServiceUpsert