import { Outlet, useLocation } from "react-router";
import { Menu } from "./elements/Menu";

export default function EDD2026Module() {
  const location = useLocation();
  const isBaseRoute = location.pathname === "/dashboard/2026";

  return <>{isBaseRoute ? <Menu/> : <Outlet />}</>;
}
