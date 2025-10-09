import './style.css'

export function TabPanel({ isActive, children }) {
  return (
    <div className={`tab-panel ${isActive ? "active" : "hidden"}`}>
      {children}
    </div>
  );
}