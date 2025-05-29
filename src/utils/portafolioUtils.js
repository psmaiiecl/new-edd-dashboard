export function ConvertirPalabras(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
// utils/calcularDiasRestantes.js
export function calcularDiasRestantes(fechaObjetivo) {
  const hoy = new Date();
  const fechaFinal = new Date(fechaObjetivo);
  
  // Ajustar la hora para evitar desfases por la hora local
  hoy.setHours(0, 0, 0, 0);
  fechaFinal.setHours(0, 0, 0, 0);
  
  const diferencia = fechaFinal - hoy;
  const diasRestantes = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  return diasRestantes;
}
