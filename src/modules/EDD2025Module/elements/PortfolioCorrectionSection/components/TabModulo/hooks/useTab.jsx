import { useCallback, useEffect, useState } from "react";
import { agrupacionModulo, nivelModulo } from "../../../data/selectorLists";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2024 } from "../../../../../data/BASE_API_URL";
import { buildGraficoCD, buildGraficoCohen } from "../../../utils/utils";

export function useTab(module) {
  const customFetch = useCustomFetch();
  const [filterItems, setFilterItems] = useState({
    nivel: nivelModulo,
    especialidad: [],
  });
  const [filtersLoaded, setFiltersLoaded] = useState(false);

  //SI cambia el primer filtro se trae para el segundo fuiltro
  const [selectedFilter, setSelectedFilter] = useState({
    agrupacion: agrupacionModulo[0],
    modulo: module,
    nivel: nivelModulo[0],
    especialidad: null,
  });
  const [data, setData] = useState({
    comparacion: null,
    cohen: {},
  });

  const handleFilter = (key, option) => {
    setSelectedFilter((prev) => ({
      ...prev,
      [key]: option,
    }));
  };

  const fixFilters = useCallback((filters) => {
    const fixed = { ...filters };
    if (fixed.agrupacion.value !== "General") delete fixed.nivel;
    return fixed;
  }, []);

  useEffect(() => {
    setFiltersLoaded(false); // Reset filters loaded state
    customFetch({
      route:
        BASE_API_URL_2024 +
        `/2024-correccion_portafolios/resultados/filtro-especialidad`,
      formData: {
        agrupacion: selectedFilter?.agrupacion,
        filtroAgrupacion: -1,
      },
      shouldCache: true,
    }).then((data) => {
      if (data) {
        const nuevasEspecialidades = [{ value: -1, label: "Todas" }].concat(
          data?.especialidades.map((e) => parseEspecialidad(e)) || []
        );
        setFilterItems((prev) => ({
          ...prev,
          especialidad: nuevasEspecialidades,
        }));
        setSelectedFilter((prev) => ({
          ...prev,
          especialidad: nuevasEspecialidades[0],
        }));
        setFiltersLoaded(true); // Mark filters as loaded
      }
    });
  }, [selectedFilter?.agrupacion, customFetch]);

  useEffect(() => {
    if (!filtersLoaded) return;

    const filters = fixFilters(selectedFilter);

    customFetch({
      route:
        BASE_API_URL_2024 +
        `/2024-correccion_portafolios/resultados/por-modulo`,
      formData: filters,
      shouldCache: true,
    }).then((data) => {
      if (data) {
        console.log("cohen", buildGraficoCohen(data.grafico_dcohen, module));
        
        setData({
          comparacion: buildGraficoCD(data.grafico_comparacion, module) || null,
          cohen: buildGraficoCohen(data.grafico_dcohen, module) || null,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter, customFetch, fixFilters, filtersLoaded]);

  return {
    selectedFilter,
    handleFilter,
    data,
    filterItems,
  };
}

function parseEspecialidad(value) {
  if (typeof value === "string") return { value: value, label: value };
  return value;
}
