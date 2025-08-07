// hooks/useAvanceDiarioPostulacion.js
import { useEffect, useState, useMemo } from "react";
import axios from "axios";

export function useAvanceDiarioPostulacion(url, filtros = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.post(url, filtros);
        setData(res.data);
        setError(null);
      } catch (err) {
        console.error("Error al obtener avance diario postulaciones:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(filtros)]);

  const parsedData = useMemo(() => {
    const raw = data?.postulacion?.avance_diario_postulaciones;
    if (!raw) return null;

    const {
      fechas = [],
      correctores = [],
      supervisores = [],
      postulantes_totales = 0,
      total_correctores = 0,
      total_supervisores = 0,
    } = raw;

    const SUPERVISORES_REQUERIDOS = 127;
    const CORRECTORES_REQUERIDOS = 1201;
    const TOTAL_REQUERIDOS = 1328;

    const series = [
      {
        name: "Postulantes Totales",
        data: correctores,
        color: "#ff537c",
      },
      {
        name: "Pueden ser Supervisores",
        data: supervisores,
        color: "#c1d9ca",
      },
      {
        name: "Supervisores Requeridos",
        data: fechas.map(() => SUPERVISORES_REQUERIDOS),
        color: "#ff8e53",
        dashStyle: "longdash",
      },
      {
        name: "Total Seleccionados Requeridos",
        data: fechas.map(() => TOTAL_REQUERIDOS),
        color: "#65d7aa",
        dashStyle: "longdash",
      },
    ];

    const resumen = {
      postulantes_totales,
      total_correctores,
      total_supervisores,
      correctores_requeridos: CORRECTORES_REQUERIDOS,
      supervisores_requeridos: SUPERVISORES_REQUERIDOS,
      total_requeridos: TOTAL_REQUERIDOS,
    };

    return {
      categorias: fechas,
      series,
      resumen,
    };
  }, [data]);

  return {
    data: parsedData,
    isLoading,
    error,
  };
}
