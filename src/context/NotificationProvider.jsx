import { useState } from "react";
import { NotificationContext } from "./NotificationContext";
import { Notification } from "../components/Notification";

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState();
  const notificate = ({ type = "success", message = "" }) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000); // Desaparece después de 3s
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ notificate }}>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          closeFn={closeNotification}
        />
      )}
      {children}
    </NotificationContext.Provider>
  );
}
