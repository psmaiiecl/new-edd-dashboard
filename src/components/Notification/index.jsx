import "./index.css";

export function Notification({ type, message, closeFn }) {
  return (
    <div
      className={`notification-card ${type === "success" ? "success" : "error"
        }`}
    >
      <span className="roboto-bold notification-close" onClick={closeFn}>
        X
      </span>
      <span className="roboto-regular">{message}</span>
    </div>
  );
}
