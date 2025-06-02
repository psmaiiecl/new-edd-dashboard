import { invertObjectKeys } from "../../../../../utils/InvertObjectKeys";
import { numberFormatter } from "../../../../../utils/NumberFormatter";

export function mapDocentesDependencia({ data, schema, invert = false }) {
  if (invert) data = invertObjectKeys(data);
  const dependencias = Object.keys(data || {}).sort();

  //TODO: Podríamos añadir un mapeo a las dependencias luego

  const tableData = { head: [], subtotals: [], percentages: [], data: [] };
  // Series para Highcharts
  const series = schema.map(({ name, key, color, table }) => {
    const serieData = dependencias.map((dep, subIndex) => {
      const item = data[dep]?.[key] || 0;
      //Vamos a tratar la data para cada celda de inmediato
      if (!tableData.data[subIndex]) tableData.data[subIndex] = [dep];
      tableData.data[subIndex].push(numberFormatter(item));
      return parseInt(item);
    });
    const subtotal = serieData.reduce((total, num) => total + parseInt(num), 0);
    //Aprovechamos de extraer el numero del subtotal para la tabla
    tableData.head.push(table);
    tableData.subtotals.push({ number: numberFormatter(subtotal), color });
    //tableData.data.push(tableRow);
    return {
      name: name,
      data: serieData,
      color,
    };
  });
  //Sumatoria del total global
  const total = series.reduce((acc, serie) => {
    return acc + serie.data.reduce((a, b) => a + b, 0);
  }, 0);
  //Insertando los porcentajes
  tableData.percentages = tableData.subtotals.map(
    (data) => (isNaN(data / total) ? 0 : (data / total) * 100).toFixed(1) + "%"
  );

  return {
    series,
    total: {
      numeric: total,
      text: numberFormatter(total),
    },
    tableData,
    override: {
      xAxis: {
        categories: dependencias,
        labels: {
          style: {
            fontSize: "11px",
          },
        },
      },
    },
  };
}
