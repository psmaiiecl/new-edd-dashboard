import React, { useEffect, useState, useContext } from "react";
import axios from "../../../../../EDD2025Module/services/axiosInstance";
import BarChart from "./BarChart";
import { AuthContext } from "../../../../../../context/AuthContext";

const GenericBarChart = ({
  title,
  subtitle,
  serviceUrl,
  keyPath,
  dataMapper,
  filters = {}, // ✅ Filtros dinámicos desde props
  colors = [],
  height = 400,
  showLegend = true,
}) => {
  const { getToken } = useContext(AuthContext);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    console.log("efecto barras");

    async function fetchData() {
      try {
        const token = await getToken();
        const body = new FormData();

        // ✅ Agrega dinámicamente todos los filtros que llegan por props
        Object.entries(filters).forEach(([key, obj]) => {
          if (obj?.value !== undefined) {
            body.append(key, obj.value);
          }
        });

        const response = await axios.post(serviceUrl, body, {
          headers: { t: token },
        });

        const data = response.data;
        const nested = keyPath
          .split(".")
          .reduce((obj, key) => obj?.[key], data);
        const mapped = dataMapper(nested);

        setChartData(mapped);
      } catch (error) {
        console.error(`Error fetching data from ${serviceUrl}`, error);
      }
    }

    fetchData();
    //}, [serviceUrl, keyPath, dataMapper, filters, getToken]); ---> los filtros estan funcionando incorrectamente
  }, []);

  return (
    <BarChart
      title={title}
      subtitle={subtitle}
      chartData={chartData}
      color={{ data: colors }}
      showLegend={showLegend}
    />
  );
};

export default GenericBarChart;
