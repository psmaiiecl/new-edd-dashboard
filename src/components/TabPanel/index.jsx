import { useRef } from "react";
import "./style.css";

export function TabPanel({ isActive, children, keepAlive }) {
  const hasRendered = useRef(false);

  if (!keepAlive) {
    if (!isActive) return null;
    return <div className="tab-panel active">{children}</div>;
  }

  if (isActive) {
    hasRendered.current = true;
  }

  if (!hasRendered.current) return null;

  return (
    <div className={`tab-panel ${isActive ? "active" : "hidden"}`}>
      {children}
    </div>
  );
}
