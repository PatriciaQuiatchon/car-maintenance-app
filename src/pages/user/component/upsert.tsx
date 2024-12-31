import { Formik, Form } from "formik";
import * as Yup from "yup";

import CustomDialog from "../../../components/dialog";
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { FC } from "react";
import api from "../../../config/api";
import { IUserDetails } from "../../../interface/shared";

const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    role: Yup.string().required("Role is required"),
});

const newUserSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    role: Yup.string().required("Role is required"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match'),
});

interface IServiceUpsert {
    initialData: IUserDetails
    isModalOpen: boolean
    isSubmitting: boolean
    handleCloseModal: () => void
    handleSucces: () => void
}

const ServiceUpsert:FC<IServiceUpsert> = (props) => {

    const { isModalOpen, isSubmitting, initialData} = props
    const { handleCloseModal, handleSucces } = props

    return (
        <Formik
            key={JSON.stringify(initialData)} 
            initialValues={initialData}
            enableReinitialize={true}
            validationSchema={initialData.user_id === "" ? newUserSchema : schema}
            onSubmit={async (values) => {
                if (initialData.user_id === "") {
                    try {
                        const response = await api.post("/api/user", values);
                        handleSucces();
                        handleCloseModal();
    
                        throw new Error(response.data.message);
                      } catch (err) {
                        console.error(err);
                    }
                } else {
                    try {
                        const response = await api.put(`/api/user/${initialData.user_id}`, values);
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
                            title="New Users"
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
                                placeholder="Name"
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
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email Address"
                                sx={{
                                    color: "white",
                                    backgroundColor: "white"
                                }}
                                error={errors.email && touched.email || undefined}
                                helperText={errors.email && touched.email && errors.email}
                                onBlur={handleBlur}
                                value={values.email}
                                onChange={handleChange}
                                className={errors.email && touched.email ? "input-error" : ""}
                            />
                            <FormControl fullWidth>
                            <InputLabel id="input-role">Role</InputLabel>
                            <Select
                                labelId="input-role"
                                name="role"
                                id="role"
                                value={values.role}
                                label="Role"
                                onChange={handleChange}
                                error={errors.role && touched.role || undefined}
                                onBlur={handleBlur}
                                className={errors.role && touched.role ? "input-error" : ""}
                            >
                                <MenuItem value={"admin"}>Admin</MenuItem>
                                <MenuItem value={"employee"}>Employee</MenuItem>
                                <MenuItem value={"mechanic"}>Mechanic</MenuItem>
                                <MenuItem value={"user"}>User</MenuItem>
                            </Select>
                            </FormControl>
                            { errors.role && touched.role && (
                                <span className="error">{errors.role}</span>
                            ) }
                            {
                             initialData.user_id === "" && <>
                              <TextField
                                    label="Password"
                                    error={errors.password && touched.password || undefined}
                                    helperText={errors.password && touched.password && errors.password}
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    placeholder="Enter password"
                                    className="form-control"
                                />
                                <TextField
                                    label="Confirm Password"
                                    error={errors.confirm_password && touched.confirm_password || undefined}
                                    helperText={errors.confirm_password && touched.confirm_password && errors.confirm_password}
                                    type="password"
                                    name="confirm_password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirm_password}
                                    placeholder="Enter confirm password"
                                    className="form-control"
                                />
                                </>
                            }
                        </Stack>
                        </CustomDialog>

                    </Form>
                );
            }}
        </Formik>
    )
}

export default ServiceUpsert