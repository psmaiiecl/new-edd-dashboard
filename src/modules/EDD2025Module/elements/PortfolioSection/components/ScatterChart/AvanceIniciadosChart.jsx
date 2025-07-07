//import { usePortafolioFetch } from "./../TabGeneralPortafolio/hooks/usePortafolioFetch";
import { CustomDotLineChart } from "../ScatterChart/CustomDotLineChart";
import { useEffect, useState } from "react";

const AvanceIniciadosChart = ({
  keyPath = "portafolio-avance-diario",
  dataMapper,
  title,
  rawData = null,
  filtros = {},
}) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (rawData) {
      setData(dataMapper(rawData?.["portafolio-avance-diario"]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawData]);
  // const { data } = usePortafolioFetch({
  //   keyPath,
  //   title,
  //   dataMapper,
  //   filtros,
  //   rawData,
  // });
  return (
    <CustomDotLineChart
      title={title}
      fechas={data?.fechas}
      series={data?.series}
    />
  );
};

export default AvanceIniciadosChart;
