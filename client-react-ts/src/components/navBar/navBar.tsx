import React, { useContext } from "react";
import { Link } from "react-router-dom";
import authContext from "../../contexts/authContext";

const NavBar = () => {
  const auth = useContext(authContext);

  return (
    <div className="navbar">
      <Link to={"/protected"}>PROTECTED</Link>
      {!auth.authenticated && <Link to={"/register"}>REGISTER</Link>}
      {!auth.authenticated && <Link to={"/login"}>LOGIN</Link>}
      <Link to={"/not-protected"}>NOT PROTECTED</Link>
      {auth.authenticated && <Link to={"/logout"}>LOGOUT</Link>}
    </div>
  );
};

export default NavBar;
