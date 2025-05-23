import "./index.css";
import { useState } from "react";
import { PIE_CONFIG } from "../../../../constants/CHART_CONFIGS";
import { CustomPieChart } from "../../../../components/CustomPieChart";

export function RecordSection2025() {
  const [docentesRindeChart, setDocentesRindeChart] = useState({
    ...PIE_CONFIG,
    subtitle: {
      text: "Docentes en estado RINDE",
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
            name: "Grabados",
            y: 0,
            sliced: true,
            selected: true,
            color: "rgb(143, 184, 255)",
          },
          {
            name: "No Grabados",
            y: 0,
            color: "rgb(101, 217, 171)",
          },
          {
            name: "Pospuestos",
            y: 0,
            color: "rgb(255, 209, 83)",
          },
          {
            name: "Agendados",
            y: 0,
            color: "rgb(255, 142, 83)",
          },
          {
            name: "Sin Agendar",
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
      text: "Establecimientos a Grabar",
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
            name: "Agendamiento Terminado - Grabaciones Terminadas",
            y: 0,
            color: "rgb(101, 215, 170)",
          },
          {
            name: "Agendamiento Terminado - Grabaciones Iniciadas",
            y: 0,
            color: "rgb(196, 218, 253)",
          },
          {
            name: "Agendamiento Terminado - Sin Grabaciones",
            y: 0,
            color: "rgb(144, 184, 254)",
          },
          {
            name: "Agendamiento Iniciado - Grabaciones Iniciadas",
            y: 0,
            color: "rgb(253, 208, 80)",
          },
          {
            name: "Agendamiento Iniciado - Sin Grabaciones",
            y: 0,
            color: "rgb(253, 171, 129)",
          },
          {
            name: "Sin Agendamiento - Sin Grabaciones",
            y: 0,
            color: "rgb(255, 88, 128)",
          },
        ],
      },
    ],
  });
  const [sostenedoresChart, setSostenedoresChart] = useState({
    ...PIE_CONFIG,
    subtitle: {
      text: "Sostenedores Participantes",
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
            name: ">= 75% Grabaciones",
            y: 0,
            sliced: true,
            selected: true,
            color: "rgb(143, 184, 255)",
          },
          {
            name: "< 75% Grabaciones	",
            y: 0,
            color: "rgb(101, 217, 171)",
          },
          {
            name: "< 50% Grabaciones",
            y: 0,
            color: "rgb(255, 209, 83)",
          },
          {
            name: "< 25% Grabaciones",
            y: 0,
            color: "rgb(255, 142, 83)",
          },
          {
            name: "Sin Grabaciones",
            y: 0,
            color: "rgb(255, 88, 128)",
          },
        ],
      },
    ],
  });
  return (
    <section className="pagina-grabaciones roboto-regular">
      <article className="grabaciones-content">
        <div className="normal-container">
          <div className="pie-grid-1">
            <CustomPieChart setup={docentesRindeChart} />
          </div>
          <div className="pie-grid-1">
            <CustomPieChart setup={establecimientosChart} />
          </div>
          <div className="pie-grid-1">
            <CustomPieChart setup={sostenedoresChart} />
          </div>
        </div>
      </article>
    </section>
  );
}
