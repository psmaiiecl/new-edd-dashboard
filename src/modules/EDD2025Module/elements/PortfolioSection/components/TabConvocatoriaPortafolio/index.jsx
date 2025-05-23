import React from "react";
import GenericBarChart from "../../components/BarChart/GenericBarChart";

export function TabConvocatoriaPortafolio() {
  const baseURL =
    "http://api-docentemas-dev.3htp.cloud:8095/back/public/api2025";

  const nf = new Intl.NumberFormat("es-CL");
  const avanceConvocatoriaMapper = (data) => {
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
      subtitulo: "",
    },
  };
};


  return (
    <div className="tab-general-upper">
      <div className="tab-general-docente">
        <div className="general-pie-chart-container">
          <GenericBarChart
            title="Avance por Convocatoria"
            subtitle="ESTADO DE AVANCE DEL PORTAFOLIO DISTRIBUIDOS POR CONVOCATORIA"
            serviceUrl={`${baseURL}/2025-portafolio-avance-convocatoria`}
            keyPath=""
            dataMapper={avanceConvocatoriaMapper}
          
          />
        </div>
      </div>
      <div className="tab-general-docente">
        <div className="general-pie-chart-container">
          <GenericBarChart
            title="Avance por Convocatoria"
            subtitle="ESTADO DE AVANCE DEL MÓDULO 1 DISTRIBUIDOS POR CONVOCATORIA"
            serviceUrl={`${baseURL}/2025-portafolio-avance-convocatoria-m1`}
            keyPath=""
            dataMapper={avanceConvocatoriaMapper}
          />
        </div></div>
      <div className="tab-general-docente">
        <div className="general-pie-chart-container">
          <GenericBarChart
            title="Avance por Convocatoria"
            subtitle="ESTADO DE AVANCE DEL MÓDULO 2 DISTRIBUIDOS POR CONVOCATORIA"
            serviceUrl={`${baseURL}/2025-portafolio-avance-convocatoria-m2`}
            keyPath=""
            dataMapper={avanceConvocatoriaMapper}
          />
        </div></div>
      <div className="tab-general-docente">
        <div className="general-pie-chart-container">
          <GenericBarChart
            title="Avance por Convocatoria"
            subtitle="ESTADO DE AVANCE DEL MÓDULO 3 DISTRIBUIDOS POR CONVOCATORIA"
            serviceUrl={`${baseURL}/2025-portafolio-avance-convocatoria-m3`}
            keyPath=""
            dataMapper={avanceConvocatoriaMapper}
          />

        </div>
      </div>
    </div>
  );
}
