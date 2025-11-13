import { CloseIcon } from "../../assets/icons/CloseIcon";
import "./index.css";

export function Notification({ type, message, isClosing, closeFn }) {
  return (
    <div
      className={`notification-card roboto-regular ${
        type === "success" ? "success" : "error"
      } ${isClosing ? "closing" : "showing"}`}
    >
      <span className="notification-close-btn" onClick={closeFn}>
        <CloseIcon width={18} height={18} fill="#fff" />
      </span>
      <span className="notification-message">{message}</span>
    </div>
  );
}

