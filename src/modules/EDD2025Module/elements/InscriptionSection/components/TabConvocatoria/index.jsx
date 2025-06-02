import "./index.css";
import { useTabConvocatoria } from "./hooks/useTabConvocatoria";
import { CustomBarChart } from "../../../../../../components/CustomBarChart";

export function TabConvocatoria() {
  const { docentes } = useTabConvocatoria();
  return (
    <div className="tab-dependencia">
      <CustomBarChart
        subtitle={"ESTADO DE DOCENTES DISTRIBUIDOS <b>POR CONVOCATORIA</b>"}
        data={docentes}
        height={450}
      />
    </div>
  );
}
