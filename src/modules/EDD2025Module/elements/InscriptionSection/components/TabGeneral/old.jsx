import "./index.css";
import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// eslint-disable-next-line no-unused-vars
import exporting from "highcharts/modules/exporting";

import {
  buildAvanceDiario,
  buildDocentesEnNomina,
  buildSostenedoresParticipantes,
} from "../../utils/generalTabUtils";
import { LeyendaBasica } from "../LeyendaBasica";
import { getInscriptionData } from "../../../../services/InscriptionServices";

const TabGeneral = () => {
  const [nominaChart, setNominaChart] = useState({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      marginTop: 120,
      marginBottom: 80,
      height: 510,
    },
    legend: {
      enabled: true,
      verticalAlign: "top",
      x: 0,
      y: 380,
      itemMarginBottom: 20,
      itemStyle: {
        fontSize: "13px",
      },
    },
    title: {
      text: "Total",
      align: "center",
      style: {
        fontWeight: "bold",
        color: "#5157FF",
        fontSize: "35px",
      },
    },
    subtitle: {
      text: " DOCENTES <b>EN NOMINA</b>",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    tooltip: {
      pointFormat: "<b>{point.y}</b> ({point.percentage:.0f}%)<br/>",
      style: {
        fontSize: "13px",
        color: "#666666",
      },
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format:
            "<b>{point.name}</b>: <b>{point.y:.,.0f} </b> ({point.percentage:.0f}%)<br/>",
          style: {
            fontSize: "13px",
            color: "#666666",
          },
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Docentes en nómina",
        colorByPoint: true,
        data: [
          {
            name: "Inscritos",
            y: 0,
            sliced: true,
            selected: true,
            color: "#65D9AB",
          },
          {
            name: "En revisión",
            y: 0,
            color: "#FF8E53",
          },
          {
            name: "Desinscritos",
            y: 0,
            color: "#C1D9CA",
          },
          {
            name: "Pendientes",
            y: 0,
            color: "#FFD153",
          },
          {
            name: "Cancelados",
            y: 0,
            color: "#FF5880",
          },
        ],
      },
    ],
  });
  const [sostenedorChart, setSostenedorChart] = useState({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      marginTop: 120,
      marginBottom: 80,
      height: 510,
    },
    legend: {
      enabled: true,
      verticalAlign: "top",
      x: 0,
      y: 380,
      itemMarginBottom: 20,
      itemStyle: {
        fontSize: "13px",
      },
      layout: "horizontal",
      itemDistance: 10,
      alignColumns: false,
      width: "100%",
      itemMarginTop: 2,
    },
    title: {
      text: "Total",
      align: "center",
      style: {
        fontWeight: "bold",
        color: "#5157FF",
        fontSize: "35px",
      },
    },
    subtitle: {
      text: " SOSTENEDORES <b>PARTICIPANTES</b>",
      align: "center",
      style: {
        fontSize: "15px",
      },
    },
    tooltip: {
      pointFormat: "<b>{point.y}</b> ({point.percentage:.0f}%)<br/>",
      style: {
        fontSize: "13px",
        color: "#666666",
      },
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format:
            "<b>{point.name}</b>: <b>{point.y:.,.0f} </b> ({point.percentage:.0f}%)<br/>",
          style: {
            fontSize: "13px",
            color: "#666666",
          },
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Sostenedores",
        colorByPoint: true,
        data: [
          {
            name: "Sin ingreso",
            y: 0,
            sliced: true,
            selected: true,
            color: "#FF5880",
          },
          {
            name: "Con ingreso sin docentes inscritos",
            y: 0,
            color: "#FF8E53",
          },
          {
            name: "Inscripción iniciada",
            y: 0,
            color: "#65D9AB",
          },
          {
            name: "Sin docentes pendientes",
            y: 0,
            color: "#8FB8FF",
          },
        ],
      },
    ],
  });
  const [avancePointChart, setAvancePointChart] = useState({
    chart: {
      align: "left",
      renderTo: "container_avance",
    },
    leyend: {
      itemStyle: {
        fontSize: "22px",
      },
    },
    title: {
      text: "Avance Diario Proceso de Inscripción 2024 por Docente",
      align: "center",
      style: {
        fontWeight: "bold",
        fontSize: "18px",
        color: "#666666",
      },
    },
    yAxis: {
      title: {
        enabled: false,
      },
      labels: {
        format: "{value}%",
      },
    },
    xAxis: {
      type: "category",
      categories: [],
      title: {
        text: "Fecha",
        style: {
          fontWeight: "bold",
          fontSize: "18px",
          color: "#666666",
        },
      },
    },

    plotOptions: {
      series: {
        color: "#FFA500",
        label: {
          connectorAllowed: false,
        },
      },
    },
    series: [
      {
        color: "#5157FF",
        name: "Porcentaje avance",
        data: [],
        tooltip: {
          valueSuffix: "%",
          valueDecimals: 1,
        },
      },
      {
        color: "#28a745",
        name: "Porcentaje avance 2023",
        data: [],
        tooltip: {
          valueSuffix: "%",
          valueDecimals: 1,
        },
      },
    ],
  });

  useEffect(() => {
    getInscriptionData(localStorage.getItem("t")).then((data) => {
      setNominaChart(
        buildDocentesEnNomina(nominaChart, data.inscripcion_general)
      );
      setSostenedorChart(
        buildSostenedoresParticipantes(nominaChart, data.inscripcion_general)
      );
      setAvancePointChart(
        buildAvanceDiario(
          avancePointChart,
          data.avance_diario,
          data.avance_diario2023
        )
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tab-general">
      <div className="tab-general-upper">
        <div className="general-pie-chart-container">
          <HighchartsReact options={nominaChart} highcharts={Highcharts} />
          <hr />
          <LeyendaBasica
            data={nominaChart.series}
            total={+nominaChart.title.number}
          />
        </div>
        <div className="general-pie-chart-container">
          <HighchartsReact options={sostenedorChart} highcharts={Highcharts} />
          <hr />
          <LeyendaBasica
            data={sostenedorChart.series}
            total={+sostenedorChart.title.number}
          />
        </div>
      </div>
      <div className="general-point-chart-container">
        <HighchartsReact options={avancePointChart} highcharts={Highcharts} />
      </div>
    </div>
  );
};

export default TabGeneral;
