import { useEffect, useState } from "react";
import axiosInstance from "../../../../../services/axiosInstance";

export function useCuotasCdcPostulacion(centroCorreccion) {
  const [resumen, setResumen] = useState(null);
  const [detalle, setDetalle] = useState(null);
  const [loading, setLoading] = useState(false);

  // Obtener resumen general
  const fetchResumen = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/back/public/api2024/2024-cuotasCdcResumen"); 
      setResumen(data);
      console.log("Resumen CDC:", data);
    } catch (err) {
      console.error("Error al cargar resumen:", err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener detalle de un centro específico
  const fetchDetalle = async () => {
    if (!centroCorreccion) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/back/public/api2024/2024-cuotas-cdc/${centroCorreccion}`,
        { params: { centro_correccion: centroCorreccion } }
      );
      setDetalle(data);
      console.log(`Detalle CDC (${centroCorreccion}):`, data);
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
