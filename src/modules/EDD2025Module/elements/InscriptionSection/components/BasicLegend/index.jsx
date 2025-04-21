import "./index.css";
import { numberFormatter } from "../../../../../../utils/NumberFormatter";

export function BasicLegend({ data, total }) {
  return (
    <div className="pie-chart-legend">
      {data[0].data.map((item, index) => (
        <LegendItem item={item} total={total} key={index} />
      ))}
    </div>
  );
}

function LegendItem({ item, total }) {
  const percentage = ((item.y / total) * 100).toFixed(1) + "%";
  return (
    <div className="pie-chart-legend__item">
      <h5>{item.name}</h5>
      <div
        style={{
          alignItems: "center",
          backgroundColor: item.color,
          borderRadius: "5px",
          width: "60px",
          textAlign: "center",
          padding: "2px",
          fontWeight: "500",
        }}
      >
        <span>{numberFormatter(item.y)}</span>
      </div>
      <span>{percentage}</span>
    </div>
  );
}
