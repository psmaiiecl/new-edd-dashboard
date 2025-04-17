import { useState } from "react";
import { LoadingContext } from "./LoadingContext";

export function LoadingProvider({ children }) {
  const [loadQueue, setLoadQueue] = useState(0);

  const queueLoading = () => {
    setLoadQueue((prev) => prev + 1);
  };

  const dequeueLoading = () => {
    setLoadQueue((prev) => prev - 1);
  };

  const isLoading = loadQueue > 0;

  return (
    <LoadingContext.Provider
      value={{ isLoading, queueLoading, dequeueLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
