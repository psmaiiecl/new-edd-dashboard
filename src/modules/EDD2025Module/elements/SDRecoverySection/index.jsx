import "./index.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// eslint-disable-next-line no-unused-vars
import exporting from "highcharts/modules/exporting";
import { BasicLegend } from "../InscriptionSection/components/BasicLegend";
import { BASIC_PIE } from "../InscriptionSection/data/BASIC_PIE";
import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../hooks/useCustomFetch";
import { BASE_API_URL_2024 } from "../../data/BASE_API_URL";
import { buildSDRecoveryChart } from "./utils/utils";

export function SDRecoverySection2025() {
  const [estadoRecuperacionChart, setEstadoRecuperacionChart] = useState({
    ...BASIC_PIE,
    subtitle: {
      text: " Estado de Recuperación de Tarjetas SD respecto a Grabaciones Realizadas",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    series: [
      {
        name: "Estado de Recuperacion de Tarjetas SD",
        colorByPoint: true,
        data: [
          {
            name: "En DOCENTEMÁS",
            y: 0,
            sliced: true,
            selected: true,
            color: "rgb(101, 217, 171)",
          },
          {
            name: "En trayecto a DOCENTEMÁS",
            y: 0,
            color: "rgb(79, 169, 185)",
          },
          {
            name: "En poder del Sostenedor/a",
            y: 0,
            color: "rgb(97, 178, 209)",
          },
          {
            name: "En poder del Director/a",
            y: 0,
            color: "rgb(120, 197, 232)",
          },
          {
            name: "En poder del Docente",
            y: 0,
            color: "rgb(143, 184, 255)",
          },
          {
            name: "Agendado",
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
  const customFetch = useCustomFetch();

  useEffect(() => {
    customFetch(
      BASE_API_URL_2024 + "/datos-json?etiqueta=2024-procesamiento-general",
      { method: "POST" }
    ).then((data) =>
      setEstadoRecuperacionChart(
        buildSDRecoveryChart(estadoRecuperacionChart, data.recupera_sd)
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customFetch]);

  return (
    <section className="pagina-recuperacion roboto-regular">
      <article className="recuperacion-content">
        <div className="normal-container">
          <div className="pie-grid-1">
            <div className="general-pie-chart-container">
              <HighchartsReact
                options={estadoRecuperacionChart}
                highcharts={Highcharts}
              />
              <hr />
              <BasicLegend
                data={estadoRecuperacionChart.series}
                total={+estadoRecuperacionChart.title.number}
              />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
