import { useEffect, useState } from "react";
import axiosInstance from "../../../../../services/axiosInstance";

export const useCentrosCorreccion = () => {
  const [centros, setCentros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCentros = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axiosInstance.get(
          "/back/public/api2024/2024-cuotas-cdc"
        );

        // Si backend devuelve objeto { PUCV:{}, UDP:{} }
        const lista =
          Array.isArray(data)
            ? data
            : Object.entries(data).map(([key, value]) => ({
                id: key,
                nombre: value?.nombre || key,
              }));

        setCentros(lista);
      } catch (err) {
        console.error("Error obteniendo centros:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCentros();
  }, []);

  return { centros, loading, error };
};
