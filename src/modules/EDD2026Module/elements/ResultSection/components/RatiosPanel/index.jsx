import "./style.css";

export function RatiosPanel({ ratiosNacionales }) {
  return (
    <div className="ratios-banner ratios-panel">
      <div className="ratio-item">
        <p>
          Accesos a Informe Nacional:{" "}
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
          Descargas del Informe Nacional:{" "}
          <strong>
            {ratiosNacionales?.descargas !== null &&
            ratiosNacionales?.descargas !== undefined
              ? ratiosNacionales.descargas
              : "N/A"}
          </strong>{" "}
        </p>
      </div>
      <div className="ratio-item">
        <p>
           Accesos a Informe DEPROV:{" "}
          <strong>
            {ratiosNacionales?.deprov !== null &&
            ratiosNacionales?.deprov !== undefined
              ? ratiosNacionales.deprov
              : "N/A"}
          </strong>{" "}
        </p>
      </div>
    </div>
  );
}
