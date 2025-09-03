import { type ReactNode, useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie } from "@/utils/cookies.ts";
import { AuthContext } from "@/context/AuthContext.ts";
import { type LoginFields, login, type AuthResponse } from "@/api/login.ts";
import {redirect} from "react-router";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [firstname, setFirstname] = useState<string | null>(null);
  const [lastname, setLastname] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const stored = getCookie("auth_data");
    if (stored) {
      try {
        const parsed: AuthResponse = JSON.parse(stored);
        setAccessToken(parsed.token);
        setFirstname(parsed.firstname);
        setLastname(parsed.lastname);
        setRole(parsed.role);
      } catch {
        logoutUser();
      }
    }
    setLoading(false);
  }, []);

  const loginUser = async (fields: LoginFields) => {
    const response = await login(fields); // ✅ AuthResponse

    setAccessToken(response.token);
    setFirstname(response.firstname);
    setLastname(response.lastname);
    setRole(response.role);

    // 📝 αποθηκεύουμε ΟΛΟ το αντικείμενο στο cookie
    setCookie("auth_data", JSON.stringify(response), {
      expires: 1, // 1 μέρα
      sameSite: "Lax",
      secure: false,
      path: "/",
    });
  };

  const logoutUser = () => {
    deleteCookie("auth_data");
    setAccessToken(null);
    setFirstname(null);
    setLastname(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!accessToken,
        accessToken,
        firstname,
        lastname,
        role,
        loginUser,
        logoutUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;