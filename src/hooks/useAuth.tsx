import { AuthContext } from "@/context/auth/AuthContext";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Auth context must be inside auth provider");
  }

  return context;
}
