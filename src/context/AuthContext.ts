import { createContext } from "react";
import type { LoginFields } from "@/api/login.ts";


type AuthContextProps = {
  isAuthenticated: boolean;
  accessToken: string | null;
  role: string | null;
  firstname: string | null;
  lastname: string | null;
  loginUser: (fields: LoginFields) => Promise<void>;
  logoutUser: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
