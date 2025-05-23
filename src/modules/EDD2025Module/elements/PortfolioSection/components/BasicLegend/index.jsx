//import "./index.css";
import { numberFormatter } from "../../../../../../utils/NumberFormatter";

export function BasicLegend({ data = [], total, color = [] }) {
  return (
    <div className="pie-chart-legend">
      {data.map((item, index) => (
        <LegendItem item={item} total={total} key={index} />
      ))}
    </div>
  );
}

function LegendItem({ item, total }) {
  const percentage = ((item.y / total) * 100).toFixed(1);
  return (
    <div className="pie-chart-legend__item roboto-light">
      <span className="legend__item__title">{item.name}</span>
      <div
        style={{
          alignItems: "center",
          backgroundColor: item.color,
          borderRadius: "5px",
          width: "60px",
          textAlign: "center",
          padding: "2px",
          fontWeight: "500",
          margin: "5px 0",
        }}
      >
        <span>{numberFormatter(item.y)}</span>
      </div>
      <span>{isNaN(percentage) ? 0 : percentage}%</span>
    </div>
  );
}

// function LegendItem({ item, total }) {
//   const percentage = ((item.y / total) * 100).toFixed(1) + "%";

//   return (
//     <div className="pie-chart-legend__item">
//       <div className="pie-chart-legend__label">
//         <span style={{ backgroundColor: item.color }}></span>
//         <span className="pie-chart-legend__name">{item.name}</span>
//       </div>

//       <div
//         className="pie-chart-legend__value"
//         style={{ backgroundColor: item.color }}
//       >
//         {numberFormatter(item.y)}
//       </div>

//       <div className="pie-chart-legend__percentage">{percentage}</div>
//     </div>
//   );
// }
