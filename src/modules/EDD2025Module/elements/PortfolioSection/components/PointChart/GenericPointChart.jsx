import React, { useEffect, useState, useContext } from "react";
import axios from "../../../../../EDD2025Module/services/axiosInstance";
import { AuthContext } from "../../../../../../context/AuthContext"; // para manejar el token
import PointChart from "./PointChart";

const GenericPointChart = ({
  title,
  serviceUrl,
  keyPath,
  dataMapper,
  color = { data: "#007bff" },
  showLegend = true,
  filtros = {}
}) => {
  const { getToken } = useContext(AuthContext);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getToken();

        
        const body = new FormData();
        if (!filtros || Object.keys(filtros).length === 0) return;
        Object.entries(filtros).forEach(([key, value]) => {
          body.append(key, value);
        });

        const response = await axios.post(serviceUrl, body, {
          headers: { t: token },
        });

        const data = response.data;
        const nested = keyPath
          ? keyPath.split(".").reduce((obj, key) => obj?.[key], data)
          : data;

        // 🔧 Aquí se usa el dataMapper que viene por props
        const mapped = dataMapper(nested);

        setChartData({ series: mapped });
      } catch (error) {
        console.error(`Error fetching data from ${serviceUrl}`, error);
      }
    }

    fetchData();
  }, [serviceUrl, keyPath, dataMapper]);


  return (
    <PointChart
      title={title}
      chartData={chartData}
      dataMapper={setChartData}
      color={color}
      showLegend={showLegend}
    />
  );
};

export default GenericPointChart;
