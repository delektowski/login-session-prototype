import axios from "axios";

const useAuth = (setAuthenticated) => {
  axios
    .get("http://localhost:8000/protected-route", { withCredentials: true })
    .then((resp) => {
      setAuthenticated(true);
    })
    .catch((err) => {
      console.log("err", err);
      setAuthenticated(false);
    });
};

export default useAuth;
