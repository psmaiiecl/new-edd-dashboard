import { useCallback, useEffect, useState } from "react";
import { DEPENDENCY_LIST, REGION_LIST } from "../../../data/selectorLists";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2026 } from "../../../../../../../constants/BASE_API_URL";
import { mapPieData } from "../../../../../../../utils/ChartMapperFactory";
import { mappers } from "../../../utils/mapSpecs";
import {
  mapPortafolioAvanceDiario,
  mapPortafolioAvanceIniciados,
} from "../../../utils/utils";

export function useTabGeneral() {
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

  const concatFilters = useCallback(() => {
    const [path, queryString] = (
      BASE_API_URL_2026 + "/portafolio/tab-general/data"
    ).split("?");

    const params = new URLSearchParams(queryString ?? "");

    Object.entries(filters).forEach(([key, option]) => {
      if (option?.value && option.value.trim() !== "") {
        params.set(key, option.value);
      } else {
        params.delete(key);
      }
    });

    if (params.toString() === "") return path;

    return `${path}?${params.toString()}`;
  }, [filters]);

  useEffect(() => {
    customFetch({
      route: concatFilters(),
      shouldCache: true,
      method: "GET",
    }).then((response) => {
      const { data } = response;
      console.log(data)
      setData({
        validados: mapPieData(
          data?.docentes_validados,
          mappers.docentes_validados
        ),
        avance_portafolio: mapPieData(
          data?.avance_portafolio,
          mappers.avance_portafolio
        ),
        avance_m1: mapPieData(data?.avance_m1, mappers.avance_m1),
        avance_m2_ficha: mapPieData(
          data?.avance_m2_ficha,
          mappers.avance_m2_ficha
        ),
        avance_m2_grabada: mapPieData(
          data?.avance_m2_grabada,
          mappers.avance_m2_grabada
        ),
        avance_m3: mapPieData(data?.avance_m3, mappers.avance_m3),
        reporte_directores: mapPieData(
          data?.reporte_directores,
          mappers.reporte_directores
        ),
        avance_encuesta: mapPieData(
          data?.avance_encuesta,
          mappers.avance_encuesta
        ),
        descarga_portafolio: mapPieData(
          data?.avance_descarga_portafolio,
          mappers.avance_descarga_portafolio
        ),
        descarga_reporte_director: mapPieData(
          data?.avance_descarga_reporte_director,
          mappers.avance_descarga_reporte_director
        ),
        visualizacion_clase: mapPieData(
          data?.avance_visualizacion,
          mappers.avance_visualizacion
        ),
        descarga_clase: mapPieData(
          data?.avance_descarga_clase,
          mappers.avance_descarga_clase
        ),
        avance_diario: mapPortafolioAvanceDiario(data?.avance_diario),
        avance_iniciados: mapPortafolioAvanceIniciados(data?.avance_diario),
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return { data, handleFilter, filters };
}
