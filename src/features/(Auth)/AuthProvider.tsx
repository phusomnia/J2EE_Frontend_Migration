import { createContext, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  token: string | null;
  decodedToken: any | null;
  setToken: (token: string) => void;
  removeToken: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  decodedToken: null,
  setToken: () => {},
  removeToken: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [cookies, setCookie, removeCookie] = useCookies(["ACCESS_TOKEN"]);

  const setToken = (token: string) => {
    setCookie("ACCESS_TOKEN", token, {
      path: "/",
    });
  };

  const removeToken = () => {
    removeCookie("ACCESS_TOKEN", { path: "/" });
  };

  const token: string | null = cookies.ACCESS_TOKEN ?? null;

  const decodedToken = useMemo(() => {
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (e) {
      console.error("Failed to decode token", e);
      return null;
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, decodedToken, setToken, removeToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
