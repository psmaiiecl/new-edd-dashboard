import { CustomDotLineChart } from "../../../../../../components/CustomDotLineChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import useTabPostulacion from "./hooks/useTabPostulacion";

function TabPostulacion() {
  const { data } = useTabPostulacion();

  return (
    <TabContent>
      <CustomDotLineChart
        data={data?.chart}
        title={"AVANCE DIARIO DE <b>POSTULACIONES</b>"}
        overrideConfig={{
          yAxis: {
            title: {
              enabled: false,
            },
            labels: {
              format: "{value}",
            },
          },
        }}
      />
      <table className="roboto-regular" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: "#ffc729", width: "50%" }}>
              Total Seleccionados Requeridos
            </th>
            <th style={{ backgroundColor: "#719af7", width: "50%" }}>
              Postulantes Totales
            </th>
          </tr>
        </thead>
        <tbody>
          <tr  style={{ padding: "10px 0", width: "100%" }}>
            <td >{data?.table.postulantes_requeridos}</td>
            <td >{data?.table.postulantes_totales}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
    </TabContent>
  );
}

export default TabPostulacion;
