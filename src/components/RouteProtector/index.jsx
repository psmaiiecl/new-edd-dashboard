import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router";
import { NotificationContext } from "../../context/NotificationContext";

export function RouteProtector({ children, permittedRoles, excludedRoles }) {
  const { getToken, getTipoUsuario } = useContext(AuthContext);
  const { notificate } = useContext(NotificationContext);

  if (!getToken()) {
    notificate({
      type: "error",
      message: `Token de acceso expirado, inicie sesion nuevamente`,
    });
    return <Navigate to="/" />;
  }

  const tipoUsuario = getTipoUsuario();

  if (permittedRoles && !permittedRoles.includes(tipoUsuario)) {
    notificate({
      type: "error",
      message: `No tiene permisos para acceder aquí`,
    });
    return <Navigate to="/" />;
  }

  if (excludedRoles && excludedRoles.includes(tipoUsuario)) {
    notificate({
      type: "error",
      message: `No tiene permisos para acceder aquí`,
    });
    return <Navigate to="/" />;
  }

  return children;
}
