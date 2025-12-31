import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";

export function useTab() {
  const customFetch = useCustomFetch();
  const [selectedFilter, setSelectedFilter] = useState({
    grupo_trabajo: null,
    tolerancia: 5,
    eds: null,
    especialidad: null,
  });
  const [data, setData] = useState([]);
  const [toleranciaDraft, setToleranciaDraft] = useState(5);
  const handleDraftTolerancia = (value) => {
    setToleranciaDraft(value);
  };

  const applyTolerancia = () => {
    setSelectedFilter((prev) => ({
      ...prev,
      tolerancia: toleranciaDraft,
    }));
  };

  const handleFilter = (key, option) => {
    setSelectedFilter((prev) => ({
      ...prev,
      [key]: option,
    }));
  };

  const cleanFilters = () => {
    setSelectedFilter({
      grupo_trabajo: null,
      tolerancia: 5,
      eds: null,
      especialidad: null,
    });
    setToleranciaDraft(5);
  };

  useEffect(() => {
    customFetch({
      route:
        BASE_API_URL_2025 +
        `/2025-cpf-monitoreo-mide?grupo_trabajo1=${
          selectedFilter?.grupo_trabajo?.value ?? ""
        }&tolerancia=${selectedFilter?.tolerancia ?? 5}&grupo_trabajo=TELEEM1`,
      method: "GET",
      shouldCache: true,
    }).then((data) => {
      if (!data || Object.keys(data).length === 0) return;
      const grupoKey = Object.keys(data)[0];
      const indicadores = data[grupoKey];

      const charts = Object.values(data).map((indicador) =>
        buildIndicadorChart(indicador)
      );
      console.log(charts);

      setData({
        charts: charts,
        title: grupoKey,
      });
    });
  }, [selectedFilter, customFetch]);

  return {
    selectedFilter,
    handleFilter,
    data,
    cleanFilters,
    handleDraftTolerancia,
    applyTolerancia,
    toleranciaDraft,
  };
}

function buildIndicadorChart(indicadorData) {
  const { nombre_indicador, xAxis, band, series } = indicadorData;

  const BAND_IDLE = "rgba(255, 0, 0, 0.36)";
  const BAND_FOCUS = "rgba(255, 0, 0, 0.66)";

  const bandSeries = {
    id: "medianBand",
    type: "arearange",
    name: "Rango mediana",
    data: band.lower.map((low, i) => [low, band.upper[i]]),
    color: "rgba(255,0,0,0)",
    fillColor: BAND_IDLE,
    lineWidth: 0,
    enableMouseTracking: false,
    zIndex: 0,
  };

  const focusOn = (chart, activeSeries) => {
    const band = chart.get("medianBand");
    if (band) band.update({ fillColor: BAND_FOCUS }, false);

    chart.series.forEach((s) => {
      if (s.options.id === "medianBand") return;
      s.update({ opacity: s === activeSeries ? 1 : 0.15 }, false);
    });

    chart.redraw();
  };

  const focusOff = (chart) => {
    const band = chart.get("medianBand");
    if (band) band.update({ fillColor: BAND_IDLE }, false);

    chart.series.forEach((s) => {
      if (s.options.id === "medianBand") return;
      s.update({ opacity: 1 }, false);
    });

    chart.redraw();
  };

  const lineSeries = series.map((s) => ({
    type: "line",
    name: s.name,
    data: s.data,
    zIndex: 1,
    marker: { radius: 3 },
    states: {
      inactive: { opacity: 0.15 },
      hover: { lineWidthPlus: 2 },
    },
    point: {
      events: {
        mouseOver: function () {
          focusOn(this.series.chart, this.series);
        },
        mouseOut: function () {
          focusOff(this.series.chart);
        },
      },
    },
  }));

  return {
    chart: {
      type: "line",
      height: 500,
      events: {
        mouseOut: function () {
          focusOff(this);
        },
      },
    },
    title: {
      text: nombre_indicador,
      style: { fontSize: "14px" },
    },
    xAxis: {
      categories: xAxis,
      title: { text: "Valor" },
    },
    yAxis: {
      title: { text: "Porcentaje (%)" },
      min: 0,
      max: 100,
    },
    plotOptions: {
      series: {
        states: {
          inactive: { enabled: true, opacity: 0.15 },
        },
      },
    },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
      itemStyle: { fontSize: "9px" },
      symbolHeight: 8,
      symbolWidth: 8,
      symbolRadius: 4,
    },
    tooltip: {
      shared: false,
      valueSuffix: "%",
    },
    series: [bandSeries, ...lineSeries],
    credits: { enabled: false },
  };
}
