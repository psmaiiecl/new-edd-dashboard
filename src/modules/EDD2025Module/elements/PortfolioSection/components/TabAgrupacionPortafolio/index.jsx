import React from "react";

import GenericColumnChart from "../../components/ColumnChart/GenericColumnChart";

export function TabAgrupacionPortafolio() {
  const baseURL =
    "http://api-docentemas-dev.3htp.cloud:8095/back/public/api2025";
const nf = new Intl.NumberFormat("es-CL");
const avanceAgrupacionMapper = (data) => {
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
      const total = valores.completado + valores.iniciado + valores.no_iniciado;
      const valor = valores[tipo];
      const porcentaje = total ? (valor / total) * 100 : 0;

      return {
        y: parseFloat(porcentaje.toFixed(2)),
        porcentaje: porcentaje.toFixed(1),
        valor,
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
      data: `${ nf.format(totalDocentes)}`,
      subtitulo: "Avance por grupo",
    },
  };
};


  return (
    <div className="tab-general-upper">
      <div className="tab-general-docente">
        <div className="general-pie-chart-container">
          <GenericColumnChart
            title="Avance por grupo"
            subtitle="ESTADO DE AVANCE DEL PORTAFOLIO POR GRUPO"
            serviceUrl={`${baseURL}/2025-portafolio-avance-agrupacion`}
            keyPath="" 
            dataMapper={avanceAgrupacionMapper}
          />
          
        </div></div>
      <div className="general-pie-chart-container">
        <GenericColumnChart
          title="Avance por grupo"
          subtitle={"ESTADO DE AVANCE DEL MÓDULO 1 POR GRUPO"}
          serviceUrl={`${baseURL}/2025-portafolio-avance-agrupacion-m1`}
          keyPath="dependencia"
          dataMapper={avanceAgrupacionMapper}
        />
      </div>
      <div className="general-pie-chart-container">
        <GenericColumnChart
          title="Avance por grupo"
          subtitle={"ESTADO DE AVANCE DEL MÓDULO 2 POR GRUPO"}
          serviceUrl={`${baseURL}/2025-portafolio-avance-agrupacion-m2`}
          keyPath=""
          dataMapper={avanceAgrupacionMapper}
        />
      </div>
      <div className="general-pie-chart-container">
        <GenericColumnChart
          title="Avance por grupo"
          subtitle={"ESTADO DE AVANCE DEL MÓDULO 3 POR GRUPO"}
          serviceUrl={`${baseURL}/2025-portafolio-avance-agrupacion-m3`}
          keyPath=""
          dataMapper={avanceAgrupacionMapper}
        />
      </div>
    </div>
  );
}
