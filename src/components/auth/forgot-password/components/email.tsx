import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import LoginIcon from '@mui/icons-material/Login';
import CustomLoadingButton from "../../../button/loding-button";
import api from "../../../../config/api";
import toast from "react-hot-toast";

const registerSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
});

const initialValues = {
  email: "",
  password: ""
};

const ForgotPassword = () => {

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  return (
    <Formik
  initialValues={initialValues}
  validationSchema={registerSchema}
  onSubmit={async (values) => {
    try {
      setIsSubmitting(true)
      await api.post("/api/forgot-password", values);
      toast.success("Reset password link has sent to your email")
        
    } catch (err) {
        console.log(err)
        toast.error("Email not found")
    } finally {
      setIsSubmitting(false)

    }
  }}
>
  {(formik) => {
    const { errors, touched, isValid, dirty, handleSubmit, handleChange } = formik;

    return (
      <div className="container">
        <Typography 
          sx={{ textTransform: "uppercase", letterSpacing: "2px"}} 
          color="#455a64"
          fontWeight="700" 
          variant="h5" component="span"
        >Forgot your password Form</Typography>
        <Form onSubmit={handleSubmit}>
          <Stack className="form-row" spacing={2} m={2}>
            <TextField
              size="medium"
              hiddenLabel
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              sx={{
                color: "white",
                backgroundColor: "white"
              }}
              onChange={handleChange}
              className={errors.email && touched.email ? "input-error" : ""}
            />
            {errors.email && touched.email && (
              <span className="error">{errors.email}</span>
            )}
          <CustomLoadingButton 
            dirty={dirty}
            isSubmitting={isSubmitting}
            icon={<LoginIcon />}
            isValid={isValid}
            label="Reset password"
          />

          </Stack>
        </Form>
      </div>
    );
  }}
</Formik>

  );
};

export default ForgotPassword;
