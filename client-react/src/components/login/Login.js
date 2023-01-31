import React, { useContext, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import authContext from "../../contexts/authContext";
import SimpleForm from "../simpleForm/simpleForm";

const Login = () => {
  const [errorMessages, setErrorMessages] = useState({});
  let navigate = useNavigate();
  const auth = useContext(authContext);

  const authHandler = ({ isAuth, message }) => {
    if (isAuth) {
      auth.setAuthenticated(true);
      navigate("/protected");
    } else {
      setErrorMessages({ message });
      auth.setAuthenticated(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { uname, pw } = document.forms[0];
    const data = { uname: uname.value, pw: pw.value };
    axios
      .post("http://localhost:8000/login", data, { withCredentials: true })
      .then((response) => {
        authHandler(response.data);
      })
      .catch((error) => {
        auth.setAuthenticated(false);
        setErrorMessages({ message: error });
        console.log("Error:", error);
      });
  };

  const renderErrorMessage = () => {
    return (
      errorMessages.message && (
        <div className="error">{errorMessages.message}</div>
      )
    );
  };

  return (
    <div className="app">
      {auth.authenticated && <Navigate to={"/protected"} />}
      <div className="login-form">
        <div className="title">Sign In</div>
        <SimpleForm
          handleSubmit={handleSubmit}
          renderErrorMessage={renderErrorMessage}
          inputClass={"submit-login"}
        />
      </div>
    </div>
  );
};

export default Login;
