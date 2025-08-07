// src/pages/.../hooks/useProcesamientoDiarioCompleto.js
import { useState, useEffect } from "react";
import axios from "../../../../../services/axiosInstance";

export const useProcesamientoDiarioCompleto = () => {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcesamiento = async () => {
      try {
        const response = await axios.post("/back/public/api2025/2025-procesamiento-diario");
        const rawData = response.data;

        const fechasSet = new Set();
        let min = Infinity;
        let max = -Infinity;

        rawData.forEach((serie) => {
          serie.data.forEach(([timestamp]) => {
            fechasSet.add(new Date(timestamp).toLocaleDateString('es-CL'));
            if (timestamp < min) min = timestamp;
            if (timestamp > max) max = timestamp;
          });
        });

        setSeries(rawData);
        setCategories(Array.from(fechasSet));
        setMinDate(min);
        setMaxDate(max);
      } catch (err) {
        setError(new Error("Error al obtener procesamiento diario"));
      } finally {
        setLoading(false);
      }
    };

    fetchProcesamiento();
  }, []);

  return { series, categories, minDate, maxDate, loading, error };
};
