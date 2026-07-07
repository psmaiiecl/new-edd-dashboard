import "./style.css";

export function RatiosPanel({ ratiosNacionales }) {
  return (
    <div className="ratios-banner ratios-panel">
      <div className="ratio-item">
        <p>
          Número de Accesos a Informe Nacional:{" "}
          <strong>
            {ratiosNacionales?.accesos !== null &&
            ratiosNacionales?.accesos !== undefined
              ? ratiosNacionales.accesos
              : "N/A"}
          </strong>
        </p>
      </div>
      <div className="ratio-item">
        <p>
          Número de Descargas del Informe Nacional:{" "}
          <strong>
            {ratiosNacionales?.descargas !== null &&
            ratiosNacionales?.descargas !== undefined
              ? ratiosNacionales.descargas
              : "N/A"}
          </strong>{" "}
        </p>
      </div>
    </div>
  );
}
