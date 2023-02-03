import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useLogout = (setAuthenticated, authenticated) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/");
    }
  }, [authenticated]);

  axios
    .get("http://localhost:8000/logout", { withCredentials: true })
    .then(() => {
      setAuthenticated(false);
    })
    .catch((err) => {
      console.log("Logout error: ", err);
      setAuthenticated(false);
    });
};

export default useLogout;
