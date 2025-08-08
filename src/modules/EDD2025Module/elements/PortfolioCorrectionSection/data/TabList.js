
export const resultadosTabList = [
  { index: "rtab1", label: "Distribución de Resultados" },
  { index: "rtab2", label: "Módulo 1" },
  { index: "rtab3", label: "Módulo 2" },
  { index: "rtab4", label: "Módulo 3" },
];

export const monitoreoTabList = [
  { index: "mtab1", label: "Calibración de correcciones grupales" },
  { index: "mtab2", label: "Calibración de terceras correcciones" },
  { index: "mtab3", label: "Distribución de porcentajes por indicador" },
];

export const tabList = [
  { index: "tab1", label: "Resultados", inner: resultadosTabList},
  { index: "tab2", label: "Monitoreo", inner: monitoreoTabList }
];