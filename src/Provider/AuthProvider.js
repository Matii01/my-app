import React, { useReducer } from "react";

export const AuthContenx = React.createContext();

const initialstate = {
  accessToken: null,
  refreshToken: null,
};
const reducer = (state, actions) => {
  switch (actions.type) {
    case "SET_TOKENS":
      return {
        ...state,
        accessToken: actions.payload.accessToken,
        refreshToken: actions.payload.refreshToken,
      };
    case "SET_ACCESS_TOKEN":
      return {
        ...state,
        accessToken: actions.payload.accessToken,
      };
    case "SET_REFRESH_TOKEN":
      return {
        ...state,
        refreshToken: actions.payload.refreshToken,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialstate);

  return (
    <AuthContenx.Provider value={{ state, dispatch }}>
      {children}
    </AuthContenx.Provider>
  );
};
