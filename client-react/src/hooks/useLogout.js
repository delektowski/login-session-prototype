import axios from "axios";
import {useNavigate} from "react-router-dom";

const useLogout = (setAuthenticated) => {
    let navigate = useNavigate();

    axios
        .get("http://localhost:8000/logout", { withCredentials: true })
        .then((resp) => {
            setAuthenticated(false);
            setTimeout(() => { navigate("/");}, 2000)

        })
        .catch((err) => {
            setAuthenticated(false);
            navigate("/");
        });
}


export default useLogout;
