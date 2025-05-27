import React from "react";
import GenericColumnChart from "../../components/ColumnChart/GenericColumnChart";

//(modificado por Roberto) se agregó esta línea para importar el hook usePortafolioDataDependencia.jsx
import { usePortafolioDataDependencia } from "./hooks/usePortafolioDataDependencia.jsx";

//(modificado por Roberto) se quetan el objeto de filtros, pues en dependencia no hay filtros
//export function TabDependenciaPortafolio({ filtros = {} }) {
export function TabDependenciaPortafolio() {
  //(modificado por Roberto) acá seinicaliza el hook usePortafolioDataDependencia
  const { data } = usePortafolioDataDependencia();

  //const serviceUrl = "/2025-portafolio-tab-dependencia"; // Esta ruta ya se usa en el hook
  const nf = new Intl.NumberFormat("es-CL");

  const avanceDependenciaMapper = (data) => {
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
      <div className="tab-general-docente">
        <div className="general-pie-chart-container">
          {/*
			acá 
			- se quitaron los filtros, pues no se usan.
			- data se envía a GenericColumnChart a través del paramétro rawData, pero antes se mapea con avanceDependenciaMapper
			- descomentar los gráficos de abajo y replicar como se armó el primero.
		*/}
          {data && (
            <GenericColumnChart
              subtitle="ESTADO DE AVANCE DEL PORTAFOLIO POR DEPENDENCIA"
              rawData={() =>
                avanceDependenciaMapper(data["portafolio-avance-dependencia"])
              }
            />
          )}
        </div>
      </div>

      <div className="general-pie-chart-container">
        {data && (
          <GenericColumnChart
            subtitle="ESTADO DE AVANCE DEL MÓDULO 1 POR DEPENDENCIA"
            rawData={() =>
              avanceDependenciaMapper(data["portafolio-avance-dependencia-m1"])
            }
          />
        )}
      </div>
      <div className="general-pie-chart-container">
        {data && (
          <GenericColumnChart
            subtitle="ESTADO DE AVANCE DEL MÓDULO 2 POR DEPENDENCIA"
            rawData={() =>
              avanceDependenciaMapper(data["portafolio-avance-dependencia-m2"])
            }
          />
        )}
      </div>
      <div className="general-pie-chart-container">
        {data && (
          <GenericColumnChart
            subtitle="ESTADO DE AVANCE DEL MÓDULO 2 POR DEPENDENCIA"
            rawData={() =>
              avanceDependenciaMapper(data["portafolio-avance-dependencia-m3"])
            }
          />
        )}
      </div>
    </div>
  );
}
