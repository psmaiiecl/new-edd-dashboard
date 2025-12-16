export const resultadosTabList = [
  { index: "rtab1", label: "Distribución de Resultados" },
  { index: "rtab2", label: "Módulo 1" },
  { index: "rtab3", label: "Módulo 2" },
  { index: "rtab4", label: "Módulo 3" },
];

export const monitoreoTabList = [
  { index: "mtab1", label: "Calibración de correcciones grupales" },
  // {
  //   index: "mtab2",
  //   label: "Calibración de terceras correcciones",
  //   excludeFor: [6],
  // },
  // {
  //   index: "mtab3",
  //   label: "Distribución de porcentajes por indicador",
  //   excludeFor: [6],
  // },
  // { index: "mtab4", label: "Avance de Productividad", excludeFor: [6] },
];

export const flujosTabList = [{ index: "ftab1", label: "GENERAL M2" }];

export const tabList = [
  {
    index: "tab1",
    label: "Resultados",
    inner: resultadosTabList,
    excludeFor: [6],
  },
  { index: "tab2", label: "Monitoreo", inner: monitoreoTabList },
  // { index: "tab6", label: "Evidencia Incógnita", excludeFor: [6] },
  // { index: "tab3", label: "Monitoreo Flujos", excludeFor: [6] },
  // { index: "tab4", label: "Monitoreo IA", excludeFor: [6] },
  // { index: "tab5", label: "Monitoreo B/C", excludeFor: [6] },
];
