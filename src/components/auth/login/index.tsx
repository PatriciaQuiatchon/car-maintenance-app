import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../hooks/authProvider";
import { IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import LoginIcon from '@mui/icons-material/Login';
import CustomLoadingButton from "../../button/loding-button";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const registerSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
});

const initialValues = {
  email: "",
  password: ""
};

const SignInForm = () => {

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const auth = useAuth()
  return (
    <Formik
  initialValues={initialValues}
  validationSchema={registerSchema}
  onSubmit={async (values) => {
    try {
      setIsSubmitting(true)
      await auth.loginAction({
        ...values,
        name: null,
      });
    } catch (err) {
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
          variant="h3" component="span"
        >Log In</Typography>
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
            
            <TextField
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              sx={{
                color: "white",
                backgroundColor: "white"
              }}
              onChange={handleChange}
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
            {errors.password && touched.password && (
              <span className="error">{errors.password}</span>
            )}
          <CustomLoadingButton 
            dirty={dirty}
            isSubmitting={isSubmitting}
            icon={<LoginIcon />}
            isValid={isValid}
            label="Sign In"
          />

          </Stack>
        </Form>
      </div>
    );
  }}
</Formik>

  );
};

export default SignInForm;
