import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth.ts";

type ProtectedRouteProps = {
  roles?: string[]; // optional: [ "TRAINER", "ADMIN" ]
};

const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  // Αν δεν είναι συνδεδεμένος
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location, message: "Πρέπει να είσαι συνδεδεμένος για να μπεις εδώ" }}
        replace
      />
    );
  }

  // Αν θέλει ρόλο και δεν τον έχει
  if (roles && !roles.includes(role ?? "")) {
    return (
      <Navigate
        to="/"
        state={{ from: location, message: "Πρέπει να είσαι trainer για να μπεις εδώ" }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
