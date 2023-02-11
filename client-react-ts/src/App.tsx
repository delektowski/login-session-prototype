import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "../src/App.css";
import Login from "./components/login/Login";
import NotProtected from "./components/notProtected/NotProtected";
import NotFound from "./components/notFound/NotFound";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Protected from "./components/protected/Protected";
import useAuth from "./hooks/useAuth";
import authContext from "./contexts/authContext";
import NavBar from "./components/navBar/navBar";
import Logout from "./components/logout/logout";
import Register from "./components/register/register";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  useAuth(setAuthenticated);

  return (
      <>
        <authContext.Provider value={{ authenticated, setAuthenticated }}>
          <NavBar />

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="protected" element={<Protected />} />
            </Route>
            <Route path="register" element={<Register />} />
            <Route path="not-protected" element={<NotProtected />} />
            <Route path="logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </authContext.Provider>
      </>
  );
}

export default App;
