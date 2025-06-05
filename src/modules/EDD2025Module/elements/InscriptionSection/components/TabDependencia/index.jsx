import "./index.css";
import { useTabDependencia } from "./hooks/useTabDependencia";
import { CustomBarChart } from "../../../../../../components/CustomBarChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";

export function TabDependencia() {
  const { docentesDependencia, sostenedoresDependencia } = useTabDependencia();
  return (
    <TabContent>
      <CustomBarChart
        subtitle={"ESTADO DE DOCENTES DISTRIBUIDOS <b>POR DEPENDENCIA</b>"}
        data={docentesDependencia}
      />
      <hr className="section-separator" />
      <CustomBarChart
        subtitle={"SOSTENEDORES DISTRIBUIDOS <b>POR DEPENDENCIA</b>"}
        data={sostenedoresDependencia}
      />
    </TabContent>
  );
}
//170 Líneas
