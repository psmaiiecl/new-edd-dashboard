import "./index.css";
import { useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";

export function QueueLoadingPanel() {
  const { isLoading } = useContext(LoadingContext);
  if (!isLoading) return null;
  return (
    <div className="global-loading-panel">
      <div className="lds-dual-ring"></div>
    </div>
  );
}
