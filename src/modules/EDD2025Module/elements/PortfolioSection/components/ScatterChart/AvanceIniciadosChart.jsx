//import { usePortafolioFetch } from "./../TabGeneralPortafolio/hooks/usePortafolioFetch";
import { CustomDotLineChart } from "../ScatterChart/CustomDotLineChart";
import { useEffect, useState } from "react";

const AvanceIniciadosChart = ({
  keyPath = "portafolio-avance-diario",
  dataMapper,
  title,
  rawData = null,
  filtros = {},
  valueFormat,
}) => {
  const [data, setData] = useState(null);
  useEffect(() => {

    if (rawData) {
      setData(dataMapper(rawData?.["portafolio-avance-diario"]));
    }
  }, [rawData]);

  return (
    <CustomDotLineChart
      title={title}
      fechas={data?.fechas}
      series={data?.series}
      valueFormat={valueFormat} 
    />
  );
};

export default AvanceIniciadosChart;
