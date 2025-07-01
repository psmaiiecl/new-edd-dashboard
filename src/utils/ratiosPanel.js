import { useEffect, useState } from "react";
import { BASE_API_URL_2025 } from "../../data/BASE_API_URL";

export function RatiosPanel() {
  const [ratios, setRatios] = useState({
    ratioAcceso: null,
    ratioDescarga: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRatios() {
      try {
        const response = await fetch(
          `${BASE_API_URL_2025}/2025-informes-resultados-ratios`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los ratios");
        }
        const data = await response.json();
        setRatios({
          ratioAcceso: data.ratioAcceso,
          ratioDescarga: data.ratioDescarga,
        });
      } catch (error) {
        console.error("Error fetching ratios:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRatios();
  }, []);

  return (
    <div className="ratios-panel">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className="ratio-item">
            <strong>Numero de Accesos a Informe Nacional:</strong> {"N/A"}
          </div>
          <div className="ratio-item">
            <strong>Numero de Descargas del Informe Nacional :</strong> {"N/A"}
          </div>
        </>
      )}
    </div>
  );
}
