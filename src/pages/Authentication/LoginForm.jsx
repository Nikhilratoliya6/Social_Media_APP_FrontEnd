import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/Auth/auth.action";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function LoginForm() {
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch(loginUser(values));
    console.log("handle submit", values);
  };

  useEffect(() => {
    if (auth.reqUser?.firstName) {
      navigate("/");
    }
  }, [auth.reqUser]);

  return (
    <div>
      <Formik
        initialValues={formValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-5">
          <div className="space-y-5">
            <div>
              <Field
                as={TextField}
                name="email"
                placeholder="Enter your email..."
                type="email"
                variant="outlined"
                fullWidth
                className="form-input"
                InputProps={{
                  style: {
                    color: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "0.5rem",
                  },
                }}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="password"
                placeholder="Enter your password..."
                type="password"
                variant="outlined"
                fullWidth
                className="form-input"
                InputProps={{
                  style: {
                    color: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "0.5rem",
                  },
                }}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="form-button"
            sx={{
              background: "linear-gradient(to right, #FF3040, #833AB4)",
              textTransform: "none",
              py: 1.5,
              mt: 2,
              "&:hover": {
                background: "linear-gradient(to right, #FF4D5D, #9C4FD6)",
              },
            }}
          >
            Login
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginForm;
