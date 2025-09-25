import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router";

export function RouteProtector({ children, permittedRoles, excludedRoles }) {
  const { getToken, getTipoUsuario } = useContext(AuthContext);

  if (!getToken()) {
    return <Navigate to="/" />;
  }

  const tipoUsuario = getTipoUsuario();

  if(permittedRoles && !permittedRoles.includes(tipoUsuario)){
    return <Navigate to= "/"/>;
  }
  
  if(excludedRoles && excludedRoles.includes(tipoUsuario)){
    return <Navigate to= "/"/>;
  }

  return children;
}
