import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import {
  mapPieData,
  mapLineDataBuild,
} from "../../../../../../../utils/ChartMapperFactory";
import { mappers } from "../../../utils/mapSpecs";
import {
  buildInformesIndividualesDiario,
  buildInformesDirectorDiario,
  buildInformesSostenedorDiario,
  buildInformesNacionalDiario,
} from "../../../utils/resultTabUtils";

import { numberFormatter } from "../../../../../../../utils/NumberFormatter";
export function useTabGeneralResultados() {
  const customFetch = useCustomFetch();

  const [informesIndividuales, setInformesIndividuales] = useState(null);
  const [informesEstablecimiento, setInformesEstablecimiento] = useState(null);
  const [informesSostenedor, setInformesSostenedor] = useState(null);
  const [AvanceDiarioDescargaIndividual, setAvanceDiarioDescargaIndividual] =
    useState(null);
  const [AvanceDiarioDescargaDirector, setAvanceDiarioDescargaDirector] =
    useState(null);
  const [AvanceDiarioDescargaSostenedor, setAvanceDiarioDescargaSostenedor] =
    useState(null);
  const [AvanceDiarioDescargaNacional, setAvanceDiarioDescargaNacional] =
    useState(null);
  // Estado para ratios nacionales
  const [ratiosNacionales, setRatiosNacionales] = useState({
    accesos: null,
    descargas: null,
  });

  useEffect(() => {
    // Fetch para pie charts
    customFetch({
      route: BASE_API_URL_2025 + "/2025-informes-resultados",
      shouldCache: true,
    }).then((data) => {
      // Mapear pie charts
      setInformesIndividuales(
        mapPieData(data.ratios, mappers.entrega_informes_resultados)
      );
      setInformesEstablecimiento(
        mapPieData(data.ratios, mappers.entrega_informes_establecimiento)
      );
      setInformesSostenedor(
        mapPieData(data.ratios, mappers.entrega_informes_sostenedor)
      );

      // Extraer ratios nacionales
      if (data.ratios) {
        setRatiosNacionales({
          accesos: numberFormatter(data.ratios.informes_nacional_accesos) || 0,
          descargas:
            numberFormatter(data.ratios.informes_nacional_descargados) || 0,
        });
      }
    });

    // Fetch para avances diarios (línea)
    customFetch({
      route: BASE_API_URL_2025 + "/2025-informes-resultados-diario",
      shouldCache: true,
    }).then((data) => {
      // Mapeo de líneas para cada sección
      const individualesData = mapLineDataBuild(data, {
        fechas: "fechas",
        series: [
          { name: "Individuales", color: "#5157FF", data: "individuales" },
        ],
      });

      const establecimientoData = mapLineDataBuild(data, {
        fechas: "fechas",
        series: [
          { name: "Accesos", color: "#00C49F", data: "establecimiento_acceso" },
          { name: "Descargados", color: "#FFA500", data: "establecimiento" },
        ],
      });

      const sostenedorData = mapLineDataBuild(data, {
        fechas: "fechas",
        series: [
          { name: "Accesos", color: "#00C49F", data: "sostenedor_acceso" },
          { name: "Descargados", color: "#FFA500", data: "sostenedor" },
        ],
      });
      const nacionalData = mapLineDataBuild(data, {
        fechas: "fechas",
        series: [
          { name: "Accesos", color: "#00C49F", data: "nacional_acceso" },
          { name: "Descargados", color: "#FFA500", data: "nacional" },
        ],
      });
      // Construyo cada gráfico con buildInformesXDiario

      setAvanceDiarioDescargaIndividual(
        buildInformesIndividualesDiario({
          fechas: individualesData.fechas,
          series: individualesData.series,
        })
      );

      setAvanceDiarioDescargaDirector(
        buildInformesDirectorDiario({
          fechas: establecimientoData.fechas,
          series: establecimientoData.series,
        })
      );

      setAvanceDiarioDescargaSostenedor(
        buildInformesSostenedorDiario({
          fechas: sostenedorData.fechas,
          series: sostenedorData.series,
        })
      );
      setAvanceDiarioDescargaNacional(
        buildInformesNacionalDiario({
          fechas: nacionalData.fechas,
          series: nacionalData.series,
        })
      );
      data;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    informesIndividuales,
    informesEstablecimiento,
    informesSostenedor,
    AvanceDiarioDescargaIndividual,
    AvanceDiarioDescargaDirector,
    AvanceDiarioDescargaSostenedor,
    AvanceDiarioDescargaNacional,
    ratiosNacionales,
  };
}
