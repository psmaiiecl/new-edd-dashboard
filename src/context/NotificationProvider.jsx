import { useState } from "react";
import { NotificationContext } from "./NotificationContext";
import { Notification } from "../components/Notification";

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const notificate = ({ type = "success", message = "" }) => {
    setNotification({ type, message, isClosing: false });

    setTimeout(() => {
      setNotification((prev) => {
        if (!prev) return null;
        return { ...prev, isClosing: true };
      });
      setTimeout(() => setNotification(null), 500);
    }, 4000);
  };
  const closeNotification = () => {
    if (notification) {
      setNotification((prev) => ({ ...prev, isClosing: true }));
      setTimeout(() => setNotification(null), 500);
    }
  };

  return (
    <NotificationContext.Provider value={{ notificate }}>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          closeFn={closeNotification}
          isClosing={notification.isClosing}
        />
      )}
      {children}
    </NotificationContext.Provider>
  );
}
