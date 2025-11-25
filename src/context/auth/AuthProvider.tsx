import React, { useEffect, useReducer } from "react";
import { AuthContext, initialize, initialState, reducer } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const accessToken: string = localStorage.getItem("ACCESS_TOKEN")!;
    if (accessToken) {
      console.log("find token, dispatch");
      try {
        const user = jwtDecode<any>(accessToken);
        dispatch(
          initialize({ isAuthenticated: true, user: user, isInitialized: true })
        );
      } catch (err) {
        console.error("Failed to decode JWT", err);
        dispatch(
          initialize({
            isAuthenticated: false,
            user: null,
            isInitialized: true,
          })
        );
      }
    } else {
      console.log("Can't find access token");
      dispatch(
        initialize({ isAuthenticated: false, user: null, isInitialized: true })
      );
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
