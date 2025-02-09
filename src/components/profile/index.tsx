import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Box, FormControl, Grid2, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/authProvider";
import { IUserCredentials } from "../../interface/shared";
import api from "../../config/api";
import handleError from "../error";
import { AxiosError } from "axios";
import { validIds } from "../auth/register";

const ProfileForm =() => {
    const requiredField = (name: string) => `${name} is a required field`

    const [isSaving, setIsSave] = useState<boolean>(false)

    const auth = useAuth()

    const schema = Yup.object().shape({
        name: Yup.string().required(requiredField("Name")),
        email: Yup.string().required(requiredField("Email"))
          .email("Invalid email format"),
        phone_num: Yup.number().test(
                        "len",
                        "Phone number must be exactly 10 digits",
                        (value) => value?.toString().length === 10
                    ).typeError("Phone number must be a valid number"),
        validId: Yup.string().required("Valid ID Type is required"),
        validIdNumber: Yup.string().required("Valid ID Number is required"),
    });

    const initialValues: IUserCredentials = {
        email: auth.user?.email || "",
        name: auth.user?.name || "",
        role: auth.user?.role || "",
        phone_num: auth.user?.phone_num || "",
        password:"",
        address: auth.user?.address || "",
        validIdNumber: auth.user?.validIdNumber || "",
        validId:auth.user?.validId || "",
    }
    return (
        <Box sx={{ padding:3, boxShadow: 2}} component={Paper}>
        {/* <Typography variant="h6" sx={{ textAlign:"left", paddingBottom:"5px"}}>User Profile Change</Typography> */}
        <Formik
                validationSchema={schema}
                initialValues={initialValues}
                onSubmit={async (values) => {
                    try {
                        setIsSave(true)
                        // setErrorMessage("")
                        // await auth?.profile({email: values.email, first_name: values.first_name, last_name: values.last_name,});
                        const response = await api.put(`/api/user/${auth.user?.user_id || ""}`, values);
                        
                        if(response.data) {
                            toast.success("Profile changed successfully")
                        }
                    } catch (err) {
                        handleError(err as AxiosError) 

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
                            <Stack spacing={2}>
                                <TextField
                                    error={errors.email && touched.email || undefined}
                                    label="Email"
                                    helperText={errors.email && touched.email && errors.email}
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    placeholder="Enter email address"
                                    id="email"
                                />
                                <TextField
                                    error={errors.name && touched.name || undefined}
                                    label="Name"
                                    helperText={errors.name && touched.name && errors.name}
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    placeholder="Enter Name"
                                    id="name"
                                />
                                <TextField
                                    error={errors.address && touched.address || undefined}
                                    label="Address"
                                    helperText={errors.address && touched.address && errors.address}
                                    type="text"
                                    name="address"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.address}
                                    placeholder="Enter Address"
                                    id="address"
                                />
                                <TextField
                                    error={errors.phone_num && touched.phone_num || undefined}
                                    label="Phone Number"
                                    helperText={errors.phone_num && touched.phone_num && errors.phone_num}
                                    type="text"
                                    name="phone_num"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phone_num}
                                    placeholder="Enter Phone Number"
                                    id="phone_num"
                                    InputProps={{
                                    }}
                                    slotProps={{
                                        input: {
                                            startAdornment: <InputAdornment position="start">+63</InputAdornment>,
                                        }
                                    }}
                                />
                                
                                <Grid2 spacing={1} container >
                                <Grid2 size={{ xs: 12, sm: 6 }} marginTop={1}>
                                <FormControl fullWidth>
                                <InputLabel id="validId">Valid ID Type</InputLabel>
                                <Select
                                    labelId="validId"
                                    id="validId"
                                    name="validId"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    label="Valid ID"
                                    value={values.validId}
                                    sx={{ textAlign: "start" }}
                                >
                                    {
                                        validIds.map(item =>  <MenuItem value={item}>{item}</MenuItem>)
                                    }
                                </Select>
                                
                                <ErrorMessage
                                    name="validId"
                                    component="span"
                                    className="error"
                                />
                                </FormControl>
                                </Grid2>
                                <Grid2 size={{ xs: 12, sm: 6 }}>
                                <TextField
                                label="Valid Id Number"
                                name="validIdNumber"
                                fullWidth
                                variant="outlined"
                                margin="dense"
                                value={values.validIdNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                sx={{
                                    color: "white",
                                    backgroundColor: "white"
                                }}
                                error={!!(errors.validIdNumber && touched.validIdNumber)}
                                required
                                />
                                <ErrorMessage
                                name="validIdNumber"
                                component="span"
                                className="error"
                                />
                                </Grid2>
                                </Grid2>
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

export default ProfileForm