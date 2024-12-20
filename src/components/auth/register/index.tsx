import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../hooks/authProvider";
import { Stack, TextField, Typography } from "@mui/material";
import './style.css';

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
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
                <button
                    type="submit"
                    style={{color: "whitesmoke"}}
                    className={!(dirty && isValid) ? "disabled-btn" : ""}
                    disabled={!(dirty && isValid)}
                >
                    Register
                </button>
            </Stack>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default SignUpForm;
