import { CustomPieChart } from "../../../../../../components/CustomPieChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import { DEPENDENCY_LIST, REGION_LIST } from "../../data/selectorLists";
import Select from "react-select";
import { useTab } from "./hooks/useTab";
import { DaysLeftCounter } from "../../../../../../components/DaysLeftCounter";
import { CustomDotLineChart } from "../../../../../../components/CustomDotLineChart";
import { numberFormatter } from "../../../../../../utils/NumberFormatter";
import { CustomColumnChart } from "../../../../../../components/CustomColumnChart";
import { SELECT_STYLES } from "../../../../../../constants/CONST";

export function TabGeneral() {
  const { data, handleFilter, filters } = useTab();

  return (
    <TabContent>
      <div className="tab-general-filter-row">
        <div className="tab-general-filter">
          <span>Dependencia: </span>
          <Select
            className="roboto-regular"
            value={filters.dependencia}
            onChange={(option) => handleFilter("dependencia", option)}
            options={DEPENDENCY_LIST}
            isSearchable
            noOptionsMessage={() => "Ninguna dependencia"}
            placeholder="Seleccione una dependencia"
            styles={SELECT_STYLES}
          />
        </div>
        <div className="tab-general-filter">
          <span>Región: </span>
          <Select
            className="roboto-regular"
            value={filters.region}
            onChange={(option) => handleFilter("region", option)}
            options={REGION_LIST}
            isSearchable
            noOptionsMessage={() => "Ninguna region"}
            placeholder="Seleccione una region"
            styles={SELECT_STYLES}
          />
        </div>
      </div>
      <DaysLeftCounter dueDate={"2025-11-10"} />
      <div className="normal-container">
        <div className="pie-grid-3">
          <CustomPieChart
            subtitle={"DOCENTES <b>VALIDADOS</b>"}
            data={data?.validados}
          />
          <CustomPieChart
            subtitle={"AVANCE <b>PORTAFOLIO</b>"}
            data={data?.avance_portafolio}
          />
          <CustomPieChart
            subtitle={"AVANCE <b>MÓDULO 1</b>"}
            data={data?.avance_m1}
          />
        </div>
        <div className="pie-grid-2">
          <CustomPieChart
            subtitle={"AVANCE <b>MÓDULO 2 FICHA</b>"}
            data={data?.avance_m2_ficha}
          />
          <CustomPieChart
            subtitle={"AVANCE <b>MÓDULO 2 CLASE GRABADA</b>"}
            data={data?.avance_m2_clase}
          />
        </div>
        <div className="pie-grid-3">
          <CustomPieChart
            subtitle={"AVANCE <b>MÓDULO 3</b>"}
            data={data?.avance_m3}
          />
          <CustomPieChart
            subtitle={"AVANCE <b> REPORTE M3 DIRECTORES"}
            data={data?.avance_m3_directores}
          />
          <CustomPieChart
            subtitle={"AVANCE <b>ENCUESTA</b>"}
            data={data?.avance_encuesta}
          />
        </div>
        <div className="pie-grid-2">
          <CustomPieChart
            subtitle={"DESCARGA <b>PORTAFOLIO</b>"}
            data={data?.descarga_portafolio}
          />
          <CustomPieChart
            subtitle={"DESCARGA <b>REPORTE DIRECTORES</b>"}
            data={data?.descarga_reporte_director}
          />
        </div>
        <div className="pie-grid-2">
          <CustomPieChart
            subtitle={"VISUALIZACIÓN <b>CLASE GRABADA</b>"}
            data={data?.visualizacion_clase}
          />
          <CustomPieChart
            subtitle={"DESCARGA <b>CLASE GRABADA</b>"}
            data={data?.descarga_clase}
          />
        </div>
      </div>
      <hr />
      <CustomDotLineChart
        data={data?.avance_diario}
        title={"AVANCE DIARIO <b>PORTAFOLIO</b>"}
        overrideConfig={axisOverrideConfig}
      />
      <CustomDotLineChart
        data={data?.avance_iniciados}
        title={"AVANCE DIARIO <b>PORTAFOLIO INICIADO</b>"}
      />
      <hr />
      <CustomColumnChart
        data={data?.avance_semanal}
        title={"AVANCE SEMANAL <b>PORTAFOLIO</b>"}
        type={"STACK"}
      />
    </TabContent>
  );
}

const axisOverrideConfig = {
  yAxis: {
    title: {
      enabled: false,
    },
    labels: {
      formatter: function () {
        return numberFormatter(this.value);
      },
    },
  },
};
