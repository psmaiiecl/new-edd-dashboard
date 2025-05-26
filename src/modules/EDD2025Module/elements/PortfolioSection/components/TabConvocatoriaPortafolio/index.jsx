
import axios from "../../../../../EDD2025Module/services/axiosInstance";
import GenericBarChart from "../../components/BarChart/GenericBarChart";

import { usePortafolioDataConvocatoria } from "../TabConvocatoriaPortafolio/Hooks/usePortafolioDataConvocatoria";
const nf = new Intl.NumberFormat("es-CL");
export function TabConvocatoriaPortafolio() {

  const { data } = usePortafolioDataConvocatoria();
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

          {
            data &&
            <GenericBarChart
              subtitle="ESTADO DE AVANCE DEL PORTAFOLIO POR CONVOCATORIA"
              rawData={() => avanceConvocatoriaMapper(data['portafolio-avance-convocatoria'])}
            />
          }
        </div>
        <div className="general-pie-chart-container">
          {
            data &&
            <GenericBarChart
              subtitle="ESTADO DE AVANCE DEL MÓDULO 1 POR CONVOCATORIA"
              rawData={() => avanceConvocatoriaMapper(data['portafolio-avance-convocatoria-m1'])}
            />
          }
        </div>
        <div className="general-pie-chart-container">
          {
            data &&
            <GenericBarChart
              subtitle="ESTADO DE AVANCE DEL MÓDULO 2 POR CONVOCATORIA"
              rawData={() => avanceConvocatoriaMapper(data['portafolio-avance-convocatoria-m2'])}
            />
          }
        </div>
        <div className="general-pie-chart-container">
          {
            data &&
            <GenericBarChart
              subtitle="ESTADO DE AVANCE DEL MÓDULO 3 POR CONVOCATORIA"
              rawData={() => avanceConvocatoriaMapper(data['portafolio-avance-convocatoria-m3'])}
            />
          }
        </div>
      </div>
    </div>
  );

}
