import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../hooks/authProvider";
import { IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import './style.css';
import { LoadingButton } from "@mui/lab";
import { blueGrey } from "@mui/material/colors";
import PublishIcon from '@mui/icons-material/Publish';
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars min")
});

const initialValues = {
  email: "",
  password: "",
  name: "",
};

const SignUpForm = () => {
  const auth = useAuth();

  const [showPassword, setShowPassword] = useState<boolean>(false)
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={(values) => {
        auth.registerAction({
          ...values,
        })
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty, handleChange, handleBlur } = formik;
        return (
          <div className="container">
            <Typography variant="h3" m={3}>Create an account</Typography>
            <Form>
              <Stack className="form-row" spacing={2} mb={2}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    color: "white",
                    backgroundColor: "white"
                  }}
                  error={!!(errors.name && touched.name)}
                  required
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className="error"
                />
              <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    color: "white",
                    backgroundColor: "white"
                  }}
                  error={!!(errors.email && touched.email)}
                  required
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className="error"
                />
                <TextField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    color: "white",
                    backgroundColor: "white"
                  }}
                  error={!!(errors.password && touched.password)}
                  required
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
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
                
              <LoadingButton
                style={{ color: "whitesmoke" }}
                sx={{ color: "whitesmoke", backgroundColor: blueGrey[900]}}
                loading={auth.isSubmitting}
                loadingPosition="start"
                type="submit"
                startIcon={<PublishIcon />}
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!dirty || !isValid}
              >
                Register
              </LoadingButton>
            </Stack>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default SignUpForm;
