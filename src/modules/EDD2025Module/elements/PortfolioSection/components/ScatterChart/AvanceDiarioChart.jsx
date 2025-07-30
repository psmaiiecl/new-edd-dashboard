import { CustomDotLineChart } from "../ScatterChart/CustomDotLineChart";
import { useEffect, useState } from "react";

const AvanceDiarioChart = ({
  dataMapper,
  title,
  rawData = null,
  valueFormat = "integer",
}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (rawData) {
      setData(dataMapper(rawData?.["portafolio-avance-diario"]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawData]);

  // const { data: zzz } = usePortafolioFetch({
  //   keyPath,
  //   title,
  //   dataMapper,
  //   filtros,
  //   rawData,
  // });
  return (
    <CustomDotLineChart
      valueFormat={valueFormat}
      title={title}
      fechas={data?.fechas}
      series={data?.series}
    />
  );
};

export default AvanceDiarioChart;
