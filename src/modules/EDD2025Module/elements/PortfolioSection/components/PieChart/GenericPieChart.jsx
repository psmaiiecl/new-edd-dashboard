import { useEffect, useState, useContext } from "react";
import axios from "../../../../../EDD2025Module/services/axiosInstance";
import PieChart from "./PieChart";
import { AuthContext } from "../../../../../../context/AuthContext"; //para manejar el token
//import "./index.css";
const GenericPieChart = ({
  subtitle,
  serviceUrl,
  keyPath,
  dataMapper,
  rawData = null,
  colors = [],
  height = 400,
  showLegend = true,
  filtros = {},
}) => {
  const { getToken } = useContext(AuthContext);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        if (rawData) {
          setChartData(rawData);
          return;
        }

        const token = await getToken();
        if (!filtros || Object.keys(filtros).length === 0) return;

        const body = new FormData();
        Object.entries(filtros).forEach(([key, value]) => {
          body.append(key, value);
        });

        const response = await axios.post(serviceUrl, body, {
          headers: { t: token },
        });

        const nested = keyPath
          .split(".")
          .reduce((obj, key) => obj?.[key], response.data);
        const mapped = dataMapper(nested);
        setChartData(mapped);
      } catch (error) {
        console.error(`Error fetching data from ${serviceUrl}`, error);
      }
    }

    fetchData();
  }, [serviceUrl, keyPath, dataMapper, JSON.stringify(filtros), rawData]);

  return (
    <PieChart
      subtitle={subtitle}
      chartData={chartData}
      colors={colors}
      height={height}
      showLegend={showLegend}
    />
  );
};


export default GenericPieChart;
