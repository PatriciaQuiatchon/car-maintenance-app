import { Formik, Form } from "formik";
import * as Yup from "yup";

import CustomDialog from "../../../components/dialog";
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { FC, useState } from "react";
import api from "../../../config/api";
import { IVehicle } from "../../../interface/shared";
import { useAuth } from "../../../hooks/authProvider";
import handleError from "../../../components/error";
import { AxiosError } from "axios";
// import { ApiClient } from "../../../config/car_api";
// import toast from "react-hot-toast";
import { carMakeList, CarTypeList } from "../../../utils/helper";

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

    // const [isTypeLoading, setIsTypeLoading] = useState(false)
    // const [isModelLoading, setIsModelLoading] = useState(false)

    // const [query, setQuery] = useState("")

    // const [make, setMake] = useState("")
    // const handleSelectChange = async (event: SelectChangeEvent<unknown>, setFieldValue:(field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<IVehicle>>) => {
    //     const make = event.target.value as string;
    //     setMake(make);
    //     setFieldValue("make", make)
    // };

    // const [category, setCategory] = useState("")
    // const handleSelectCategoryChange = async (event: SelectChangeEvent<unknown>, setFieldValue:(field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<IVehicle>>) => {
    //     const value = event.target.value as string;
    //     setCategory(value);
    //     setFieldValue("type", value)

    // };

    // const [model, setModel] = useState("")
    // const handleSelectModelChange = async (event: SelectChangeEvent<unknown>) => {
    //     const value = event.target.value as string;
    //     setModel(value);

    // };
    // const [models, setModels] = useState<string[]>([])
    // const fetchCarModels = async (make: string, category: string) => {
    //     try {
    //         setIsModelLoading(true)
    //         const response = await axios.get(
    //             `https://public.opendatasoft.com/api/records/1.0/search/?dataset=all-vehicles-model&q=&refine.make=${encodeURIComponent(make)}&refine.category=${encodeURIComponent(category)}`
    //         );
            
    //         const modelList = new Set<string>();
    //         response.data.records.forEach((record: any) => {
    //             if (record.fields.model) {
    //                 modelList.add(record.fields.model);
    //             }
    //         });
    //         setModels(Array.from(modelList))

    //     } catch (error) {
    //         toast.error("Car API is unavailable. Please, try again later.")
    //     } finally {
    //         setIsModelLoading(false)
    //     }
    // };

    // const [types, setTypes] = useState<string[]>([])
    // const fetchCarTypes = async (make: string) => {
    //     try {
    //         setIsTypeLoading(true)
    //         // const response = await axios.get(
    //         //     `https://public.opendatasoft.com/api/records/1.0/search/?dataset=all-vehicles-model&q=&refine.make=${encodeURIComponent(make)}`
    //         // );
    //         const api = new ApiClient();
    //         const response = await api.get(`/Car_Model_List_${make}?limit=500`)
    //         console.log({response})
    //         const categoryList = new Set<string>();
    //         // response.results.forEach((record: any) => {
    //         //     if (record.fields.vclass) {
    //         //         categoryList.add(record.fields.vclass);
    //         //     }
    //         // });
    //         setTypes(Array.from(categoryList));

    //     } catch (error) {
    //         toast.error("Car API is unavailable. Please, try again later.")
    //     } finally {
    //         setIsTypeLoading(false)
    //     }
    // };

    // useEffect(() => {
    //     if(make && category) {
    //         fetchCarModels(make, category)
    //     }
    // }, [make,category])

    // useEffect(() => {
    //     if(make) {
    //         fetchCarTypes(make)
    //     }
    // }, [make])
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
                            <FormControl fullWidth>
                            <InputLabel id="name">Enter Brand Name</InputLabel>
                            <Select
                                labelId="name"
                                id="name"
                                name="name"
                                value={values.name}
                                // onChange={(e) => handleSelectChange(e, setFieldValue)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Enter Brand Name"
                                error={errors.name && touched.name || undefined}
                                sx={{ textAlign: "start" }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            maxHeight: 250, // Sets minimum height of the dropdown
                                            mt: 1, // Ensures it appears below the select field
                                        }
                                    }
                                }}
                            >
                                {carMakeList.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>

                            </FormControl>
                            {/* <TextField
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
                            /> */}
                            <FormControl fullWidth>
                            <InputLabel id="type">Enter Car Type</InputLabel>
                            <Select
                                labelId="type"
                                id="type"
                                value={values.type}
                                name="type"
                                onChange={handleChange}
                                // onChange={(e) => handleSelectCategoryChange(e, setFieldValue)}
                                onBlur={handleBlur}
                                label="Enter Car type"
                                error={errors.name && touched.name || undefined}
                                sx={{ textAlign: "start" }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            maxHeight: 250, // Sets minimum height of the dropdown
                                            mt: 1, // Ensures it appears below the select field
                                        }
                                    }
                                }}
                            >
                                {CarTypeList.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                            </FormControl>
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
                            {/* <FormControl fullWidth>
                            <InputLabel id="model">Enter Car Model</InputLabel>
                            <Select
                                labelId="model"
                                id="model"
                                value={values.model}
                                name="model"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Enter Car model"
                                error={errors.name && touched.name || undefined}
                                sx={{ textAlign: "start" }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            maxHeight: 250, // Sets minimum height of the dropdown
                                            mt: 1, // Ensures it appears below the select field
                                        }
                                    }
                                }}
                            >
                                {isModelLoading ? (
                                    <MenuItem disabled>
                                        <CircularProgress size={20} sx={{ marginRight: 1 }} /> Loading...
                                    </MenuItem>
                                ) : (
                                    models.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))
                                )
                                }
                            </Select>

                            </FormControl> */}
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