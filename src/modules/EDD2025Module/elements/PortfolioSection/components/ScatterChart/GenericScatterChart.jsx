import React, { useEffect, useState, useContext } from "react";
import axios from "../../../../../EDD2025Module/services/axiosInstance";
import { AuthContext } from "../../../../../../context/AuthContext"; // para manejar el token
import ScatterChart from "./ScatterChart";

const GenericScatterChart = ({
  title,
  serviceUrl,
  keyPath,
  dataMapper,
  color = { data: "#007bff" },
  showLegend = true,
}) => {
  const { getToken } = useContext(AuthContext);
  const [chartData, setChartData] = useState({});
 
useEffect(() => {
  async function fetchData() {
    try {
      const token = await getToken();

      const body = new FormData();
      body.append("convocatoria", "2025");
      body.append("estado", "activo");
      body.append("nivel", "básico");
      body.append("suspension", "no");

      const response = await axios.post(serviceUrl, body, {
        headers: { t: token },
      });

      const data = response.data;
      const nested = keyPath ? keyPath.split(".").reduce((obj, key) => obj?.[key], data) : data;

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
    <ScatterChart
      title={title}
      chartData={chartData}
      dataMapper={setChartData}
      color={color}
      showLegend={showLegend}
    />
  );
};

export default GenericScatterChart;
