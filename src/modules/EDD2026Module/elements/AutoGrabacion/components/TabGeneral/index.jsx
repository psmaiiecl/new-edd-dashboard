import "./index.css";
import Select from "react-select";
import { useTabGeneral } from "./hooks/useTabGeneral";
import { CustomPieChart } from "../../../../../../components/CustomPieChart";
import { CustomDotLineChart } from "../../../../../../components/CustomDotLineChart";
import { TabContent } from "../../../../../../components/Layout/TabContent";
import { CustomBarChart } from "../../../../../../components/CustomBarChart";

export function TabGeneral() {
  const { selectedFilter, setSelectedFilter, charts } = useTabGeneral();

  return (
    <TabContent>
      {/* <div className="tab-general-filtro">
        <span>Dependencia: </span>
        <Select
          className="roboto-regular tab-general-filtro-container"
          value={selectedFilter}
          onChange={(option) => setSelectedFilter(option)}
          options={DEPENDENCY_LIST}
          isSearchable
          noOptionsMessage={() => "Ninguna dependencia"}
          placeholder="Seleccione una dependencia"
          styles={{
            control: (base) => ({
              ...base,
              fontSize: "13px",
              padding: "0px 10px ",
            }),
            option: (base) => ({
              ...base,
              fontSize: "13px",
              color: "black",
            }),
          }}
        />
      </div>
       */}

      <div className="normal-container">
        <div className="pie-grid-1">
          <CustomPieChart
            subtitle={"ESTADO DE CONVOCATORIA <b>POR ESTABLECIMIENTO</b>"}
            data={charts.convocatoria_establecimiento}
          />
        </div>

        <CustomBarChart
          subtitle={"EQUIVALENCIA EN DOCENTES <b>POR SERIE</b>"}
          data={charts.convocatoria_docente}
          height={450}
          table={false}
          overrideConfig={DOCENTES_OVERRIDE_CONFIG}
        />
        <CustomDotLineChart
          data={charts?.avance_convocatoria}
          title={"AVANCE DIARIO DEL PROCESO <b>DE CONVOCATORIA</b>"}
          overrideConfig={{
            yAxis: {
              min: 0,
              allowOverlap: true,
              title: {
                enabled: false,
              },
              labels: {
                format: "{value}",
                style: {
                  fontSize: "11px",
                },
              },
            },
          }}
        />
      </div>
    </TabContent>
  );
}

const DOCENTES_OVERRIDE_CONFIG = {
  yAxis: {
    min: 0,
    allowOverlap: true,
    title: {
      enabled: false,
    },
    labels: {
      format: "{value}",
      style: {
        fontSize: "11px",
      },
    },
  },
  plotOptions: {
    series: {
      stacking: null,
    },
    bar: {
      allowPointSelect: false,
      cursor: "pointer",
      dataLabels: {
        enabled: false,
        format: "<b>{point.y:.,.0f}</b>",
        color: "#000000",
        style: {
          fontSize: "13px",
          textOutline: "none",
          color: "#666666",
        },
      },
    },
  },
  tooltip: {
    pointFormat:
      '<span style="font-size:13px;"><span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b></span><br/>',
    shared: true,
  },
};
