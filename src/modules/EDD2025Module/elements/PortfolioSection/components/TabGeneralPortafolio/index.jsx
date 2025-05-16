import React from "react";
import "./index.css";
import GenericPieChart from "../../components/PieChart/GenericPieChart";
import GenericPointChart from "../../components/PointChart/GenericPointChart";
import GenericScatterChart from "../../components/ScatterChart/GenericScatterChart";

export function TabGeneralPortafolio() {
  const baseURL =
    "http://api-docentemas-dev.3htp.cloud:8095/back/public/api2025";


  const dMapper = (mapped) => {
    return {

      series: {
        name: data.nombre,
        x: data.valorX,
        y: data.valorY,
      },
    };
  };
  const docentesEvaluadosMapper = (data) =>
    data
      ? {
        total: {
          subtitle: "TOTAL VALIDADOS",
          data: data.total_validados,
        },
        series: [
          {
            name: "RINDEN PORTAFOLIO",
            y: data.rinden_portafolio,
            color: "#65d9ab",
          },
          {
            name: "NO RINDEN PORTAFOLIO",
            y: data.no_rinden_portafolio,
            color: "#ff5880",
          },
          { name: "NO SE EVALUAN", y: data.suspendidos, color: "#ff8e53" },
        ],
      }
      : {
        total: {
          subtitle: "",
          data: 0,
        },
        series: [],
      };
  const avancePortafolioMapper = (data) =>
    data
      ? {
        total: {
          subtitle: "AVANCE PORTAFOLIO",
          data: data.total,
        },
        series: [
          {
            name: "PORTAFOLIO COMPLETADO",
            y: data.portafolio_completado,
            color: "#65d9ab",
          },
          {
            name: "PORTAFOLIO INICIADO",
            y: data.portafolio_iniciado,
            color: "#ff8e53",
          },
          {
            name: "PORTAFOLIO NO INICIADO",
            y: data.portafolio_no_iniciado,
            color: "#ffd153",
          },
          {
            name: "PORTAFOLIO NO INICIADO con SUSP/EXIM PENDIENTE",
            y: data.portafolio_no_iniciado_se_pend,
            color: "#ff5880",
          },
        ],
      }
      : {
        total: {
          subtitle: "",
          data: 0,
        },
        series: [],
      };
  const avanceModuloUnoMapper = (data) =>
    data
      ? {
        total: {
          subtitle: "AVANCE MÓDULO 1",
          data: data.total_m1,
        },
        series: [
          { name: "M1 COMPLETADO", y: data.m1_completado, color: "#65d9ab" },
          { name: "M1 INICIADO", y: data.m1_iniciado, color: "#ff8e53" },
          {
            name: "M1 NO INICIADO",
            y: data.m1_no_iniciado,
            color: "#ff5880",
          },
        ],
      }
      : {
        total: {
          subtitle: "",
          data: 0,
        },
        series: [],
      };
  const avanceModuloDosMapper = (data) =>
    data
      ? {
        total: {
          subtitle: "AVANCE MÓDULO 2",
          data: data.total_m2,
        },
        series: [
          { name: "M2 COMPLETADO", y: data.m2_completado, color: "#65d9ab" },
          { name: "M2 INICIADO", y: data.m2_iniciado, color: "#ff8e53" },
          {
            name: "M2 NO INICIADO",
            y: data.m2_no_iniciado,
            color: "#ff5880",
          },
        ],
      }
      : {
        total: {
          subtitle: "",
          data: 0,
        },
        series: [],
      };
  const avanceModuloTresMapper = (data) =>
    data
      ? {
        total: {
          subtitle: "AVANCE MÓDULO 3",
          data: data.total_m3,
        },
        series: [
          { name: "M3 COMPLETADO", y: data.m3_completado, color: "#65d9ab" },
          { name: "M3 INICIADO", y: data.m3_iniciado, color: "#ff8e53" },
          {
            name: "M3 NO INICIADO",
            y: data.m3_no_iniciado,
            color: "#ff5880",
          },
        ],
      }
      : {
        total: {
          subtitle: "",
          data: 0,
        },
        series: [],
      };
  const avanceReporteDirectoresMapper = (data) =>
    data
      ? {
        total: {
          subtitle: "AVANCE M3 DIRECTORES",
          data: data.total,
        },
        series: [
          { name: "M3 COMPLETADO", y: data.completado, color: "#65d9ab" },
          { name: "M3 INICIADO", y: data.iniciado, color: "#ff8e53" },
          { name: "M3 NO INICIADO", y: data.no_iniciado, color: "#ff5880" },
        ],
      }
      : {
        total: {
          subtitle: "",
          data: 0,
        },
        series: [],
      };


  const avanceDiarioMapper = (data) => {
  return [
    
    {
      name: 'Portafolios',
      color: '#007bff',
      data: data.fechas.map((fecha, index) => ({
        name: fecha,
        x: data.index,         // usa el índice como valor x
        y: data.pfEvaluacionDiaria[index],
      })),
    }
  ];
};
const avanceIniciadosMapper = (data) => {

  const fechas = data.map((d) => d.fecha);

  return {
    fechas,
    series: [
      {
        name: "PORTAFOLIOS COMPLETADOS",
        data: data.fechas.map((d, i) => ({ x: i, y: d.completado, name: d.fecha })),
        color: "#65d9ab",
      },
      {
        name: "PORTAFOLIOS INICIADOS",
        data: data.fechas.map((d, i) => ({ x: i, y: d.iniciado, name: d.fecha })),
        color: "#ff5880",
      },
      {
        name: "MÓDULO 1 INICIADO",
        data: data.fechas.map((d, i) => ({ x: i, y: d.m1_iniciado, name: d.fecha })),
        color: "#ff8e53",
      },
      {
        name: "MÓDULO 2 INICIADO",
        data: data.fechas.map((d, i) => ({ x: i, y: d.m2_iniciado, name: d.fecha })),
        color: "#ff8e53",
      },
      {
        name: "MÓDULO 3 INICIADO",
        data: data.fechas.map((d, i) => ({ x: i, y: d.m3_iniciado, name: d.fecha })),
        color: "#ff8e53",
      },
    ],
  };
};



  return (
    <div className="tab-general-lower">
      <div className="tab-general-upper">
        <div className="general-pie-chart-container">
          <GenericPieChart
            subtitle="TOTAL VALIDADOS"
            serviceUrl={`${baseURL}/2025-portafolio-docentes-validados`}
            keyPath="docentes"
            dataMapper={docentesEvaluadosMapper}
          />
        </div>

        <div className="general-pie-chart-container">
          <GenericPieChart
            subtitle="AVANCE GENERAL DEL PORTAFOLIO"
            serviceUrl={`${baseURL}/2025-portafolio-avance-portafolio`}
            keyPath="docentes"
            dataMapper={avancePortafolioMapper}
          />
        </div>

        <div className="general-pie-chart-container">
          <GenericPieChart
            subtitle="AVANCE MÓDULO 1"
            serviceUrl={`${baseURL}/2025-portafolio-avance-modulo-uno`}
            keyPath="docentes"
            dataMapper={avanceModuloUnoMapper}
          />
        </div>

        <div className="general-pie-chart-container">
          <GenericPieChart
            subtitle="AVANCE MÓDULO 2"
            serviceUrl={`${baseURL}/2025-portafolio-avance-modulo-dos`}
            keyPath="docentes"
            dataMapper={avanceModuloDosMapper}
          />
        </div>

        <div className="general-pie-chart-container">
          <GenericPieChart
            subtitle="AVANCE MÓDULO 3"
            serviceUrl={`${baseURL}/2025-portafolio-avance-modulo-tres`}
            keyPath="docentes"
            dataMapper={avanceModuloTresMapper}
          />
        </div>

        <div className="general-pie-chart-container">
          <GenericPieChart
            subtitle="AVANCE REPORTE M3 DIRECTORES"
            serviceUrl={`${baseURL}/2025-portafolio-reporte-directores`}
            keyPath="docentes"
            dataMapper={avanceReporteDirectoresMapper}
          />
        </div>
      </div>
      <div className="tab-general-lower">
        <div className="highchart-container" >
        <GenericPointChart
            serviceUrl={`${baseURL}/2025-portafolio-evaluacion-diaria`}
            title="AVANCE DIARIO PORTAFOLIOS"
            keyPath=""
            dataMapper={avanceDiarioMapper}
          />
        </div>
    
        <div className="highchart-container" >
          <GenericPointChart
            serviceUrl={`${baseURL}/2025-portafolio-evaluacion-diaria`}
            title="AVANCE DIARIO PORTAFOLIOS INICIADOS"
            keyPath=""
            dataMapper={avanceIniciadosMapper}/>
            
        </div>

      </div>
    </div>
  );

}

