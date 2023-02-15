import { createContext } from "react";

const authContext = createContext({
  authenticated: false,
  setAuthenticated: (value: boolean) => {},
});

export default authContext;
