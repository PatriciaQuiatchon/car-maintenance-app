import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../hooks/authProvider";
import { Stack, TextField, Typography } from "@mui/material";

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
        console.log(values);
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="container">
            <Typography variant="h3" m={3}>Create an account</Typography>
            <Form>
            <Stack className="form-row" spacing={2} mb={2}>
            <TextField
                  size="medium"
                  hiddenLabel
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  sx={{
                    color: "white",
                    backgroundColor: "white",
                    borderColor: errors.name && touched.name ? "red" : ""
                  }}
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className="error"
                />
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
                  className={errors.email && touched.email ? "input-error" : ""}
                />
                <span>
                  {errors.email}
                </span>
                <ErrorMessage
                  name="email"
                  component="span"
                  className="error"
                />
                <TextField
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  sx={{
                    color: "white",
                    backgroundColor: "white"
                  }}
                  className={
                    errors.password && touched.password ? "input-error" : ""
                  }
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
