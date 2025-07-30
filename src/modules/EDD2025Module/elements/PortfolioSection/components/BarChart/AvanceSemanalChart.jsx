import { usePortafolioFetch } from "./../TabGeneralPortafolio/hooks/usePortafolioFetch";
import { Barrasemanal } from "./BarrasSemanal";

const AvanceSemanalChart = ({
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
    <Barrasemanal title={title} fechas={data?.fechas} series={data?.series} />
  );
};

export default AvanceSemanalChart;
