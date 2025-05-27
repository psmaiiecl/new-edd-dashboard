import React from "react";
import GenericColumnChart from "../../components/ColumnChart/GenericColumnChart";

//(modificado por Roberto) se agregó esta línea para importar el hook usePortafolioDataDependencia.jsx
import { usePortafolioDataRegion } from "./Hooks/usePortafolioDataRegion.jsx";

//(modificado por Roberto) se quetan el objeto de filtros, pues en dependencia no hay filtros
//export function TabDependenciaPortafolio({ filtros = {} }) {
export function TabRegionPortafolio() {
  //(modificado por Roberto) acá seinicaliza el hook usePortafolioDataDependencia
  const { data } = usePortafolioDataRegion();

  //const serviceUrl = "/2025-portafolio-tab-region"; // Esta ruta ya se usa en el hook
  const nf = new Intl.NumberFormat("es-CL");

  const avanceRegionMapper = (data) => {
    const dependencias = data?.docentes ?? {};

    const categories = Object.keys(dependencias);

    const colores = {
      completado: "#2ecc71",
      iniciado: "#f1c40f",
      no_iniciado: "#e74c3c",
    };

    const tipos = ["completado", "iniciado", "no_iniciado"];

    const series = tipos.map((tipo) => ({
      name: tipo.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      color: colores[tipo],
      data: categories.map((dep) => {
        const valores = dependencias[dep];
        const total =
          valores.completado + valores.iniciado + valores.no_iniciado;
        const valor = valores[tipo];
        const porcentaje = total ? (valor / total) * 100 : 0;

        return {
          y: parseFloat(porcentaje.toFixed(2)),
          porcentaje: porcentaje.toFixed(1),
          valor,
          total,
        };
      }),
    }));

    const totalDocentes = categories.reduce((sum, dep) => {
      const v = dependencias[dep];
      return sum + v.completado + v.iniciado + v.no_iniciado;
    }, 0);

    return {
      categories,
      series,
      total: {
        data: `${nf.format(totalDocentes)}`,
        subtitulo: "Avance por dependencia",
      },
    };
  };
  return (
    <div className="tab-general-upper">
      <div className="normal-container">
        <div className="general-pie-chart-container">
          {data && (
            <GenericColumnChart
              subtitle="ESTADO DE AVANCE DEL PORTAFOLIO POR REGIÓN"
              rawData={() =>
                avanceRegionMapper(data["portafolio-avance-region"])
              }
            />
          )}
        </div>
        <div className="general-pie-chart-container">
          {data && (
            <GenericColumnChart
              subtitle="ESTADO DE AVANCE DEL MÓDULO 1 POR DEPENDENCIA"
              rawData={() =>
                avanceRegionMapper(data["portafolio-avance-region-m1"])
              }
            />
          )}
        </div>
        <div className="general-pie-chart-container">
          {data && (
            <GenericColumnChart
              subtitle="ESTADO DE AVANCE DEL MÓDULO 2 POR DEPENDENCIA"
              rawData={() =>
                avanceRegionMapper(data["portafolio-avance-region-m2"])
              }
            />
          )}
        </div>
        <div className="general-pie-chart-container">
          {data && (
            <GenericColumnChart
              subtitle="ESTADO DE AVANCE DEL MÓDULO 2 POR DEPENDENCIA"
              rawData={() =>
                avanceRegionMapper(data["portafolio-avance-region-m3"])
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
