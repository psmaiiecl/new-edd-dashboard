export const resultadosTabList = [
  { index: "rtab1", label: "Distribución de Resultados" },
  { index: "rtab2", label: "Módulo 1" },
  { index: "rtab3", label: "Módulo 2" },
  { index: "rtab4", label: "Módulo 3" },
];

export const monitoreoTabList = [
  {
    index: "mtab1",
    label: "Calibración de correcciones grupales",
    excludeFor: [9],
  },
  {
    index: "mtab2",
    label: "Calibración de terceras correcciones",
    excludeFor: [6, 9],
  },
  {
    index: "mtab3",
    label: "Distribución de porcentajes por indicador",
    excludeFor: [6, 9],
  },
  { index: "mtab4", label: "Avance de Productividad", excludeFor: [6, 9] },
];

export const IATabList = [
  { index: "itab1", label: "Distribución de Resultados" },
  { index: "itab2", label: "Módulo 1" },
  { index: "itab3", label: "Módulo 2" },
  { index: "itab4", label: "Módulo 3" },
  { index: "itab5", label: "Calibración" },
];

export const tabList = [
  {
    index: "tab1",
    label: "Resultados",
    inner: resultadosTabList,
  },
  {
    index: "tab2",
    label: "Monitoreo",
    inner: monitoreoTabList,
    excludeFor: [9],
  },
  { index: "tab6", label: "Evidencia Incógnita", excludeFor: [6, 9] },
  { index: "tab3", label: "Monitoreo Flujos", excludeFor: [6, 9] },
  {
    index: "tab4",
    label: "Monitoreo IA",
    excludeFor: [6, 9],
    inner: IATabList,
  },
  { index: "tab5", label: "Monitoreo B/C", excludeFor: [6, 9] },
  { index: "tab7", label: "Monitoreo MIDE", excludeFor: [6, 9] },
];
