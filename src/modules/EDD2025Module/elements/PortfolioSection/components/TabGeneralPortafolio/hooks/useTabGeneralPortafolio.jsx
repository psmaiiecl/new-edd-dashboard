import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import {
  mapPieData,
  mapLineData,
} from "../../../../../../../utils/ChartMapperFactory";
import { mappers } from "../../../utils/mapSpecs";

import { AvanceDiarioChart } from "../../ScatterChart";
import { numberFormatter } from "../../../../../../../utils/NumberFormatter";
export function useTabGeneralPortafolio() {
  const customFetch = useCustomFetch();

  const [docentesValidados, setDocentesValidados] = useState(null);
  const [avancePortafolio, setAvancePortafolio] = useState(null);
  const [avanceModuloUno, setAvanceModuloUno] = useState(null);
  const [avanceModuloDosFicha, setAvanceModuloDosFicha] = useState(null);
  const [avanceModuloDosClase, setAvanceModuloDosClase] = useState(null);
  const [avanceModuloTres, setAvanceModuloTres] = useState(null);
  const [avanceReporteDirectores, setAvanceReporteDirectores] = useState(null);
  const [avanceDescargaPortafolio, setAvanceDescargaPortafolio] =
    useState(null);
  const [avanceVisualizacion, setAvanceVisualizacion] = useState(null);
  const [avanceDescargaClase, setAvanceDescargaClase] = useState(null);
  const [avanceDiarioData, setAvanceDiarioData] = useState(null);

  // const [avanceIniciados, setAvanceIniciados] = useState(null);
  // Estado para ratios nacionales
  const [ratiosNacionales, setRatiosNacionales] = useState({
    accesos: null,
    descargas: null,
  });

  useEffect(() => {
    // Fetch para todos los datos (pie charts y línea)
    customFetch({
      route: BASE_API_URL_2025 + "/2025-informes-portafolio",
      shouldCache: true,
    }).then((data) => {
      // Mapear pie charts
      setDocentesValidados(
        mapPieData(data.docentes, mappers.entrega_informes_resultados)
      );
      setAvancePortafolio(
        mapPieData(data.docentes, mappers.entrega_informes_establecimiento)
      );
      setAvanceModuloUno(
        mapPieData(data.docentes, mappers.entrega_informes_sostenedor)
      );
      setAvanceModuloDosFicha(
        mapPieData(data.docentes, mappers.entrega_informes_resultados)
      );
      setAvanceModuloDosClase(
        mapPieData(data.docentes, mappers.entrega_informes_establecimiento)
      );
      setAvanceModuloTres(
        mapPieData(data.docentes, mappers.entrega_informes_sostenedor)
      );
      setAvanceReporteDirectores(
        mapPieData(data.docentes, mappers.entrega_informes_sostenedor)
      );
      setAvanceDescargaPortafolio(
        mapPieData(data.docentes, mappers.entrega_informes_establecimiento)
      );
      setAvanceVisualizacion(
        mapPieData(data.docentes, mappers.entrega_informes_establecimiento)
      );
      setAvanceDescargaClase(
        mapPieData(data.docentes, mappers.entrega_informes_establecimiento)
      );

      // Extraer ratios nacionales
      if (data.ratios) {
        setRatiosNacionales({
          accesos: numberFormatter(data.ratios.informes_nacional_accesos) || 0,
          descargas:
            numberFormatter(data.ratios.informes_nacional_descargados) || 0,
        });
      }

      // Mapear datos de avance diario (línea)
      const diario = data["portafolio-avance-diario"];
      console.log("Data recibida para avance diario:", diario);

      if (diario?.fechas && diario?.pfCompletado) {
        const avance_diario = mapLineData(diario, {
          fechas: diario.fechas,
          series: [
            {
              name: "Portafolios Completados",
              color: "#00C49F",
              data: "pfCompletado",
            },
            {
              name: "Portafolios Iniciados",
              color: "#FFA500",
              data: "pfIniciados",
            },
            {
              name: "Modulo 3 Iniciado",
              color: "#00BFFF",
              data: "m3Iniciado_cant",
            },
          ],
        });

        setAvanceDiarioData({
          fechas: avance_diario.fechas,
          series: avance_diario.series,
        });
      } else {
        console.warn(
          "No se encontró información válida en 'portafolio-avance-diario'"
        );
      }
    });
  }, []);

  return {
    docentesValidados,
    avancePortafolio,
    avanceModuloUno,
    avanceModuloDosFicha,
    avanceModuloDosClase,
    avanceModuloTres,
    avanceReporteDirectores,
    ratiosNacionales,
    avanceVisualizacion,
    avanceDescargaClase,
    avanceDescargaPortafolio,
    avanceDiarioData,
  };
}
