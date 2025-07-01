import { useTabGeneralResultados } from "../Tabs/hooks/useTabGeneralResultados";
import "./style.css";
export function RatiosPanel() {
  const { ratiosNacionales } = useTabGeneralResultados();

  return (
    <div className="ratios-banner ratios-panel">
      <div className="ratio-item">
        <p>
          Número de Accesos a Informe Nacional:{" "}
          <strong>
            {""}
            {ratiosNacionales.accesos !== null
              ? ratiosNacionales.accesos
              : "N/A"}
          </strong>
        </p>
      </div>
      <div className="ratio-item">
        <p>
          Número de Descargas del Informe Nacional:{" "}
          <strong>
            {""}

            {ratiosNacionales.descargas !== null
              ? ratiosNacionales.descargas
              : "N/A"}
          </strong>{" "}
        </p>
      </div>
    </div>
  );
}
