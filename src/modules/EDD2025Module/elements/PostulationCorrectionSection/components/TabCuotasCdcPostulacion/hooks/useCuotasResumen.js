import { useEffect, useState } from "react";
import axiosInstance from "../../../../../services/axiosInstance";

export const useCuotasDetalle = (cdc) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cdc) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/back/public/api2024/2024-cuotasCdcResumen?cdc=${encodeURIComponent(cdc)}`
        );
        setData(response.data || []);
      } catch (error) {
        console.error("Error al obtener cuotas detalle:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cdc]);

  return { data, loading };
};
