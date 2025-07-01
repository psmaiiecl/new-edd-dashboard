import React, { useState, useEffect } from "react";
function calcularDiasRestantes(fechaObjetivoStr) {
  const hoy = new Date();
  const fechaObjetivo = new Date(fechaObjetivoStr);

  // Ignorar la hora para ambas fechas
  hoy.setHours(0, 0, 0, 0);
  fechaObjetivo.setHours(0, 0, 0, 0);

  const diffMs = fechaObjetivo - hoy;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

function Contador({ fechaObjetivo }) {
  const [diasRestantes, setDiasRestantes] = useState(() =>
    calcularDiasRestantes(fechaObjetivo)
  );

  useEffect(() => {
    // Actualiza el contador cada 24 horas (86400000 ms)
    const intervalo = setInterval(() => {
      setDiasRestantes(calcularDiasRestantes(fechaObjetivo));
    }, 86400000); // 24 * 60 * 60 * 1000 ms

    // También lo actualiza inmediatamente al montar
    setDiasRestantes(calcularDiasRestantes(fechaObjetivo));

    return () => clearInterval(intervalo);
  }, [fechaObjetivo]);

  return (
    <div className="general-pie-chart-container">
      {diasRestantes > 0 ? (
        <p>
          Faltan <strong>{diasRestantes}</strong> días para la fecha objetivo.
        </p>
      ) : diasRestantes === 0 ? (
        <p>¡La fecha es hoy!</p>
      ) : (
        <p>La fecha ya ha pasado</p>
      )}
    </div>
  );
}
export default Contador;
