import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CustomDialog from "../../../components/dialog";
import { Grid2, InputAdornment, Stack, TextField } from "@mui/material";
import { FC, useState } from "react";
import api from "../../../config/api";
import { IService } from "../../../interface/shared";
import handleError from "../../../components/error";
import { AxiosError } from "axios";
import { parseMoney } from "../../../utils/helper";

const registerSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string(),
    price: Yup.number().required("Price is required")
        .typeError("Price must be a number"),
    price_b: Yup.number().required("Price is required")
    .typeError("Price must be a number")
    .test(
      "is-lower-than-price",
      "Price must be lower than Price",
      function (value) {
        const { price } = this.parent; // Access the value of `price`
        return value < price; // Ensure `price_b` is lower than `price`
      }
    ),
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
            initialValues={{...initialData, price: parseMoney(String(initialData.price)), price_b: parseMoney(String(initialData.price_b))}}
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
                const { errors, touched, isValid, dirty, values, handleSubmit, handleChange, handleBlur } = formik;
                return (
                    <Form onSubmit={handleSubmit} style={{ width: "auto" }}>

                        <CustomDialog
                            title="New Service"
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
                                    defaultValue={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.name && touched.name ? "input-error" : ""}
                                />
                                {errors.name && touched.name && (
                                    <span className="error">{errors.name}</span>
                                )}

                                <TextareaAutosize
                                    name="description"
                                    id="description"
                                    placeholder="Description"
                                    style={{
                                        fontFamily: "sans-serif",
                                        fontSize: "16px",
                                        color: "black",
                                        backgroundColor: "white",
                                    }}
                                    minRows={3}
                                    onBlur={handleBlur}
                                    defaultValue={values.description}
                                    onChange={handleChange}
                                    className={errors.description && touched.description ? "input-error" : ""}
                                />
                                {errors.description && touched.description && (
                                    <span className="error">{errors.description}</span>
                                )}
                                <Grid2 container spacing={2}>
                                    <Grid2 size={5.5}>
                                        <TextField
                                            type="number"
                                            name="price_b"
                                            id="price_b"
                                            InputProps={{
                                                inputMode: 'decimal',  // Optional, ensures decimal input mode
                                                inputProps: {
                                                    step: "0.01",  // Set the step interval to 0.01
                                                },
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                      ₱
                                                    </InputAdornment>
                                                  ),
                                            }}
                                            placeholder="Price Amount"
                                            sx={{
                                                color: "white",
                                                backgroundColor: "white",
                                                width: "100%"
                                            }}
                                            value={values.price_b}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.price_b && touched.price_b ? "input-error" : ""}
                                        />
                                        {errors.price_b && touched.price_b && (
                                            <span className="error">{errors.price_b}</span>
                                        )}
                                    </Grid2>
                                    <Grid2 size={1} display="flex" justifyContent="content" alignItems="center" width="auto">
                                        -
                                    </Grid2>
                                    <Grid2 size={5.5}>
                                        <TextField
                                            type="number"
                                            name="price"
                                            id="price"
                                            InputProps={{
                                                inputMode: 'decimal',  // Optional, ensures decimal input mode
                                                inputProps: {
                                                    step: "0.01",  // Set the step interval to 0.01
                                                },
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                      ₱
                                                    </InputAdornment>
                                                  ),
                                            }}
                                            placeholder="Price Amount"
                                            sx={{
                                                color: "white",
                                                width: "100%",
                                                backgroundColor: "white"
                                            }}
                                            value={values.price}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className={errors.price && touched.price ? "input-error" : ""}
                                        />
                                        {errors.price && touched.price && (
                                            <span className="error">{errors.price}</span>
                                        )}
                                    </Grid2>
                                </Grid2>
                            </Stack>
                        </CustomDialog>

                    </Form>
                );
            }}
        </Formik>
    )
}

export default ServiceUpsert