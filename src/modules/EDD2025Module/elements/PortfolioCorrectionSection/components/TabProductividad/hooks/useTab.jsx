import { useEffect, useMemo, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";

export function useTab() {
  const customFetch = useCustomFetch();

  const todayOption = useMemo(() => {
    const today = new Date();
    return {
      value: today.toISOString().slice(0, 10),
      label: today.toLocaleDateString("es-CL"),
    };
  }, []);

  const [selectedFilter, setSelectedFilter] = useState({
    grupo: null,
    agrupacion: null,
    especialidad: null,
    fecha: todayOption,
    modulo: null,
  });
  const [tableData, setTableData] = useState([]);

  const handleFilter = (key, option) => {
    setSelectedFilter((prev) => ({
      ...prev,
      [key]: option,
    }));
  };

  const clearFilters = () => {
    setSelectedFilter({
      grupo: null,
      agrupacion: null,
      especialidad: null,
      fecha: todayOption,
      modulo: null,
    });
    setTableData([]);
  };
  useEffect(() => {
    //if (!selectedFilter.fecha || !selectedFilter.modulo) return;
    customFetch({
      route:
        BASE_API_URL_2025 +
        `/2025-cpf-estimacion-correcciones?modulo=${
          selectedFilter.modulo?.value || ""
        }&fecha=${selectedFilter.fecha?.value || ""}&grupo=${
          selectedFilter.grupo?.value || ""
        }&agrupacion=${selectedFilter.agrupacion?.value || ""}&especialidad=${
          selectedFilter.especialidad?.value || ""
        }`,
      shouldCache: true,
      method: "GET",
    }).then((data) => {
      setTableData(data);
    });
  }, [selectedFilter, customFetch]);

  return {
    selectedFilter,
    handleFilter,
    tableData,
    clearFilters,
  };
}
