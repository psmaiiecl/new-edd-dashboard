import { Menu } from "./elements/Menu";
import "./index.css";
import { Outlet, useLocation } from "react-router";

export function EDD2025Module() {
  const location = useLocation();
  const isBaseRoute = location.pathname === "/dashboard/2025";

  return <>{isBaseRoute ? <Menu /> : <Outlet />}</>;
}
