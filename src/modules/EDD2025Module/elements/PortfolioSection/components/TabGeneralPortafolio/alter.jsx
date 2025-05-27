import GenericPieChart from "../../components/PieChart/GenericPieChart";
import { usePortafolioDataGeneral } from "./hooks/usePortafolioDataGeneral";
import { CustomPieChart } from "../../../../../../components/CustomPieChart";

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
    : { total: { subtitle: "", data: 0 }, series: [] };

// Mapeadores para cada tipo de gráfico
const mappers = {
  docentesEvaluados: createMapper("TOTAL VALIDADOS", "total_validados", [
    { name: "RINDEN PORTAFOLIO", key: "rinden_portafolio", color: "#65d9ab" },
    {
      name: "NO RINDEN PORTAFOLIO",
      key: "no_rinden_portafolio",
      color: "#ff5880",
    },
    { name: "NO SE EVALUAN", key: "suspendidos", color: "#ff8e53" },
  ]),
  avancePortafolio: createMapper("AVANCE PORTAFOLIO", "total", [
    {
      name: "PORTAFOLIO COMPLETADO",
      key: "portafolio_completado",
      color: "#65d9ab",
    },
    {
      name: "PORTAFOLIO INICIADO",
      key: "portafolio_iniciado",
      color: "#ff8e53",
    },
    {
      name: "PORTAFOLIO NO INICIADO",
      key: "portafolio_no_iniciado",
      color: "#ffd153",
    },
    {
      name: "NO INICIADO (SUSP/EXIM PEND)",
      key: "portafolio_no_iniciado_se_pend",
      color: "#ff5880",
    },
  ]),
  avanceModuloUno: createMapper("AVANCE MÓDULO 1", "total_m1", [
    { name: "M1 COMPLETADO", key: "m1_completado", color: "#65d9ab" },
    { name: "M1 INICIADO", key: "m1_iniciado", color: "#ff8e53" },
    { name: "M1 NO INICIADO", key: "m1_no_iniciado", color: "#ff5880" },
  ]),
  avanceModuloDos: createMapper("AVANCE MÓDULO 2", "total_m2", [
    { name: "M2 COMPLETADO", key: "m2_completado", color: "#65d9ab" },
    { name: "M2 INICIADO", key: "m2_iniciado", color: "#ff8e53" },
    { name: "M2 NO INICIADO", key: "m2_no_iniciado", color: "#ff5880" },
  ]),
  avanceModuloDosFicha: createMapper("AVANCE MÓDULO 2 FICHA", "total", [
    { name: "FICHA COMPLETADA", key: "m2_completado", color: "#65d9ab" },
    { name: "FICHA INICIADA", key: "m2_iniciado", color: "#ff8e53" },
    { name: "FICHA NO INICIADA", key: "m2_no_iniciado", color: "#ff5880" },
  ]),
  avanceModuloDosClase: createMapper("AVANCE CLASE GRABADA", "total", [
    { name: "CLASE GRABADA", key: "m2_completado", color: "#65d9ab" },
    { name: "GRABACIÓN INICIADA", key: "m2_iniciado", color: "#ff8e53" },
    { name: "CLASE NO GRABADA", key: "m2_no_iniciado", color: "#ff5880" },
  ]),
  avanceModuloTres: createMapper("AVANCE MÓDULO 3", "total_m3", [
    { name: "M3 COMPLETADO", key: "m3_completado", color: "#65d9ab" },
    { name: "M3 INICIADO", key: "m3_iniciado", color: "#ff8e53" },
    { name: "M3 NO INICIADO", key: "m3_no_iniciado", color: "#ff5880" },
  ]),
  avanceReporteDirectores: createMapper("AVANCE M3 DIRECTORES", "total", [
    { name: "M3 COMPLETADO", key: "completado", color: "#65d9ab" },
    { name: "M3 INICIADO", key: "iniciado", color: "#ff8e53" },
    { name: "M3 NO INICIADO", key: "no_iniciado", color: "#ff5880" },
  ]),
  avanceDescargaPortafolio: createMapper("DESCARGA DE PORTAFOLIO", "total", [
    { name: "DESCARGADO", key: "descargado", color: "#65d9ab" },
    { name: "NO DESCARGADO", key: "no_descargado", color: "#ff5880" },
  ]),
  avanceVisualizacion: createMapper("VISUALIZACIÓN CLASE GRABADA", "total", [
    { name: "VISUALIZADA", key: "visualizado", color: "#65d9ab" },
    { name: "INCOMPLETA", key: "iniciado", color: "#ff8e53" },
    { name: "NO VISUALIZADA", key: "no_visualizado", color: "#ff5880" },
  ]),
  avanceDescargaClase: createMapper("DESCARGA CLASE GRABADA", "total", [
    { name: "DESCARGADA", key: "descarga_clase", color: "#65d9ab" },
    { name: "NO DESCARGADA", key: "no_descarga_clase", color: "#ff5880" },
  ]),
};
export function TabGeneralPortafolio({ filtros }) {
  const { data } = usePortafolioDataGeneral(filtros);
  return (
    <div className="tab-general">
      <div className="normal-container">
        {data && (
          <>
            <div className="pie-grid-3">
              <CustomPieChart
                rawData={data["portafolio-docentes-validados"].docentes}
                customMapper={mappers.docentesEvaluados}
              />
              <CustomPieChart
                rawData={data["portafolio-avance-portafolio"].docentes}
                customMapper={mappers.avancePortafolio}
              />
              <CustomPieChart
                rawData={data["portafolio-avance-modulo-uno"].docentes}
                customMapper={mappers.avanceModuloUno}
              />
            </div>
            <div className="pie-grid-3">
              <CustomPieChart
                rawData={data["portafolio-avance-modulo-dos"].docentes}
                customMapper={mappers.avanceModuloDos}
              />
              <CustomPieChart
                rawData={data["portafolio-avance-modulo-dos-ficha"].docentes}
                customMapper={mappers.avanceModuloDosFicha}
              />
              <CustomPieChart
                rawData={data["portafolio-avance-modulo-dos-grabada"].docentes}
                customMapper={mappers.avanceModuloDosClase}
              />
            </div>
            <div className="pie-grid-2">
              <CustomPieChart
                rawData={data["portafolio-avance-modulo-tres"].docentes}
                customMapper={mappers.avanceModuloTres}
              />
              <CustomPieChart
                rawData={data["portafolio-reporte-directores"].docentes}
                customMapper={mappers.avanceReporteDirectores}
              />
            </div>
            <div className="pie-grid-3">
              <CustomPieChart
                rawData={data["portafolio-avance-descarga-portafolio"].docentes}
                customMapper={mappers.avanceDescargaPortafolio}
              />
              <CustomPieChart
                rawData={data["portafolio-avance-visualizacion"].docentes}
                customMapper={mappers.avanceVisualizacion}
              />
              <CustomPieChart
                rawData={data["portafolio-avance-descarga-clase"].docentes}
                customMapper={mappers.avanceDescargaClase}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
