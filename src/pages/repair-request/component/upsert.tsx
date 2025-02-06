import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import CustomDialog from "../../../components/dialog";
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

import { FC, useEffect, useState } from "react";
import api from "../../../config/api";
import { IRepaireRequestDetails, IRepairUpdate, IService, IUserDetails, IVehicle } from "../../../interface/shared";
import { useAuth } from "../../../hooks/authProvider";
import axios, { AxiosError } from "axios";
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
});

const mechanicSchema = Yup.object().shape({
    notes: Yup.string().required("notes is required"),
    service_amount: Yup.number().required("Amount is required")
});

interface IRepaireRequestUpsert {
    initialData: IRepaireRequestDetails
    isModalOpen: boolean
    handleCloseModal: () => void
    handleSucces: () => void
    pending: string[]
}

interface IOptions {
    label: "",
    value:"",
    price?:"",
}

const RepaireRequestUpsert:FC<IRepaireRequestUpsert> = (props) => {

    const auth = useAuth();
    
    const isCustomer = auth.role === "customer"
    const { isModalOpen, initialData, pending} = props
    const { handleCloseModal, handleSucces } = props

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [carOptions, setCarOptions] = useState<IOptions[]>([])
    const [serviceTypeOptions, setServiceTypeptions] = useState<IOptions[]>([])
    const [mechanicOptions, setMechanics] = useState<IOptions[]>([])
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [editData, setEditData] = useState<IRepairUpdate>({
        mechanic_id: "",
        preferred_schedule: "",
        request_id: "",
        service_id:"",
        vehicle_id:"",
        notes:"",
        request_status:"",
        image:"",
        service_amount: 0,
    })
    const fetchData = async () => {
        try {
            setIsLoading(!isLoading)
            const response = await api.get(`/api/service-requests/${auth.user?.user_id}`);
            const { mechanics, services, vehicles } = response.data
            const options = vehicles.map((item:IVehicle) => ({ label: `${item.name} ${item.model} ${item.plate_number}`, value: item.vehicle_id }))
            setCarOptions(options.filter((item: any) => item.value === initialData.vehicle_id || !pending.includes(item.value)))

            const servicesOptions: IOptions[] = services.map((item:IService) => ({ label: `${item.name}`, value: item.service_id, price:item.price }))
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
    const [services, setServices] = useState<string[]>([]);

    const fetchRequest = async () => {
        try {
            const response = await api.get(`/api/service-request/${initialData.request_id}`);
            const price = Number(response.data.service_amount || '0')
            setEditData({
                ...response.data,
                service_amount: price
            })
            setImagePreview(response.data.image)
            setServices(
            response.data.service_id.split(', '),
            );
        } catch (err) {

        } finally {

        }
        
    }

    const [isChangeImage, setIsChangeImage] = useState<boolean>(false);
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      }
    };
  
    const handleImageUpload = async (file: File | undefined) => {
      // const file = e.target.files?.[0]; 
      const cloudName = "dgxzrvv7n"
      const apiKey = '379246439751562';
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', apiKey);
        formData.append('upload_preset', 'sample'); 
  
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData)
        return response.data.url || ""
      }
      return
    };
    
    useEffect(() => {
        if (isModalOpen) {
            fetchData()
        }
    }, [isModalOpen])

    return (
        <Formik
            initialValues={editData}
            enableReinitialize={true}
            validationSchema={isCustomer ? schema : mechanicSchema}
            onSubmit={async (values) => {
                const imageUrl = await handleImageUpload(values.imageFile)

                const formValues = {
                    ...values,
                    service_id: isCustomer ? services.join(", ") : "",
                    image: imageUrl
                }
                
                // const service_amount = services.map(item => serviceTypeOptions.find(service => service.value == item)?.price || "0")
                // .reduce((acc, price) => acc + Number(price), 0);
                try {
                    if (initialData.request_id === "") {
                        await api.post(`/api/service-request/`, {...formValues});
                    } else {
                        await api.put(`/api/service-request/${initialData.request_id}`, {...formValues});
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
                    <Form onSubmit={handleSubmit} style={{width: "auto"}}>
                        
                        <CustomDialog 
                            title="Service Request"
                            isOpen={isModalOpen}
                            isSubmitting={isLoading}
                            handleClose={handleCloseModal}
                            handleSubmit={handleSubmit}
                            isSubmitButtonDisabled={!(dirty && isValid)}
                        >
                        <Stack className="form-row" spacing={2} mb={2}>
                            {isCustomer && ( <><FormControl fullWidth>
                                <InputLabel id="input-car">Car</InputLabel>
                                <Select
                                    labelId="input-car"
                                    name="vehicle_id"
                                    id="vehicle_id"
                                    value={values.vehicle_id}
                                    label="Car"
                                    onChange={handleChange}
                                    error={touched.vehicle_id && Boolean(errors.vehicle_id)}
                                    onBlur={handleBlur}
                                    className={errors.vehicle_id && touched.vehicle_id ? "input-error" : ""}
                                >   
                                    {   
                                        carOptions?.length ? carOptions.map(({label, value}) => {
                                            return (
                                                <MenuItem value={value}>{label}</MenuItem>
                                            )
                                        }) :
                                        <MenuItem value="">No available vehicle</MenuItem>
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
                                    isNew={true}
                                    value={dayjs(values.preferred_schedule)}
                                    onChange={(newValue) => setFieldValue('preferred_schedule', newValue)} // Update Formik state
                                    error={touched.preferred_schedule && Boolean(errors.preferred_schedule)} // Show error if touched and invalid
                                    helperText={touched.preferred_schedule && errors.preferred_schedule}
                                />
                                { errors.preferred_schedule && touched.preferred_schedule && (
                                    <span className="error">{errors.preferred_schedule}</span>
                                ) }
                            </FormControl></>)}
                            {!isCustomer && (
                                <>
                                
                                <div className="flex flex-col">
                                    <button 
                                    type="button"
                                    onClick={() => {
                                    setIsChangeImage(!isChangeImage)
                                    }}>
                                    {`${ isChangeImage ? 'Cancel Upload' : 'Upload Image' }`}
                                    </button>
                                
                                    { isChangeImage && (
                                    <Box>
                                    <Box >
                                        Upload Image
                                    </Box>
                                    <input
                                        type="file"
                                        id="imageFile"
                                        name="imageFile"
                                        accept="image/*"
                                        onChange={(e) => {
                                        const file = e.target.files?.[0] || null;
                                        setFieldValue('imageFile', file);
                                        handleImageChange(e);
                                        }}
                                    /></Box> )
                                    }
                                    {imagePreview && (
                                    <Box sx={{ width: "100%", overflow: "hidden" }}>
                                    <img
                                      src={imagePreview}
                                      alt="Preview"
                                      style={{
                                        width: "100%", 
                                        height: "100%",
                                        objectFit: "cover", 
                                        borderRadius: "8px"
                                      }}
                                    />
                                  </Box>
                                    )}
                                    <ErrorMessage name="image" component="div" className="text-red-600 text-sm" />
                                </div>
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
                                <TextField
                                    type="number"
                                    name="service_amount"
                                    id="service_amount"
                                    InputProps={{
                                        inputMode: 'decimal', 
                                        inputProps: {
                                            step: "0.01", 
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
                                    value={values.service_amount}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={errors.service_amount && touched.service_amount ? "input-error" : ""}
                                />
                                {errors.service_amount && touched.service_amount && (
                                    <span className="error">{errors.service_amount}</span>
                                )}
                            </>
                            )}
                        </Stack>
                        </CustomDialog>

                    </Form>
                );
            }}
        </Formik>
    )
}

export default RepaireRequestUpsert