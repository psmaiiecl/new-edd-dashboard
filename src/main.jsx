import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LoadingProvider } from "./context/LoadingProvider.jsx";
import { NotificationProvider } from "./context/NotificationProvider.jsx";
import { QueueLoadingPanel } from "./components/QueueLoadingPanel/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      {<QueueLoadingPanel />}
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </LoadingProvider>
  </StrictMode>
);
