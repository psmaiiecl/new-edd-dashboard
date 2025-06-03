import "./index.css";
import { useTabRegion } from "./hooks/useTabRegion";
import { CustomBarChart } from "../../../../../../components/CustomBarChart";

export function TabRegion() {
  const { docentesRegion, sostenedoresRegion } = useTabRegion();
  return (
    <div className="tab-dependencia">
      <CustomBarChart
        subtitle={"ESTADO DE DOCENTES DISTRIBUIDOS <b>POR REGION</b>"}
        data={docentesRegion}
      />
      <hr className="section-separator" />
      <CustomBarChart
        subtitle={"SOSTENEDORES DISTRIBUIDOS <b>POR REGION</b>"}
        data={sostenedoresRegion}
      />
    </div>
  );
}
