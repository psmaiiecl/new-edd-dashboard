import { memo } from "react";
import GenericPieChart from "../../components/PieChart/GenericPieChart";
import { usePortafolioDataGeneral } from "./hooks/usePortafolioDataGeneral";
import { ConvertirPalabras } from "../../../../../../utils/portafolioUtils.js";
import Contador from "../../Contador";
import AvanceDiarioChart from "../ScatterChart/AvanceDiarioChart";
import AvanceIniciadosChart from "../ScatterChart/AvanceIniciadosChart";

// import AvanceSemanalChart from "../BarChart/AvanceSemanalChart";

// Función genérica para crear mapeadores
const createMapper = (subtitle, totalKey, seriesConfig) => (data) =>
  data
    ? {
        total: { subtitle, data: data[totalKey] },
        series: seriesConfig.map(({ name, key, color }) => ({
          name,
          y: data[key],
          color,
        })),
      }
    : {
        total: { subtitle: "", data: 0 },
        series: [],
      };

//Mapeadores para cada tipo de gráfico

// const mapAvanceSemanal = (data, dataGeneral) => {
//   const fechas = data.fechas;
//   const iniciados= data.iniciados;
//   const no_iniciados= data.no_iniciados;
//   const completados= data.completados;
//   const tipos= data.tipos;
//   const series = tipos.map((tipo) => {
//     return {
//       name: tipo.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
//       color: colores[tipo],
//       data: fechas.map((fecha, index) => {
//         const valor = avance[tipo]?.[index] ?? 0;

//         const total = tipos.reduce(
//           (sum, t) => sum + (avance[t]?.[index] ?? 0),
//           0
//         );
//         const porcentaje = total ? (valor / total) * 100 : 0;

//         return {
//           y: parseFloat(porcentaje.toFixed(2)),
//           valor,
//           porcentaje: porcentaje.toFixed(1),
//           total,
//         };
//       }),
//     };
//   });
//   return {
//     categories: fechas,
//     series,
//   }
// };
const mapAvanceDiario = (data) => {
  const fechas = data.fechas;

  const completados = data.pfCompletado_cant;
  const iniciados = data.pfIniciados_cant;
  const m1Iniciado = data.m1Iniciado_cant;
  const m2Iniciado = data.m2Iniciado_cant;
  const m3Iniciado = data.m3Iniciado_cant;
  const rinde = data.pfRinde_cant;

  // TOTALES fijos desde dataGeneral
  // const rindenPortafolioTotal =
  //   dataGeneral?.["portafolio-docentes-validados"]?.docentes
  //     ?.rinden_portafolio || 0;
  // const suspendidosTotal =
  //   dataGeneral?.["portafolio-docentes-validados"]?.docentes?.suspendidos || 0;

  // const rindenPortafolioPorFecha = fechas.map(
  //   () => rindenPortafolioTotal - suspendidosTotal
  // );

  return {
    fechas,
    keyPath: "portafolio-avance-diario",
    series: [
      {
        name: ConvertirPalabras("Portafolios Completados"),
        color: "#5157FF",
        data: completados,
      },
      {
        name: ConvertirPalabras("Portafolios Iniciados"),
        color: "#FF8E53",
        data: iniciados,
      },
      {
        name: ConvertirPalabras("Módulo 1 Iniciado"),
        color: "#65D9AB",
        data: m1Iniciado,
      },
      {
        name: ConvertirPalabras("Módulo 2 Iniciado"),
        color: "#FFD153",
        data: m2Iniciado,
      },
      {
        name: ConvertirPalabras("Módulo 3 Iniciado"),
        color: "#FF5880",
        data: m3Iniciado,
      },
      {
        name: ConvertirPalabras("Docentes que Rinden Portafolio"),
        color: "#b5ef59",
        // data: rindenPortafolioPorFecha,
        data: rinde,
      },
    ],
  };
};
const mapAvanceIniciados = (data) => ({
  fechas: data.fechas,
  keyPath: "portafolio-avance-iniciados",

  series: [
    {
      name: ConvertirPalabras("Porcentaje avance 2023"),
      color: "#5157FF",
      data: data.avance_diario2023,
    },
    {
      name: ConvertirPalabras("Porcentaje avance 2025"),
      color: "#FF8E53",
      data: data.pfIniciados,
    },
  ],
});

