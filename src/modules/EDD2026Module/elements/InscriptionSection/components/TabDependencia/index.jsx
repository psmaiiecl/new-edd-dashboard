import "./index.css";
import { useTabDependencia } from "./hooks/useTabDependencia";
import { CustomBarChart } from "../../../../../../components/CustomBarChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";

export function TabDependencia() {
  const { charts } = useTabDependencia();
  return (
    <TabContent>
      <CustomBarChart
        subtitle={"ESTADO DE DOCENTES DISTRIBUIDOS <b>POR DEPENDENCIA</b>"}
        data={charts.docentes}
      />
    </TabContent>
  );
}
//170 Líneas
