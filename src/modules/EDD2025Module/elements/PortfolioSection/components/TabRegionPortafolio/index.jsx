import React from "react";
import GenericColumnChart from "../../components/ColumnChart/GenericColumnChart";

import { usePortafolioDataRegion } from "./Hooks/usePortafolioDataRegion.jsx";


export function TabRegionPortafolio() {

  const { data } = usePortafolioDataRegion();

  const nf = new Intl.NumberFormat("es-CL");

  const avanceRegionMapper = (data) => {
    const region = data?.docentes ?? {};

    const categories = Object.keys(region);

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
        const valores = region[dep];
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
      const v = region[dep];
      return sum + v.completado + v.iniciado + v.no_iniciado;
    }, 0);

    return {
      categories,
      series,
      total: {
        data: `${nf.format(totalDocentes)}`,
        subtitulo: "Avance por región",
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
              subtitle="ESTADO DE AVANCE DEL MÓDULO 1 POR REGIÓN"
              rawData={() =>
                avanceRegionMapper(data["portafolio-avance-region-m1"])
              }
            />
          )}
        </div>
        <div className="general-pie-chart-container">
          {data && (
            <GenericColumnChart
              subtitle="ESTADO DE AVANCE DEL MÓDULO 2 POR REGIÓN"
              rawData={() =>
                avanceRegionMapper(data["portafolio-avance-region-m2"])
              }
            />
          )}
        </div>
        <div className="general-pie-chart-container">
          {data && (
            <GenericColumnChart
              subtitle="ESTADO DE AVANCE DEL MÓDULO 2 POR REGIÓN"
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
