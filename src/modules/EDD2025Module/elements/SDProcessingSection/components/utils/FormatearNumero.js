// src/utils/formatters.js

export const formatearNumero = (valor) =>
  new Intl.NumberFormat("es-CL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor);

export const formatearPorcentaje = (valor) =>
  new Intl.NumberFormat("es-CL", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(valor);
