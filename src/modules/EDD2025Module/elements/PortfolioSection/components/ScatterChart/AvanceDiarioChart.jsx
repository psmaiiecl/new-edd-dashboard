import { usePortafolioFetch } from "./../TabGeneralPortafolio/hooks/usePortafolioFetch";
import { CustomDotLineChart } from "../ScatterChart/CustomDotLineChart";

const AvanceDiarioChart = ({
  keyPath = "portafolio-avance-diario",
  dataMapper,
  title,
  rawData = null,
  filtros = {},
}) => {
  const { data } = usePortafolioFetch({
    keyPath,
    title,
    dataMapper,
    filtros,
    rawData,
  });
  return (
    <CustomDotLineChart
      title={title}
      fechas={data?.fechas}
      series={data?.series}
    />
  );
};

export default AvanceDiarioChart;
