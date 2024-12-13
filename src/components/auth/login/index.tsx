import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../hooks/authProvider";
import { Stack, TextField, Typography } from "@mui/material";

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

  const auth = useAuth()
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={async (values) => {
          auth.loginAction(values)
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="container">
            <Typography variant="h3" m={3}>Log In</Typography>
            <Form>
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
                  // className={errors.email && touched.email ? "input-error" : ""}
                />
                {/* <ErrorMessage name="email" component="span" className="error" /> */}
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
                {/* <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                /> */}
              </Stack>

              <button
                style={{color: "whitesmoke"}}
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!(dirty && isValid)}
              >
                Sign In
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default SignInForm;
