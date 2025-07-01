import { useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";
import { LoadingContext } from "../context/LoadingContext";

const CACHE_TTL = 10000;

export function useCustomFetch() {
  const { getToken } = useContext(AuthContext);
  const { notificate } = useContext(NotificationContext);
  const { queueLoading, dequeueLoading } = useContext(LoadingContext);

  const customFetch = useCallback(
    async ({
      route,
      options = {},
      method = "POST",
      shouldCache = false,
      hasLoadPanel = true,
      formData = null,
    }) => {
      const URL = import.meta.env.VITE_BASE_URL + route;
      //const method = method?.toUpperCase() || "GET";
      const bodyString = formData
        ? JSON.stringify(formData)
        : options.body
        ? JSON.stringify(options.body)
        : "";
      const cacheKey = `${method}:${URL}:${bodyString}`;
      const now = Date.now();
      if (shouldCache) {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const { timestamp, data } = JSON.parse(cached);
          if (now - timestamp < CACHE_TTL) {
            return data;
          }
        }
      }

      const headers = {
        "Content-Type": "application/json",
        t: getToken(),
        ...(options.headers || {}),
      };

      options.body = bodyString;
      options.method = method;
      options.headers = headers;

      if (formData) {
        const parsedFormData = new FormData();
        for (let key in formData) {
          parsedFormData.append(key, formData[key].value);
        }
        options.body = parsedFormData;
        delete options.headers["Content-Type"];
      }

      if (hasLoadPanel) queueLoading();
      try {
        const response = await fetch(URL, options);

        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }

        const data = await response.json();

        if (shouldCache) {
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ timestamp: now, data })
          );
        }

        return data;
      } catch (error) {
        notificate({ type: "error", message: error.message });
      } finally {
        if (hasLoadPanel) dequeueLoading();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return customFetch;
}