const mappers = {
  docentesEvaluados: createMapper("TOTAL <b>VALIDADOS</b>", "total_validados", [
    {
      name: ConvertirPalabras("RINDEN PORTAFOLIO"),
      key: "rinden_portafolio",
      color: "#65d9ab",
    },
    {
      name: ConvertirPalabras("NO RINDEN PORTAFOLIO"),
      key: "no_rinden_portafolio",
      color: "#ff5880",
    },
    {
      name: ConvertirPalabras("NO SE EVALÚAN"),
      key: "suspendidos",
      color: "#ff8e53",
    },
  ]),
  avancePortafolio: createMapper("AVANCE <b>PORTAFOLIO</b>", "total", [
    {
      name: ConvertirPalabras("PORTAFOLIO COMPLETADO"),
      key: "portafolio_completado",
      color: "#65d9ab",
    },
    {
      name: ConvertirPalabras("PORTAFOLIO INICIADO"),
      key: "portafolio_iniciado",
      color: "#ff8e53",
    },
    {
      name: ConvertirPalabras("PORTAFOLIO NO INICIADO"),
      key: "portafolio_no_iniciado",
      color: "#ffd153",
    },
    {
      name: ConvertirPalabras("NO INICIADO (SUSP/EXIM PEND)"),
      key: "portafolio_no_iniciado_se_pend",
      color: "#ff5880",
    },
  ]),
  avanceModuloUno: createMapper("AVANCE <b>MÓDULO 1</b>", "total_m1", [
    {
      name: ConvertirPalabras("M1 COMPLETADO"),
      key: "m1_completado",
      color: "#65d9ab",
    },
    {
      name: ConvertirPalabras("M1 INICIADO"),
      key: "m1_iniciado",
      color: "#ff8e53",
    },
    {
      name: ConvertirPalabras("M1 NO INICIADO"),
      key: "m1_no_iniciado",
      color: "#ff5880",
    },
  ]),
  // avanceModuloDos: createMapper("AVANCE <b>MÓDULO 2</b>", "total_m2", [
  //   { name: ConvertirPalabras("M2 COMPLETADO"), key: "m2_completado", color: "#65d9ab" },
  //   { name: ConvertirPalabras("M2 INICIADO"), key: "m2_iniciado", color: "#ff8e53" },
  //   { name: ConvertirPalabras("M2 NO INICIADO"), key: "m2_no_iniciado", color: "#ff5880" },
  // ]),
  avanceModuloDosFicha: createMapper(
    "AVANCE <b>MÓDULO 2 FICHA</b>",
    "total_m2",
    [
      {
        name: ConvertirPalabras("FICHA COMPLETADA"),
        key: "m2_completado",
        color: "#65d9ab",
      },
      {
        name: ConvertirPalabras("FICHA INICIADA"),
        key: "m2_iniciado",
        color: "#ff8e53",
      },
      {
        name: ConvertirPalabras("FICHA NO INICIADA"),
        key: "m2_no_iniciado",
        color: "#ff5880",
      },
    ]
  ),
  avanceModuloDosClase: createMapper(
    "AVANCE <b>CLASE GRABADA</b>",
    "total_m2",
    [
      {
        name: ConvertirPalabras("CLASE GRABADA"),
        key: "m2_completado",
        color: "#65d9ab",
      },
      {
        name: ConvertirPalabras("GRABACIÓN INICIADA"),
        key: "m2_iniciado",
        color: "#ff8e53",
      },
      {
        name: ConvertirPalabras("CLASE NO GRABADA"),
        key: "m2_no_iniciado",
        color: "#ff5880",
      },
    ]
  ),
  avanceModuloTres: createMapper("AVANCE <b>MÓDULO 3</b>", "total_m3", [
    {
      name: ConvertirPalabras("M3 COMPLETADO"),
      key: "m3_completado",
      color: "#65d9ab",
    },
    {
      name: ConvertirPalabras("M3 INICIADO"),
      key: "m3_iniciado",
      color: "#ff8e53",
    },
    {
      name: ConvertirPalabras("M3 NO INICIADO"),
      key: "m3_no_iniciado",
      color: "#ff5880",
    },
  ]),
  avanceReporteDirectores: createMapper(
    "AVANCE <b>M3 DIRECTORES</b>",
    "total",
    [
      {
        name: ConvertirPalabras("M3 COMPLETADO"),
        key: "completado",
        color: "#65d9ab",
      },
      {
        name: ConvertirPalabras("M3 INICIADO"),
        key: "iniciado",
        color: "#ff8e53",
      },
      {
        name: ConvertirPalabras("M3 NO INICIADO"),
        key: "no_iniciado",
        color: "#ff5880",
      },
    ]
  ),
  avanceDescargaPortafolio: createMapper(
    "<b>DESCARGA DE PORTAFOLIO</b>",
    "total",
    [
      {
        name: ConvertirPalabras("DESCARGADO"),
        key: "descargado",
        color: "#65d9ab",
      },
      {
        name: ConvertirPalabras("NO DESCARGADO"),
        key: "no_descargado",
        color: "#ff5880",
      },
    ]
  ),
  avanceVisualizacion: createMapper(
    "<b>VISUALIZACIÓN CLASE GRABADA</b>",
    "total",
    [
      {
        name: ConvertirPalabras("VISUALIZADA"),
        key: "visualizado",
        color: "#65d9ab",
      },
      {
        name: ConvertirPalabras("INCOMPLETA"),
        key: "incompleto",
        color: "#ff8e53",
      },
      {
        name: ConvertirPalabras("NO VISUALIZADA"),
        key: "no_visualizado",
        color: "#ff5880",
      },
    ]
  ),
  avanceDescargaClase: createMapper("<b>DESCARGA CLASE GRABADA</b>", "total", [
    {
      name: ConvertirPalabras("DESCARGADA"),
      key: "descarga_clase",
      color: "#65d9ab",
    },
    {
      name: ConvertirPalabras("NO DESCARGADA"),
      key: "no_descarga_clase",
      color: "#ff5880",
    },
  ]),
};

