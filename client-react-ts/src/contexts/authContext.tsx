import { createContext } from "react";

const authContext = createContext({
  authenticated: false,
  setAuthenticated: (value: boolean):void => {},
});

export default authContext;
