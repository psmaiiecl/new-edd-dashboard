import { useEffect, useState } from "react";
import { DEPENDENCY_LIST, REGION_LIST } from "../../../data/selectorLists";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { mapPieData } from "../../../../../../../utils/ChartMapperFactory";
import { mappers } from "../../../utils/mapSpecs";
import {
  buildAvanceSemanalPortafolio,
  mapPortafolioAvanceDiario,
  mapPortafolioAvanceIniciados,
} from "../../../utils/utils";

export function useTab() {
  const customFetch = useCustomFetch();
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({
    dependencia: DEPENDENCY_LIST[0],
    region: REGION_LIST[0],
  });

  const handleFilter = (key, option) => {
    setFilters((prev) => ({
      ...prev,
      [key]: option,
    }));
  };

  useEffect(() => {
    const builtFilters = `?region=${filters.region.value}&dependencia=${filters.dependencia.value}`;
    customFetch({
      route: BASE_API_URL_2025 + "/2025-portafolio-tab-general" + builtFilters,
      shouldCache: true,
    }).then((data) => {
      setData({
        validados: mapPieData(
          data["portafolio-docentes-validados"]?.docentes,
          mappers.docentes_validados
        ),
        avance_portafolio: mapPieData(
          data["portafolio-avance-portafolio"]?.docentes,
          mappers.avance_portafolio
        ),
        avance_m1: mapPieData(
          data["portafolio-avance-modulo-uno"]?.docentes,
          mappers.avance_m1
        ),
        avance_m2_ficha: mapPieData(
          data["portafolio-avance-modulo-dos-ficha"]?.docentes,
          mappers.avance_m2_ficha
        ),
        avance_m2_clase: mapPieData(
          data["portafolio-avance-modulo-dos-grabada"]?.docentes,
          mappers.avance_m2_clase
        ),
        avance_m3: mapPieData(
          data["portafolio-avance-modulo-tres"]?.docentes,
          mappers.avance_m3
        ),
        avance_m3_directores: mapPieData(
          data["portafolio-reporte-directores"]?.docentes,
          mappers.avance_m3_directores
        ),
        avance_encuesta: mapPieData(
          data["portafolio-avance-encuesta"],
          mappers.avance_encuesta
        ),
        descarga_portafolio: mapPieData(
          data["portafolio-avance-descarga-portafolio"]?.docentes,
          mappers.avance_descarga_portafolio
        ),
        descarga_reporte_director: mapPieData(
          data["portafolio-avance-descarga-reporte-director"],
          mappers.avance_descarga_reporte_director
        ),
        visualizacion_clase: mapPieData(
          data["portafolio-avance-visualizacion"]?.docentes,
          mappers.avance_visualizacion
        ),
        descarga_clase: mapPieData(
          data["portafolio-avance-descarga-clase"]?.docentes,
          mappers.avance_descarga_clase
        ),
        avance_diario: mapPortafolioAvanceDiario(
          data?.["portafolio-avance-diario"]
        ),
        avance_iniciados: mapPortafolioAvanceIniciados(
          data?.["portafolio-avance-diario"]
        ),
        avance_semanal: buildAvanceSemanalPortafolio(
          data?.["portafolio-avance-semanal"]
        ),
      });
    });
  }, [customFetch, filters]);

  return { data, handleFilter, filters };
}
