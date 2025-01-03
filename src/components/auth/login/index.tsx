import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../hooks/authProvider";
import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { blueGrey } from '@mui/material/colors';
import LoginIcon from '@mui/icons-material/Login';

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
        name: null
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
        <Typography variant="h3" m={3}>Log In</Typography>
        <Form onSubmit={handleSubmit}>
          <Stack className="form-row" spacing={2} mb={2}>
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
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              sx={{
                color: "white",
                backgroundColor: "white"
              }}
              onChange={handleChange}
              className={errors.password && touched.password ? "input-error" : ""}
            />
            {errors.password && touched.password && (
              <span className="error">{errors.password}</span>
            )}
            
          <LoadingButton
            style={{ color: "whitesmoke" }}
            sx={{ color: "whitesmoke", backgroundColor: blueGrey[900]}}
            loading={isSubmitting}
            loadingPosition="start"
            type="submit"
            startIcon={<LoginIcon />}
            className={!(dirty && isValid) ? "disabled-btn" : ""}
            disabled={!dirty || !isValid}
          >
            Sign In
          </LoadingButton>
          </Stack>

        </Form>
      </div>
    );
  }}
</Formik>

  );
};

export default SignInForm;
