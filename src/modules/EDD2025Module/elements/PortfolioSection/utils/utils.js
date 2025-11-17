import { numberFormatter } from "../../../../../utils/NumberFormatter";

export function mapPortafolioAvanceDiario(data) {
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
    override: {
      xAxis: {
        title: {
          text: null,
        },
        categories: fechas,
      },
    },
    series: [
      {
        name: "Portafolios Completados",
        color: "#5157FF",
        data: completados,
      },
      {
        name: "Portafolios Iniciados",
        color: "#FF8E53",
        data: iniciados,
      },
      {
        name: "Módulo 1 Iniciado",
        color: "#65D9AB",
        data: m1Iniciado,
      },
      {
        name: "Módulo 2 Iniciado",
        color: "#FFD153",
        data: m2Iniciado,
      },
      {
        name: "Módulo 3 Iniciado",
        color: "#FF5880",
        data: m3Iniciado,
      },
      {
        name: "Docentes que Rinden Portafolio",
        color: "#b5ef59",
        // data: rindenPortafolioPorFecha,
        data: rinde,
      },
    ],
  };
}

export function mapPortafolioAvanceIniciados(data) {
  return {
    series: [
      {
        name: "Porcentaje avance 2023",
        color: "#5157FF",
        data: data.avance_diario2023,
      },
      {
        name: "Porcentaje avance 2025",
        color: "#FF8E53",
        data: data.pfIniciados,
      },
    ],
  };
}

export function buildAvanceSemanalPortafolio(data) {
  const noIniciados = [];
  const iniciados = [];
  const completados = [];

  const anidadoCategorias = { categories: ["M1", "M2", "M3", "PF"] };
  let fechas = data?.fechas || [];
  let categorias = [];

  for (let i = 0; i < fechas.length; i++) {
    noIniciados.push(data?.m1NoIniciado[i] ?? noIniciados[i - 1]);
    noIniciados.push(data?.m2NoIniciado[i] ?? noIniciados[i - 1]);
    noIniciados.push(data?.m3NoIniciado[i] ?? noIniciados[i - 1]);
    noIniciados.push(data?.pfNoIniciados[i] ?? noIniciados[i - 1]);
    iniciados.push(data?.m1Iniciado[i] ?? iniciados[i - 1]);
    iniciados.push(data?.m2Iniciado[i] ?? iniciados[i - 1]);
    iniciados.push(data?.m3Iniciado[i] ?? iniciados[i - 1]);
    iniciados.push(data?.pfIniciados[i] ?? iniciados[i - 1]);
    completados.push(data?.m1Completado[i] ?? iniciados[i - 1]);
    completados.push(data?.m2Completado[i] ?? iniciados[i - 1]);
    completados.push(data?.m3Completado[i] ?? iniciados[i - 1]);
    completados.push(data?.pfCompletado[i] ?? iniciados[i - 1]);

    categorias.push({
      name: fechas[i],
      ...anidadoCategorias,
    });
  }

  const res = {
    override: {
      tooltip: {
        pointFormatter: function () {
          return `<span style="color:${this.color}">●</span> ${
            this.series.name
          }: <b>${this.y.toFixed(1)}%</b><br/>`;
        },
      },
      yAxis: {
        labels: {
          formatter: function () {
            return `${this.value.toFixed(0)}%`;
          },
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: "bold",
            fontSize: "13px",
            color: "#333",
            textOutline: "none",
          },
          formatter: function () {
            return `${this.total.toFixed(0)}%`;
          },
        },
      },
      xAxis: {
        categories: [...categorias],
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color: "gray",
        },
      },
    },
    series: [
      {
        name: "No Iniciado",
        data: noIniciados,
        color: "#F25C75",
      },
      {
        name: "Iniciado",
        data: iniciados,
        color: "#5FA8F5",
      },
      {
        name: "Completado",
        data: completados,
        color: "#6EE7B7",
      },
    ],
  };
  return res;
}

export function buildAvance(data, tableName) {
  const dependencias = data?.docentes ?? {};
  const categories = Object.keys(dependencias);

  const colores = {
    completado: "#65D9AB",
    iniciado: "#5FA8F5",
    no_iniciado: "#F25C75",
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

  let totalLabel = {
    subtitle: {
      text: `${numberFormatter(totalDocentes)}`,
      align: "center",
      style: {
        fontWeight: "bold",
        color: "var(--blue-100)",
        fontSize: "28px",
      },
    },
  };

  if (tableName == "Convocatoria") {
    totalLabel = {
      title: {
        text: `${numberFormatter(totalDocentes)}`,
        align: "center",
        style: {
          fontWeight: "bold",
          color: "var(--blue-100)",
          fontSize: "28px",
        },
      },
    };
  }

  return {
    tableName,
    categories,
    series,
    total: {
      data: `${numberFormatter(totalDocentes)}`,
      subtitulo: "Avance por dependencia",
    },
    override: {
      tooltip: {
        shared: true,
        formatter: function () {
          let s = `<b>${this.key}</b><br/>`;
          this.points.forEach(function (point) {
            s += `<span style="color:${point.color}">\u25CF</span> ${
              point.series.name
            }: <b>${numberFormatter(point.point.valor)}</b> (${point.y}%)<br/>`;
          });
          return s;
        },
      },
      ...totalLabel,
      yAxis: {
        min: 0,
        max: 100,
        title: { text: "Porcentaje (%)" },
        stackLabels: {
          enabled: false,
        },
        format: {
          label: "{value}%",
        },
      },
      xAxis: {
        categories: categories || [],
        title: { text: null },
        labels: {
          style: {
            fontSize: "11px",
          },
        },
      },
      plotOptions: {
        column: {
          stacking: "percent",
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y ? `${this.y.toFixed(1)}%` : null;
            },
          },
        },
      },
    },
  };
}
