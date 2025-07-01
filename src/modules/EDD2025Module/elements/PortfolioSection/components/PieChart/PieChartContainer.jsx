import React from "react";
import GenericPieChart from "../../components/PieChart/GenericPieChart";

export function PieChartContainer({ subtitle, dataKey, mapper }) {
  if (!dataKey) return null;

  const mapped = mapper(dataKey);

  return (
    <div className="general-pie-chart-container">
      <GenericPieChart subtitle={subtitle} data={mapped} />
    </div>
  );
}
