import React, { useContext } from "react";
import authContext from "../../contexts/authContext";
import useLogout from "../../hooks/useLogout";

const Logout = () => {
  const auth = useContext(authContext);

  useLogout(auth.setAuthenticated, auth.authenticated);

  return (
    <div>
      <h1>You have successfully logged out!</h1>
    </div>
  );
};

export default Logout;
