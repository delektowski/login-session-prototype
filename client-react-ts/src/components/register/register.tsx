import React, {FormEvent, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SimpleForm from "../simpleForm/simpleForm";

const Register = () => {
  const [errorMessages, setErrorMessages] = useState({message: ''});
  let navigate = useNavigate();

  const registerHandler = ({ isRegistered, message }: {isRegistered: boolean, message: string}) => {
    if (isRegistered) {
      navigate("/login");
    } else {
      setErrorMessages({ message });
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { uname, pw } = document.forms[0];

    const data = { uname: uname.value, pw: pw.value };

    axios
      .post("http://localhost:8000/register", data, { withCredentials: true })
      .then((response) => {
        registerHandler(response.data);
      })
      .catch((error) => {
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
      <div className="login-form">
        <div className="title">Register</div>
        <SimpleForm
          handleSubmit={handleSubmit}
          renderErrorMessage={renderErrorMessage}
          inputClass={"submit-register"}
        />
      </div>
    </div>
  );
};

export default Register;
