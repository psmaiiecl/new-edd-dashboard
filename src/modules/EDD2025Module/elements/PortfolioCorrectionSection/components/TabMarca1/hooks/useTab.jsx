import { useEffect, useState } from "react";
import { flujos } from "../data/selectorLists";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";

export function useTab() {
  const customFetch = useCustomFetch();
  const [selectedFilter, setSelectedFilter] = useState({
    flujo: flujos[0],
  });

  const resetFilter = () => {
    setSelectedFilter({
      flujo: flujos[0],
    });
  };

  const handleFilter = (key, option) => {
    setSelectedFilter((prev) => ({
      ...prev,
      [key]: option,
    }));
  };

  const [data, setData] = useState({
    totales: null,
    detalles: null,
  });
  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2025 + "/2025-correccion-pf-tab-flujos",
      shouldCache: true,
      method: "GET",
    }).then((data) => {
      setData({
        totales: data?.discrepancias.totales ?? null,
        detalles: data?.discrepancias.detalles ?? null,
      });
    });
  }, [customFetch]);

  return {
    selectedFilter,
    handleFilter,
    resetFilter,
    data,
  };
}
