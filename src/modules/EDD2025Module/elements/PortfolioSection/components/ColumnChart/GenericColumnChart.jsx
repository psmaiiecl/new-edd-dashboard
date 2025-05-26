import { useEffect, useState, useContext } from "react";
import axios from "../../../../../EDD2025Module/services/axiosInstance";
import ColumnChart from "./ColumnChart";
import { AuthContext } from "../../../../../../context/AuthContext";

const GenericColumnChart = ({
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

  //(modificado por Roberto) se comentó esta línea porque no se está usando, sino que se usa el rawData de la línea 15
  //const shouldFetch = !chartData && serviceUrl && dataMapper;

  useEffect(() => {

    //(modificado por Roberto) se comentó esta línea porque no se está usando, sino que se usa el rawData de la línea 15  
    //if (!shouldFetch) return;

    async function fetchData() {
      try {

        //(modificado por Roberto) se agregó esta conción para dejarlo como el GerencPueChart.jsx
        if (rawData) {
          setInternalData(rawData);
          return;
        }

        const token = await getToken();

        const body = new FormData();
        Object.entries(filtros).forEach(([key, value]) => {
          body.append(key, value);
        });

        const response = await axios.post(serviceUrl, body, {
          headers: { t: token },
        });

        const data = response.data;
        const totalFromService = data.total || {};
        setTotal(totalFromService);

        const mapped = dataMapper(data, { keyPath }, totalFromService);
        setInternalData(mapped);
      } catch (error) {
        console.error(`Error fetching data from ${serviceUrl}`, error);
      }
    }

    fetchData();

    //(modificado por Roberto) se comentó esta línea porque no se está usando, sino que se usa el rawData de la línea 15
    //}, [shouldFetch, serviceUrl, dataMapper, JSON.stringify(filtros)]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceUrl, dataMapper, JSON.stringify(filtros)]);

  const resolvedChartData = chartData || internalData;

  return (
    <ColumnChart
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

export default GenericColumnChart;
