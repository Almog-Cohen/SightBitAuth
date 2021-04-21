import React, { useState } from "react";
import { useFormik } from "formik";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import LocalStorageService from "../../utils/LocalStorageService";
import { login, googleLogin } from "./authSlice";
import { useSelector, useDispatch } from "react-redux";
import GoogleLogin from "react-google-login";
import GoogleButton from "react-google-button";
import "./SignIn.css";
import { validatePassword, validateEmail } from "../../utils/formValidation";

const INCRORRENT_PASSWORD = "Incorrect password";
const USER_NOT_EXSISTS = "User not exists";
const GOOGLE_SIGN_ACCOUNT = "Please signin with your google account";

const localStorageService = LocalStorageService.getService();

const SignIn = () => {
  const history = useHistory();

  const [error, setError] = useState("");
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      // returns error object, if empty then there are not errors and the form is valid
      return {
        ...validateEmail(values.email),
        ...validatePassword(values.password),
      };
    },
    // Authenticate with normal signin
    onSubmit: async (values) => {
      const response = await dispatch(login(values));
      if (typeof response.payload.name != "undefined") {
        localStorageService.setToken(response.payload);
        history.push("/home-page");
      }

      switch (response.payload) {
        case USER_NOT_EXSISTS:
          setError(USER_NOT_EXSISTS);

          break;
        case INCRORRENT_PASSWORD:
          setError(INCRORRENT_PASSWORD);

          break;

        case GOOGLE_SIGN_ACCOUNT:
          setError(GOOGLE_SIGN_ACCOUNT);
          break;
      }
    },
  });

  // Function that authenticate with google api
  const connectGoogleLogin = async (response) => {
    const googleResponse = await dispatch(googleLogin(response));

    localStorageService.setToken(googleResponse.payload);
    history.push("/home-page");
  };

  return (
    <div className="login-page-component-container">
      <form onSubmit={formik.handleSubmit}>
        <Card elevation={10} className="login-card">
          <div className="card-content">
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
              <GoogleLogin
                clientId="639302706119-3b0vhobj330ui8jsqsbm4bn3hmvg90v5.apps.googleusercontent.com"
                render={(renderProps) => (
                  <GoogleButton
                    style={{
                      width: "100%",
                    }}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Sign in with Google
                  </GoogleButton>
                )}
                buttonText="Login"
                onSuccess={connectGoogleLogin}
                onFailure={connectGoogleLogin}
                cookiePolicy={"single_host_origin"}
              />
            </div>
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
                    Login
                  </Button>

                  <Button
                    style={{ marginTop: "10px" }}
                    color="primary"
                    type="submit"
                    onClick={() => history.push("/register")}
                    fullWidth={true}
                    variant="contained"
                    disabled={false}
                  >
                    Register
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

export default SignIn;
