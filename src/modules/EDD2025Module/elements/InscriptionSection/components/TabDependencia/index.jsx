import "./index.css";
import { useTabDependencia } from "./hooks/useTabDependencia";
import { CustomBarChart } from "../../../../../../components/CustomBarChart";

export function TabDependencia() {
  const { docentesDependencia, sostenedoresDependencia } = useTabDependencia();
  return (
    <div className="tab-dependencia">
      <CustomBarChart
        subtitle={"ESTADO DE DOCENTES DISTRIBUIDOS <b>POR DEPENDENCIA</b>"}
        data={docentesDependencia}
      />
      <hr className="section-separator" />
      <CustomBarChart
        subtitle={"SOSTENEDORES DISTRIBUIDOS <b>POR DEPENDENCIA</b>"}
        data={sostenedoresDependencia}
      />
    </div>
  );
}
//170 Líneas
