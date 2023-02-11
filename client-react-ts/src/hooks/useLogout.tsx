import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useLogout = (setAuthenticated: { (value: boolean): void; (arg0: boolean): void; }, authenticated: unknown) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/");
    }
  }, [authenticated,navigate]);

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
