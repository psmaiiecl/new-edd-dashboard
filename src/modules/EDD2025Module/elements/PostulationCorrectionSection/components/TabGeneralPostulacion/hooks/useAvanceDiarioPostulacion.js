import { useState, useEffect } from "react";
import axiosInstance from "../../../../../services/axiosInstance";

export function useAvanceDiarioPostulacion() {
  const [fechas, setFechas] = useState([]);
  const [series, setSeries] = useState([]);
  const [resumen, setResumen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const res = await axiosInstance.get("/back/public/api2024/2024-postulacion");
        const res = await axiosInstance.get("/back/public/api2025/2025-postulacion");
        const d = res.data?.postulacion?.avance_diario_postulaciones;
        
        if (!d) throw new Error("Datos no encontrados");

        const fechasArr = d.fechas || [];

        setFechas(fechasArr);
        const Requeridos= (d.correctores + d.supervisores);
        // Construir series para el gráfico
        const seriesData = [
          
          
          {
            name: "Total Postulantes",
            data: d.postulantes,
          },
          
          {
            name: "Total Requeridos",
            // data: Array(fechasArr.length).fill(d.total_correctores),
            data: Array(fechasArr.length).fill(d.postulantes_requeridos || 0),
            color:"#ffc729",
          },
        ];

        setSeries(seriesData);
        // console.log('tota de requeridos :' + Requeridos)
        // Calcular resumen
        setResumen({
          total_postulantes: d.postulantes_totales || 0,
          // total_requeridos: d.total_correctores,
          total_requeridos: d.postulantes_requeridos || 0,

  // seleccionados_requeridos: d.total_correctores || 0, // si tienes otro valor, cámbialo aquí
  // correctores_requeridos: d.correctores || 0,
  // seleccionados_requeridos: d.supervisores_requeridos,
  // postulantes_totales: d.postulantes_totales ,
 


        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { fechas, series, resumen, loading, error };
}
