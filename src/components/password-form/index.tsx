import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Box, Paper, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/authProvider";
import api from "../../config/api";

const PasswordChangeForm =() => {
    const requiredField = (name: string) => `${name} is a required field`

    const [isSaving, setIsSave] = useState<boolean>(false)

    const auth = useAuth()
    const schema = Yup.object().shape({
        old_password: Yup.string().required(requiredField("Old Password")),
        new_password: Yup.string()
        .required("Password is a required field")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
      
      confirm_new_password: Yup.string()
          .oneOf([Yup.ref('new_password'), undefined], 'Passwords must match'),
      
    });
    const initialValues = {
        old_password:"",
        new_password: "",
        confirm_new_password:"",
    }
    return (
        <Box sx={{ padding:3, boxShadow: 2}} component={Paper}>
        <Typography variant="h6" sx={{ textAlign:"left", paddingBottom:"5px"}}>Password Change</Typography>
        <Formik
                validationSchema={schema}
                initialValues={initialValues}
                onSubmit={async (values) => {
                    try {
                        setIsSave(true)
                        // setErrorMessage("")
                        await api.put(`/api/users/password/${auth.user?.user_id}`, JSON.stringify(values))
                        toast.success("Password has been successfully changed.", {
                            position:"top-right",
                        })
                        // await api.post("/api/users/checker", JSON.stringify(values))
                        // onSubmit("Checker has been successfully created.")
                    } catch (err:any) {
                        toast.error("Old password is incorrect", {
                            position:"top-right",
                        })
                    } finally {
                        setIsSave(false)
                    }
                }}
            >
             {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    }) => (
                        <Box sx={{ width: {sm:"100%", md:"50%"}}}>
                            <form noValidate onSubmit={handleSubmit}>
                                <Stack spacing={1}>
                                <TextField
                                    label="Old Password"
                                    error={errors.old_password && touched.old_password || undefined}
                                    helperText={errors.old_password && touched.old_password && errors.old_password}
                                    type="password"
                                    name="old_password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.old_password}
                                    placeholder="Enter old password"
                                    className="form-control"
                                />
                                <TextField
                                    label="New Password"
                                    error={errors.new_password && touched.new_password || undefined}
                                    helperText={errors.new_password && touched.new_password && errors.new_password}
                                    type="password"
                                    name="new_password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.new_password}
                                    placeholder="Enter new password"
                                    className="form-control"
                                />
                                <TextField
                                    label="Confirm Password"
                                    error={errors.confirm_new_password && touched.confirm_new_password || undefined}
                                    helperText={errors.confirm_new_password && touched.confirm_new_password && errors.confirm_new_password}
                                    type="password"
                                    name="confirm_new_password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirm_new_password}
                                    placeholder="Enter confirm password"
                                    className="form-control"
                                />
                                <LoadingButton
                                    type="submit"
                                    loading={isSaving}
                                    variant="contained"
                                    // sx={{backgroundColor: "#700E1C"}}
                                >
                                    Save
                                </LoadingButton>
                                </Stack>
                            </form>
                        </Box>
                    )
            }
            </Formik>
        </Box>
    )
}

export default PasswordChangeForm