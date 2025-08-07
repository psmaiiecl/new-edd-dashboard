// hooks/useCuotasCdcPostulacion.js
import { useEffect, useState } from "react";
import axios from "../../../../../services/axiosInstance";

export function useCuotasCdcPostulacion(centroCorreccion) {
  const [resumen, setResumen] = useState(null);
  const [detalle, setDetalle] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchResumen = async () => {
    setLoading(true);
    try {
      const response = await axios.get("2024/2024-cuotasCdcResumen");
      setResumen(response);
      console.log("resumen:"+ response);
    } catch (err) {
      console.error("Error al cargar resumen:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetalle = async () => {
    if (!centroCorreccion) return;
    setLoading(true);
    try {
      const response = await axios.get(`2024/2024-cuotasCdcResumen/${centroCorreccion}`, {
        params: { centro_correccion: centroCorreccion },
      });
      setDetalle(response);
      console.log("detalle:"+ centroCorreccion);
    } catch (err) {
      console.error("Error al cargar detalle:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumen();
  }, []);

  useEffect(() => {
    fetchDetalle();
  }, [centroCorreccion]);

  return {
    resumen,
    detalle,
    loading,
  };
}
