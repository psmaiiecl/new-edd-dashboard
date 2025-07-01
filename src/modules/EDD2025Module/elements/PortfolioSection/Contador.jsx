import React, { useState, useEffect } from "react";
import "./index.css";
function calcularDiasRestantes(fechaObjetivoStr) {
  const hoy = new Date();
  const fechaObjetivo = new Date(fechaObjetivoStr);

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
    const intervalo = setInterval(() => {
      setDiasRestantes(calcularDiasRestantes(fechaObjetivo));
    }, 86400000);

    setDiasRestantes(calcularDiasRestantes(fechaObjetivo));

    return () => clearInterval(intervalo);
  }, [fechaObjetivo]);

  return (
    <div className="contador-banner">
      {diasRestantes > 0 ? (
        <span>
          Faltan <strong>{diasRestantes}</strong> días para el{" "}
          <strong>10 de Noviembre</strong>.
        </span>
      ) : diasRestantes === 0 ? (
        <span>¡La fecha es hoy!</span>
      ) : (
        <span>La fecha ya ha pasado.</span>
      )}
    </div>
  );
}

export default Contador;
