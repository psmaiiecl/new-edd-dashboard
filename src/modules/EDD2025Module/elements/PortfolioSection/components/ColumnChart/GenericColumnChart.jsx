import React, { useEffect, useState, useContext } from "react";
import axios from "../../../../../EDD2025Module/services/axiosInstance";
import ColumnChart from "./ColumnChart";
import { AuthContext } from "../../../../../../context/AuthContext";


const GenericColumnChart = ({
  title,
  subtitle,
  serviceUrl,
  keyPath,
  dataMapper,
  colors = [],
  height = 400,
  showLegend = true,
}) => {
  const { getToken } = useContext(AuthContext);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getToken();

        const filters = {
          convocatoria: { value: "2025" },
          estado: { value: "activo" },
          nivel: { value: "básico" },
          suspension: { value: "no" },
        };

        const body = new FormData();
        body.append("convocatoria", filters.convocatoria.value);
        body.append("estado", filters.estado.value);
        body.append("nivel", filters.nivel.value);
        body.append("suspension", filters.suspension.value);

        const URL = `${import.meta.env.VITE_BASE_URL}${serviceUrl}`;
        const response = await axios.post(URL, body, {
          headers: { t: token },
        });

        const data = response.data;
        const nested = keyPath.split(".").reduce((obj, key) => obj?.[key], data);
        const mapped = dataMapper(nested);

        setChartData(mapped);
      } catch (error) {
        console.error(`Error fetching data from ${serviceUrl}`, error);
      }
    }

    fetchData();
  }, [serviceUrl, keyPath, dataMapper, getToken]);

  return (
    <ColumnChart
      subtitle={subtitle}
      chartData={chartData}
      dataMapper={dataMapper}
      color={colors}
      showLegend={showLegend}
    />
  );
};

export default GenericColumnChart;
