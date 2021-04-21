import React, { useState } from "react";
import { useFormik } from "formik";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import { registerUser } from "../Signin/authSlice";
import { useSelector, useDispatch } from "react-redux";
import LocalStorageService from "../../utils/LocalStorageService";

import {
  validateUserName,
  validatePassword,
  validateEmail,
} from "../../utils/formValidation";

const USER_EXISTS = "User exists";

const localStorageService = LocalStorageService.getService();

const Register = () => {
  const history = useHistory();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      // returns error object, if empty then there are not errors and the form is valid
      return {
        ...validateUserName(values.username),
        ...validateEmail(values.email),
        ...validatePassword(values.password),
      };
    },
    onSubmit: async (values) => {
      const response = await dispatch(registerUser(values));
      if (response.payload === USER_EXISTS) {
        setError(response.payload);
      }

      /// set tokens
      if (typeof response.payload.name != "undefined") {
        localStorageService.setToken(response.payload);
        history.push("/home-page");
      }
    },
  });

  return (
    <div className="login-page-component-container">
      <form onSubmit={formik.handleSubmit}>
        <Card elevation={10} className="login-card">
          <div className="card-content">
            <div className="card-input">
              <TextField
                error={!!formik.errors.username}
                helperText={formik.errors.username}
                fullWidth={true}
                required
                label="Username"
                name="username"
                placeholder="Enter username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
            </div>

            <div className="card-input">
              <TextField
                error={!!formik.errors.email}
                helperText={formik.errors.email}
                fullWidth={true}
                required
                label="Email"
                name="email"
                placeholder="Enter Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>

            <div className="card-input">
              <TextField
                required
                error={!!formik.errors.password}
                helperText={formik.errors.password}
                fullWidth={true}
                label="Password"
                name="password"
                placeholder="Enter Password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>

            {error && (
              <p className="card-input" style={{ color: "red" }}>
                {error}
              </p>
            )}
            <div className="card-input">
              {isLoading ? (
                <CircularProgress color="secondary" />
              ) : (
                <>
                  <Button
                    type="submit"
                    color="primary"
                    fullWidth={true}
                    variant="contained"
                    disabled={false}
                  >
                    Register
                  </Button>

                  <Button
                    style={{ marginTop: "10px" }}
                    color="primary"
                    type="submit"
                    onClick={() => history.push("/login")}
                    fullWidth={true}
                    variant="contained"
                    disabled={false}
                  >
                    Back to Login
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default Register;
