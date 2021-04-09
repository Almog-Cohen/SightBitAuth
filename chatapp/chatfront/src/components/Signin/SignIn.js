import React, { useState } from "react";
import { useFormik } from "formik";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import { authenticate } from "../../utils/apiClient";

import "./SignIn.css";
import { validatePassword, validateEmail } from "../../utils/formValidation";

const INCRORRENT_PASSWORD = "Incorrect password";
const USER_NOT_EXSISTS = "User not exists";

const SignIn = ({ setUserName }) => {
  const history = useHistory();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    onSubmit: (values) => {
      onSubmitSignIn(values);
    },
  });

  const onSubmitSignIn = async (values) => {
    setIsLoading(true);
    const userAuth = await authenticate(values);
    setIsLoading(false);

    switch (userAuth) {
      case USER_NOT_EXSISTS:
        setError(USER_NOT_EXSISTS);

        break;
      case INCRORRENT_PASSWORD:
        setError(INCRORRENT_PASSWORD);

        break;

      default:
        // if user and password correct

        // add token
        setUserName(userAuth);

        // get name or token
        history.push("/chat");
    }
  };

  return (
    <div className="login-page-component-container">
      <form onSubmit={formik.handleSubmit}>
        <Card elevation={10} className="login-card">
          <div className="card-content">
            <div className="card-input">
              <TextField
                error={formik.errors.email}
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
                error={formik.errors.password}
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
