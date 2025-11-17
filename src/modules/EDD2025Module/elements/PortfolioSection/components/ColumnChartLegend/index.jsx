import { numberFormatter } from "../../../../../../utils/NumberFormatter";

export const ColumnChartLegend = ({mappedData}) => {
    if (!mappedData?.series || mappedData?.series?.length === 0) return null;

    const categorias = mappedData.categories || [];

    return (
      <div style={{ width: "60%", margin: "0 auto" }}>
        <table className="legend-table">
          <thead className="legend-table__head">
            <tr>
              <th>{mappedData?.tableName || ""}</th>
              {mappedData.series.map((serie, i) => (
                <th
                  key={i}
                  style={{
                    alignItems: "center",
                    backgroundColor: serie.color,
                    borderRadius: "5px",
                    width: "60px",
                    textAlign: "center",
                    padding: "2px",
                    fontWeight: "500",
                    placeSelf: "center",
                    margin: "0 auto",
                  }}
                >
                  {serie.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="legend-table__body">
            {categorias.map((cat, i) => (
              <tr key={i}>
                <td>{cat}</td>
                {mappedData.series.map((serie, j) => (
                  <td key={j}>{numberFormatter(serie.data[i]?.valor ?? 0)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };