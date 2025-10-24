import { useState } from "react";
import { flujos } from "../data/selectorLists";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";

export function useTab() {
  const customFetch = useCustomFetch();
  const [selectedFilter, setSelectedFilter] = useState({
    flujo: flujos[0],
  });

  const handleFilter = (key, option) => {
    setSelectedFilter((prev) => ({
      ...prev,
      [key]: option,
    }));
  };

  const [data, setData] = useState({
    centro: null,
    discrepancias: 0,
  });

  return {
    selectedFilter,
    handleFilter,
    data,
  };
}
