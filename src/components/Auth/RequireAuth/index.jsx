import { Navigate } from "react-router-dom";

export function RequireAuth({ children }) {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to="/signin"></Navigate>;
  }
  return children;
}
