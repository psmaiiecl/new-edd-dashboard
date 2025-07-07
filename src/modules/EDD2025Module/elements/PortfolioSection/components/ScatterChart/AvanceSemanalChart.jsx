import { usePortafolioFetch } from "./../TabGeneralPortafolio/hooks/usePortafolioFetch";
import { CustomBarChart } from "../ScatterChart/CustomBarChart";

const AvanceDiarioChart = ({
  keyPath = "portafolio-avance-semanal",
  dataMapper,
  title,
  rawData = null,
}) => {
  const { data } = usePortafolioFetch({
    keyPath,
    title,
    dataMapper,
    rawData,
  });
  return (
    <CustomBarChart
      title={title}
      categories={data?.fechas}
      series={data?.series}
    />
  );
};

export default AvanceDiarioChart;