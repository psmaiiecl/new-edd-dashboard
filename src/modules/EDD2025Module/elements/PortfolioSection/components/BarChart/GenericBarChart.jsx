import React, { useEffect, useState, useContext } from "react";
import axios from "../../../../../EDD2025Module/services/axiosInstance";
import BarChart from "./BarChart"; // ← Usa tu componente BarChart aquí
import { AuthContext } from "../../../../../../context/AuthContext";

const GenericBarChart = ({
  title,
  subtitle,
  serviceUrl,
  keyPath,
  dataMapper,
  colors = [],
  height = 600,
  showLegend = true,
}) => {
  const { getToken } = useContext(AuthContext);
  const [chartData, setChartData] = useState({});
  const [total, setTotal] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getToken();

        const filters = {
          convocatoria: "2025",
          estado: "activo",
          nivel: "básico",
          suspension: "no",
        };
        const body = new FormData();
        Object.entries(filters).forEach(([key, value]) =>
          body.append(key, value)
        );

        const response = await axios.post(serviceUrl, body, {
          headers: { t: token },
        });


        const data = response.data;

        const mapped = dataMapper(data, { keyPath }, total); // ← Aquí está el cambio
        setChartData(mapped);
      }
      catch (error) {
        console.error('Error fetching data from ${serviceUrl}', error);
      }
    };

    fetchData();
  }, []);

  return (
    <BarChart
      title={total}
      subtitle={subtitle}
      chartData={chartData}
      dataMapper={dataMapper}
      color={colors}
      showLegend={showLegend}
      height={height}
    />
  );
};

export default GenericBarChart;
