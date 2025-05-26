import React, { useEffect, useState, useContext } from "react";
import axios from "../../../../../EDD2025Module/services/axiosInstance";
import BarChart from "./BarChart"; // ← Usa tu componente BarChart aquí
import { AuthContext } from "../../../../../../context/AuthContext";
const GenericBarChart = ({
  title,
  subtitle,
  chartData,
  serviceUrl,
  keyPath,
  dataMapper,

  //(modificado por Roberto) se agregó está variable (modificado por Roberto)
  rawData = null,

  colors = [],
  height = 400,
  showLegend = true,
  filtros = {},
}) => {
  const { getToken } = useContext(AuthContext);

  const [internalData, setInternalData] = useState({});
  const [total, setTotal] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        if (rawData) {
          setInternalData(rawData);
          return;
        }
        const token = await getToken();

        const body = new FormData();
        const response = await axios.post(serviceUrl, {
          headers: { t: token },
        });


        const data = response.data;
        setTotal(tot);
        const mapped = dataMapper(data, { keyPath }, total); // ← Aquí está el cambio
        setChartData(mapped);
      }
      catch (error) {
        console.error('Error fetching data from ${serviceUrl}', error);
      }
    }

    fetchData();

  }, [serviceUrl, dataMapper, JSON.stringify(filtros)]);

  const resolvedChartData = chartData || internalData;
  return (
    <BarChart
      title={title || total}
      subtitle={subtitle}
      chartData={resolvedChartData}
      dataMapper={dataMapper}
      color={colors}
      showLegend={showLegend}
      height={height}
    />
  );

};

export default GenericBarChart;
