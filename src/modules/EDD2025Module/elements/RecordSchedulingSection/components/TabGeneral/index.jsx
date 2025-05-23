import "./index.css";
import { CustomPieChart } from "../../../../../../components/CustomPieChart";
import { PIE_CONFIG } from "../../../../../../constants/CHART_CONFIGS";
import { useState } from "react";

export function TabGeneral() {
  const [docentesChart, setDocentesChart] = useState({
    ...PIE_CONFIG,
    subtitle: {
      text: "Docentes a <b>Agendar Grabación</b>",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Cantidad de Docentes",
        colorByPoint: true,
        data: [
          {
            name: "Docentes Agendados",
            y: 0,
            sliced: true,
            selected: true,
            color: "rgb(143, 184, 255)",
          },
          {
            name: "Docentes con Contacto Inicial",
            y: 0,
            color: "rgb(255, 209, 83)",
          },
          {
            name: "Docentes sin Contacto",
            y: 0,
            color: "rgb(255, 88, 128)",
          },
        ],
      },
    ],
  });
  const [establecimientosChart, setEstablecimientosChart] = useState({
    ...PIE_CONFIG,
    subtitle: {
      text: "Establecimientos a <b>Agendar Grabación</b>",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Cantidad de Establecimientos",
        colorByPoint: true,
        data: [
          {
            name: "Establecimientos con Docentes Agendados",
            y: 0,
            color: "rgb(144, 184, 254)",
          },
          {
            name: "Establecimientos con Contacto Inicial",
            y: 0,
            color: "rgb(253, 208, 80)",
          },
          {
            name: "Establecimientos sin Contacto",
            y: 0,
            color: "rgb(255, 88, 128)",
          },
        ],
      },
    ],
  });
  return (
    <div className="tab-general">
      <div className="normal-container">
        <div className="pie-grid-2">
          <CustomPieChart setup={docentesChart} />
          <CustomPieChart setup={establecimientosChart} />
        </div>
      </div>
    </div>
  );
}
