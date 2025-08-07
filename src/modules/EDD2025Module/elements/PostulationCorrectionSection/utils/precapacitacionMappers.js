// utils/precapacitacionMappers.js
const ESTADOS = [
  "No Iniciada",
  "En Unidad 1",
  "En Unidad 2",
  "En Unidad 3",
  "En Unidad 4",
  "Terminada",
];

export function mapSupervisorData(data) {
  return ESTADOS.map((estado) => {
    const found = data.find((item) => item.tipo === "Supervisor" && item.estado === estado);
    return {
      name: estado,
      y: found ? found.cantidad : 0,
    };
  });
}

export function mapCorrectorData(data) {
  return ESTADOS.map((estado) => {
    const found = data.find((item) => item.tipo === "Corrector" && item.estado === estado);
    return {
      name: estado,
      y: found ? found.cantidad : 0,
    };
  });
}