// Componente reutilizable para cada gráfico de pastel
const PieChartContainer = memo(({ subtitle, dataKey, mapper }) => (
  <div className="general-pie-chart-container">
    <GenericPieChart
      subtitle={subtitle}
      keyPath="docentes"
      rawData={mapper(dataKey)}
    />
  </div>
));

// Componente principal
export function TabGeneralPortafolio({ filtros }) {
  const { data: dataGeneral } = usePortafolioDataGeneral(filtros);

  return (
    <>
      <Contador fechaObjetivo="2025-11-10" />

      <div className="normal-container">
        <div className="pie-grid-3">
          <PieChartContainer
            subtitle="DOCENTES <b>VALIDADOS</b>"
            dataKey={dataGeneral?.["portafolio-docentes-validados"]?.docentes}
            mapper={mappers.docentesEvaluados}
          />
          <PieChartContainer
            subtitle="AVANCE <b>PORTAFOLIO</b>"
            dataKey={dataGeneral?.["portafolio-avance-portafolio"]?.docentes}
            mapper={mappers.avancePortafolio}
          />
          <PieChartContainer
            subtitle="AVANCE <b>MÓDULO 1</b>"
            dataKey={dataGeneral?.["portafolio-avance-modulo-uno"]?.docentes}
            mapper={mappers.avanceModuloUno}
          />
        </div>
        <div className="pie-grid-2">
          <PieChartContainer
            subtitle="AVANCE <b>MÓDULO 2 FICHA</b>"
            dataKey={
              dataGeneral?.["portafolio-avance-modulo-dos-ficha"]?.docentes
            }
            mapper={mappers.avanceModuloDosFicha}
          />
          <PieChartContainer
            subtitle="AVANCE <b>MÓDULO 2 CLASE GRABADA</b>"
            dataKey={
              dataGeneral?.["portafolio-avance-modulo-dos-grabada"]?.docentes
            }
            mapper={mappers.avanceModuloDosClase}
          />
        </div>

        <div className="pie-grid-2">
          <PieChartContainer
            subtitle="AVANCE <b>MÓDULO 3</b>"
            dataKey={dataGeneral?.["portafolio-avance-modulo-tres"]?.docentes}
            mapper={mappers.avanceModuloTres}
          />
          <PieChartContainer
            subtitle="AVANCE <b> REPORTE M3 DIRECTORES"
            dataKey={dataGeneral?.["portafolio-reporte-directores"]?.docentes}
            mapper={mappers.avanceReporteDirectores}
          />
        </div>

        <div className="pie-grid-3">
          <PieChartContainer
            subtitle="DESCARGA <b>PORTAFOLIO</b>"
            dataKey={
              dataGeneral?.["portafolio-avance-descarga-portafolio"]?.docentes
            }
            mapper={mappers.avanceDescargaPortafolio}
          />
          <PieChartContainer
            subtitle="VISUALIZACIÓN <b>CLASE GRABADA</b>"
            dataKey={dataGeneral?.["portafolio-avance-visualizacion"]?.docentes}
            mapper={mappers.avanceVisualizacion}
          />
          <PieChartContainer
            subtitle="DESCARGA <b>CLASE GRABADA</b>"
            dataKey={
              dataGeneral?.["portafolio-avance-descarga-clase"]?.docentes
            }
            mapper={mappers.avanceDescargaClase}
          />
        </div>
      </div>

      <AvanceDiarioChart
        title="AVANCE DIARIO <b>PORTAFOLIO</b>"
        keyPath="portafolio-avance-diario"
        dataMapper={mapAvanceDiario}
        filtros={filtros}
        // rawData={dataGeneral?.["portafolio-avance-diario"]}
        rawData={dataGeneral}
      />

      <AvanceIniciadosChart
        title="AVANCE DIARIO <b>PORTAFOLIO INICIADO</b>"
        dataMapper={mapAvanceIniciados}
        filtros={filtros}
        rawData={dataGeneral}
        valueFormat="percent"
      />

      {/* <AvanceSemanalChart/> */}
    </>
  );
}
