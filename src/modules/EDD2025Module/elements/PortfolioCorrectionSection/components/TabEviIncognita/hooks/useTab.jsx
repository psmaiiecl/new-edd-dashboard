import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";

export function useTab() {
  const customFetch = useCustomFetch();
  const [selectedFilter, setSelectedFilter] = useState({
    grupo_trabajo: null,
    especialidad: null,
    tipo_portafolio: null,
    periodo: null,
  });
  const [correccionTable, setCorreccionTable] = useState([]);

  const handleFilter = (key, option) => {
    setSelectedFilter((prev) => ({
      ...prev,
      [key]: option,
    }));
  };

  const cleanFilters = () => {
    setSelectedFilter({
      grupo_trabajo: null,
      especialidad: null,
      tipo_portafolio: null,
      periodo: null,
    });
  };

  useEffect(() => {
    customFetch({
      route:
        BASE_API_URL_2025 +
        `/2025-cpf-incognita?tipo_portafolio=${
          selectedFilter?.tipo_portafolio?.value ?? ""
        }&grupo_trabajo=${selectedFilter?.grupo_trabajo?.value ?? ""}&periodo=${
          selectedFilter?.periodo?.value ?? ""
        }`,
      method: "GET",
      shouldCache: true,
    }).then((data) => {
      setCorreccionTable(data);
    });
  }, [selectedFilter, customFetch]);

  return {
    selectedFilter,
    handleFilter,
    correccionTable,
    cleanFilters,
  };
}
