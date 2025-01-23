import { Formik, Form } from "formik";
import * as Yup from "yup";
import { IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import LoginIcon from '@mui/icons-material/Login';
import CustomLoadingButton from "../../../button/loding-button";
import api from "../../../../config/api";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const registerSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is a required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match'),
});

const initialValues = {
confirm_password: "",
  password: ""
};

interface IResetPassword {
    token:string
}
const ResetPassword:FC<IResetPassword> = ({token}) => {

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showCPassword, setShowCPassword] = useState<boolean>(false)

  return (
    <Formik
  initialValues={initialValues}
  validationSchema={registerSchema}
  onSubmit={async (values) => {
    try {
      setIsSubmitting(true)
      await api.post(`/api/reset-password/${token}`, values);

    } catch (err) {

    } finally {
      setIsSubmitting(false)

    }
  }}
>
  {(formik) => {
    const { errors, handleBlur, touched, isValid, dirty, handleSubmit, handleChange } = formik;

    return (
      <div className="container">
        <Typography 
          sx={{ textTransform: "uppercase", letterSpacing: "2px"}} 
          color="#455a64"
          fontWeight="700" 
          variant="h4" component="span"
        >Change Password</Typography>
        <Form onSubmit={handleSubmit}>
          <Stack className="form-row" spacing={2} m={2}>            
            <TextField
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              sx={{
                color: "white",
                backgroundColor: "white"
              }}
              error={errors.password && touched.password || undefined}
              helperText={errors.password && touched.password && errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password ? "input-error" : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              type={showCPassword ? "text" : "password"}
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm Password"
              sx={{
                color: "white",
                backgroundColor: "white"
              }}
              error={errors.confirm_password && touched.confirm_password || undefined}
              helperText={errors.confirm_password && touched.confirm_password && errors.confirm_password}
              onBlur={handleBlur}
              onChange={handleChange}
              className={errors.confirm_password && touched.confirm_password ? "input-error" : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowCPassword(!showCPassword)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {!showCPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
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

export default ResetPassword;
