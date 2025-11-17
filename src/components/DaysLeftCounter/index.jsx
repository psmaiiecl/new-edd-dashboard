import './style.css'

export function DaysLeftCounter({ dueDate }) {
  const diasRestantes = calculateDueDate(dueDate);
  return (
    <div className="contador-banner">
      {diasRestantes > 0 ? (
        <span>
          Faltan <strong>{diasRestantes}</strong> días para el{" "}
          <strong>{dueDate}</strong>.
        </span>
      ) : diasRestantes === 0 ? (
        <span>¡La fecha es hoy!</span>
      ) : (
        <span>La fecha ya ha pasado.</span>
      )}
    </div>
  );
}

function calculateDueDate(finalDate) {
  const hoy = new Date();
  const fechaObjetivo = new Date(finalDate);

  hoy.setHours(0, 0, 0, 0);
  fechaObjetivo.setHours(0, 0, 0, 0);

  const diffMs = fechaObjetivo - hoy;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}
