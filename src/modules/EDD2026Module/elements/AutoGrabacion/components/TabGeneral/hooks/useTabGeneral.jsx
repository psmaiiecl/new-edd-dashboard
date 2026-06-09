import { useCallback, useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { mapPieData } from "../../../../../../../utils/ChartMapperFactory";
import { mappers } from "../../../data/mapSpecs";
import { BASE_API_URL_2026 } from "../../../../../../../constants/BASE_API_URL";
import { buildAvanceConvocatoria, buildEquivalencias } from "../../../utils/chartBuilders";
// import {
//   buildAvanceDiario,
//   buildDocentesInscritos,
// } from "../../../utils/utils";

export function useTabGeneral() {
  const customFetch = useCustomFetch();
  const [selectedFilter, setSelectedFilter] = useState({
    region: "",
    // ctg: "",
    // zona: "",
  });

  const handleFilter = (key, option) => {
    setSelectedFilter((prev) => ({
      ...prev,
      [key]: option,
    }));
  };

  const [charts, setCharts] = useState({
    convocatoria_establecimiento: null,
    convocatoria_docente: null,
    avance_convocatoria: null,
  });

  const concatFilters = useCallback(() => {
    const [path, queryString] = (
      BASE_API_URL_2026 + "/autograbacion/tab-general/data"
    ).split("?");

    const params = new URLSearchParams(queryString ?? "");

    Object.entries(selectedFilter).forEach(([key, value]) => {
      if (value?.value && value?.value?.trim() !== "") {
        params.set(key, value.value);
      } else {
        params.delete(key);
      }
    });
    if (params.toString() === "") return path;

    return `${path}?${params.toString()}`;
  }, [selectedFilter]);

  useEffect(() => {
    customFetch({
      route: concatFilters(),
      shouldCache: true,
      method: "GET",
    }).then((res) => {
      const { data } = res;
      setCharts((prev) => ({
        ...prev,
        convocatoria_establecimiento: mapPieData(
          data.convocatoria_establecimiento,
          mappers.convocatoria_establecimiento,
        ),
        convocatoria_docente: buildEquivalencias(data.convocatoria_docente),
        avance_convocatoria: buildAvanceConvocatoria(
          data.avance_convocatoria,
        ),
      }));
      // setAvanceDiario(buildAvanceDiario(data.avance_diario));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  return {
    selectedFilter,
    setSelectedFilter,
    charts,
  };
}

//ANTES: 320 Lineas
