// src/modules/EDD2025Module/elements/SDProcessingSection/hooks/useProcesamientoGeneralTab.js
import { useContext, useEffect, useState } from "react";
import axios from "../../../../../services/axiosInstance";
import { LoadingContext } from "../../../../../../../context/LoadingContext";

/**
 * Hook específico para el TabGeneralProcesamiento
 * Devuelve dataEvolucion: { series: [...] }
 * y series: [ { name, data }, ... ]
 */
export const useProcesamientoGeneralTab = () => {
  const [dataEvolucion, setDataEvolucion] = useState(null);
  const [series, setSeries] = useState(null);
  const { queueLoading, dequeueLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchAll = async () => {
      queueLoading();
      try {
        const [resEvolucion, resDiario] = await Promise.all([
          axios.post(import.meta.env.VITE_BASE_URL + "/back/public/api2025/2025-procesamiento-evolucion"),
          axios.post(import.meta.env.VITE_BASE_URL + "/back/public/api2025/2025-procesamiento-diario"),
        ]);

        const evolucion = resEvolucion.data;
        const diario = resDiario.data;

        // Procesar evolución
        const evolucionSeries = [
          {
            name: "En estado Recepción SD",
            data: (evolucion.recepcionadas || []).map(item => [
              Date.UTC(...item.fecha.split("-").map((v, i) => i === 1 ? +v - 1 : +v)),
              item.cantidad,
            ]),
          },
          {
            name: "En estado Respaldo en DD",
            data: (evolucion.respaldoDD || []).map(item => [
              Date.UTC(...item.fecha.split("-").map((v, i) => i === 1 ? +v - 1 : +v)),
              item.cantidad,
            ]),
          },
          {
            name: "En estado Respaldo en Nube",
            data: (evolucion.respaldoNube || []).map(item => [
              Date.UTC(...item.fecha.split("-").map((v, i) => i === 1 ? +v - 1 : +v)),
              item.cantidad,
            ]),
          },
          {
            name: "En estado Procesado SD",
            data: (evolucion.procesadas || []).map(item => [
              Date.UTC(...item.fecha.split("-").map((v, i) => i === 1 ? +v - 1 : +v)),
              item.cantidad,
            ]),
          },
          {
            name: "En estado Verificado",
            data: (evolucion.verificadas || []).map(item => [
              Date.UTC(...item.fecha.split("-").map((v, i) => i === 1 ? +v - 1 : +v)),
              item.cantidad,
            ]),
          },
        ];
        setDataEvolucion({ series: evolucionSeries });

        // Procesar diario
        const diarioSeries = [
          {
            name: "SD Recepcionadas",
            data: (diario.recepcionadas || []).map(item => [
              Date.UTC(...item.fecha.split("-").map((v, i) => i === 1 ? +v - 1 : +v)),
              item.cantidad,
            ]),
          },
          {
            name: "SD Respaldada en DD",
            data: (diario.respaldoDD || []).map(item => [
              Date.UTC(...item.fecha.split("-").map((v, i) => i === 1 ? +v - 1 : +v)),
              item.cantidad,
            ]),
          },
          {
            name: "SD Respaldada en Nube",
            data: (diario.respaldoNube || []).map(item => [
              Date.UTC(...item.fecha.split("-").map((v, i) => i === 1 ? +v - 1 : +v)),
              item.cantidad,
            ]),
          },
          {
            name: "SD Procesada",
            data: (diario.procesadas || []).map(item => [
              Date.UTC(...item.fecha.split("-").map((v, i) => i === 1 ? +v - 1 : +v)),
              item.cantidad,
            ]),
          },
          {
            name: "SD Verificada",
            data: (diario.verificadas || []).map(item => [
              Date.UTC(...item.fecha.split("-").map((v, i) => i === 1 ? +v - 1 : +v)),
              item.cantidad,
            ]),
          },
        ];
        setSeries(diarioSeries);

      } catch (error) {
        console.error("❌ Error en el hook del Tab General:", error);
      } finally {
        dequeueLoading();
      }
    };

    fetchAll();
  }, []);

  return { dataEvolucion, series };
};
