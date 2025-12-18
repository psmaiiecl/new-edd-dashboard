import { useCallback, useEffect, useMemo, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import {
  buildGraficoCD,
  buildGraficoCohen,
  buildTablaCohen,
  buildTablaComparacion,
} from "../../../utils/utils";

export function useTab(module, selectors) {
  const customFetch = useCustomFetch();

  const safeSelectors = useMemo(() => selectors ?? [], [selectors]);

  const [selectedFilter, setSelectedFilter] = useState({
    grupo: null,
    agrupacion: null,
    especialidad: null,
    modulo: module,
  });

  const [data, setData] = useState({
    comparacion: null,
    cohen: {},
  });

  const handleFilter = useCallback((key, option) => {
    setSelectedFilter((prev) => ({ ...prev, [key]: option }));
  }, []);

  useEffect(() => {
    if (!safeSelectors.length) return;

    setSelectedFilter((prev) => {
      if (prev.grupo) return prev;
      return { ...prev, grupo: safeSelectors[5] };
    });
  }, [safeSelectors]);

  useEffect(() => {
    const grupo = selectedFilter.grupo;
    if (!grupo) return;

    const defaultAgr = null;
    const defaultEsp = null;

    setSelectedFilter((prev) => {
      const agrIsValid =
        prev.agrupacion &&
        grupo.agrupaciones?.some((a) => a.value === prev.agrupacion.value);
      const espIsValid =
        prev.especialidad &&
        grupo.especialidades?.some((e) => e.value === prev.especialidad.value);

      return {
        ...prev,
        agrupacion: agrIsValid ? prev.agrupacion : defaultAgr,
        especialidad: espIsValid ? prev.especialidad : defaultEsp,
      };
    });
  }, [selectedFilter.grupo]);

  const fixFilters = useCallback((filters) => {
    const params = new URLSearchParams();

    if (filters.modulo) {
      params.append("modulo", filters.modulo.replace("ódulo ", ""));
    }

    if (filters.grupo?.value) {
      params.append("grupo", filters.grupo.value);
    }

    if (filters.especialidad?.value) {
      params.append("especialidad", filters.especialidad.value);
    }

    if (filters.agrupacion?.value === "General" && filters.agrupacion?.value) {
      params.append("agrupacion", filters.agrupacion.value);
    }

    const query = params.toString();
    return query ? `?${query}` : "";
  }, []);

  useEffect(() => {
    const ready = !!selectedFilter.grupo;

    if (!ready) return;

    const filters = fixFilters(selectedFilter);

    customFetch({
      route:
        BASE_API_URL_2025 +
        `/2025-cpf-distribucion-resultados-modulos${filters}`,
      method: "GET",
      // hasLoadPanel: false,
      shouldCache: true,
    }).then((resp) => {
      if (!resp) return;

      setData({
        comparacion: buildGraficoCD(resp.grafico_comparacion, module) || null,
        cohen: buildGraficoCohen(resp.grafico_dcohen, module) || null,
        tabla_comparacion: buildTablaComparacion(resp.grafico_comparacion),
        tabla_cohen: buildTablaCohen(resp.grafico_dcohen),
      });
    });
  }, [selectedFilter, customFetch, fixFilters, module]);

  return {
    selectedFilter,
    handleFilter,
    data,
  };
}
