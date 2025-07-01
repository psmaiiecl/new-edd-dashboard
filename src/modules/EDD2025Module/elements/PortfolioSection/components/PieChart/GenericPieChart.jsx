import { usePortafolioFetch } from "./../TabGeneralPortafolio/hooks/usePortafolioFetch";
import PieChart from "./PieChart";

const GenericPieChart = ({
  subtitle,
  keyPath,
  dataMapper,
  rawData = null,
  colors = [],
  height = 400,
  showLegend = true,
  filtros = {},
}) => {
  const { data: chartData } = usePortafolioFetch({
    keyPath,
    dataMapper,
    filtros,
    rawData,
  });

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
