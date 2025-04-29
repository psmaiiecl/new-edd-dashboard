import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router";

export function RouteProtector({ children }) {
  const { getToken } = useContext(AuthContext);
  if (getToken()) {
    return children;
  }
  return <Navigate to="/" />;
}
