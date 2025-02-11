import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../hooks/authProvider";
import { Box, FormControl, Grid2, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import './style.css';
import PublishIcon from '@mui/icons-material/Publish';
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomLoadingButton from "../../button/loding-button";
const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars min"),
  validId: Yup.string().required("Valid ID Type is required"),
  validIdNumber: Yup.string().matches(/^[a-zA-Z0-9]+$/, "Valid ID Number must contain only letters and numbers")
  .required("Valid ID Number is required"),
});

const initialValues = {
  email: "",
  password: "",
  name: "",
  validIdNumber: "",
  validId: "",
};

export const validIds = ["Driver's license", "Passport", "Unified Multi-purpose ID", "PhilPost Postal ID (PID)", "Philippine Identification", "Senior Citizen ID", "PRC ID"]

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
          <Box className="container" sx={{pt:10}}>
            <Typography 
               sx={{ textTransform: "uppercase", letterSpacing: "2px"}} 
               color="#455a64"
               fontWeight="600" 
               variant="h6" component="span"
            >Create an account</Typography>
            <Form>
              <Stack className="form-row" spacing={2} m={2}>
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
              <CustomLoadingButton 
                dirty={dirty}
                isSubmitting={auth.isSubmitting}
                icon={<PublishIcon />}
                isValid={isValid}
                label="Register"
              />
            </Stack>
            </Form>
          </Box>
        );
      }}
    </Formik>
  );
};

export default SignUpForm;
