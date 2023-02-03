import axios from "axios";

const useAuth = (setAuthenticated) => {
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
