import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";

export function useTab() {
  const customFetch = useCustomFetch();
  const [selectedFilter, setSelectedFilter] = useState({
    grupo: null,
    especialidad: null,
    modulo: null,
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
      grupo: null,
      especialidad: null,
      modulo: null,
    });
  };

  useEffect(() => {
    customFetch({
      route:
        BASE_API_URL_2025 +
        `/2025-cpf-monitoreo-bc?grupo=${
          selectedFilter?.grupo?.value ?? ""
        }&modulo=${selectedFilter?.modulo?.value ?? ""}&especialidad=${
          selectedFilter?.especialidad?.value ?? ""
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
