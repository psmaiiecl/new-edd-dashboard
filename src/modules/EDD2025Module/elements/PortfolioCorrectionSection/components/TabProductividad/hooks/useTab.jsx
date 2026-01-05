import { useEffect, useMemo, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";

export function useTab() {
  const customFetch = useCustomFetch();
  const [filterItems, setFilterItems] = useState({
    fecha: [],
    modulo: [
      { id: "PRODM1", label: "Módulo 1", value: "M1" },
      { id: "PRODM2", label: "Módulo 2", value: "M2" },
      { id: "PRODM3", label: "Módulo 3", value: "M3" },
    ],
  });

  const todayOption = useMemo(() => {
    const today = new Date();
    return {
      value: today.toISOString().slice(0, 10),
      label: today.toLocaleDateString("es-CL"),
    };
  }, []);

  const [selectedFilter, setSelectedFilter] = useState({
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
      fecha: todayOption,
      modulo: null,
    });
    setTableData([]);
  };

  useEffect(() => {
    customFetch({
      route:
        BASE_API_URL_2025 + "/2025-cpf-monitoreo-productividad-filtro-fechas",
      shouldCache: true,
      method: "GET",
    }).then((data) => {
      setFilterItems((prev) => ({ ...prev, fecha: data || [] }));
    });
  }, [customFetch]);

  useEffect(() => {
    //if (!selectedFilter.fecha || !selectedFilter.modulo) return;
    customFetch({
      route:
        BASE_API_URL_2025 +
        `/2025-cpf-estimacion-correcciones?modulo=${
          selectedFilter.modulo?.value || ""
        }&fecha=${selectedFilter.fecha?.value || ""}`,
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
    filterItems,
    clearFilters,
  };
}
