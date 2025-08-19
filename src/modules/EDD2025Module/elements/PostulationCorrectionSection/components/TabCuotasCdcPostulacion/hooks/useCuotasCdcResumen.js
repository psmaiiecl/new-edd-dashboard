import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../../../../services/axiosInstance";
import { LoadingContext } from "../../../../../../../context/LoadingContext";

export const useCuotasCdcResumen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { queueLoading, dequeueLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        queueLoading();
        setLoading(true);
        const url = "/back/public/api2025/2025-cuotasCdcResumen";
        const response = await axiosInstance.get(url);
        setData(response.data || []);
        console.log(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
        dequeueLoading();
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
