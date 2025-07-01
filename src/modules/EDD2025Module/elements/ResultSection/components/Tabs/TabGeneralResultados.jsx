import "./index.css";
import { useTabGeneralResultados } from "./hooks/useTabGeneralResultados";
import { CustomPieChart } from "../../../../../../components/CustomPieChart";
import { CustomDotLineChart } from "../../../../../../components/CustomDotLineChart";
import {RatiosPanel} from "../RatiosPanel/RatiosPanel"
export function TabGeneralResultados() {
  const {

    informesIndividuales,
    informesEstablecimiento,
    informesSostenedor,
    AvanceDiarioDescargaIndividual,
    AvanceDiarioDescargaDirector,
    AvanceDiarioDescargaSostenedor,
    AvanceDiarioDescargaNacional

  } = useTabGeneralResultados();

  return (
    <div className="tab-general">
      <>
      <RatiosPanel />
      </>        
      <div className="normal-container">
        <div className="pie-grid-3">
          <CustomPieChart
            subtitle={"INFORMES <b>INDIVIDUALES</b>"}
            data={informesIndividuales}
          />
          <CustomPieChart
            subtitle={"INFORMES POR <b>ESTABLECIMIENTO</b>"}
            data={informesEstablecimiento}
          />
          <CustomPieChart
            subtitle={"INFORMES POR <b>SOSTENEDOR</b>"}
            data={informesSostenedor}
          />
        </div>
      </div>
      <CustomDotLineChart
        title={"DESCARGA DIARIA DE <b>INFORMES INDIVIDUALES</b>"}
        data={AvanceDiarioDescargaIndividual}
      />
      <CustomDotLineChart
        title={"EVOLUCIÓN DIARIA DE ACCESOS Y DESCARGAS DE <b>INFORMES POR ESTABLECIMIENTO</b>"}
        data={AvanceDiarioDescargaDirector}
      />
      <CustomDotLineChart
        title={"EVOLUCIÓN DIARIA DE ACCESOS Y DESCARGAS DE<b> INFORMES POR SOSTENEDOR</b>"}
        data={AvanceDiarioDescargaSostenedor}
      />
       <CustomDotLineChart
        title={"EVOLUCIÓN DIARIA DE DESCARGAS DE<b> INFORME NACIONAL</b>"}
        data={AvanceDiarioDescargaNacional}
      />
    </div>
  );
}
