import axios from "axios";
import { SetStateAction } from "react";

const useAuth = (setAuthenticated: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) => {
  axios
    .get("http://localhost:8000/protected-route", { withCredentials: true })
    .then(({ data }) => {
      const { isAuth } = data;
      setAuthenticated(isAuth);
    })
    .catch((err) => {
      console.log("err", err);
      setAuthenticated(false);
    });
};

export default useAuth;
