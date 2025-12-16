import { useContext, useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { mapPieData } from "../../../../../../../utils/ChartMapperFactory";
import { mappers } from "../../../utils/mapSpecs";
import { getFechas, SelectorItems } from "../../../data/SelectorItems";
import { AuthContext } from "../../../../../../../context/AuthContext";

export function useTab() {
  const customFetch = useCustomFetch();
  const { getPayload } = useContext(AuthContext);
  const currentCdC = getPayload()?.centro
    ? SelectorItems.cdc.find((cdc) => cdc.label === getPayload()?.centro)
    : null;
  const [selectedFilter, setSelectedFilter] = useState({
    cdc: currentCdC,
    especialidad: null,
    modulo: null,
    sala: null,
    cargo: null,
    fecha: getFechas().find((f) => f.selected) ?? null,
  });

  const [data, setData] = useState(null);

  const handleFilter = (key, option) => {
    setSelectedFilter((prev) => ({
      ...prev,
      [key]: option,
    }));
  };

  const clearFilters = () => {
    setSelectedFilter({
      cdc: currentCdC,
      especialidad: null,
      modulo: null,
      sala: null,
      cargo: null,
      fecha: getFechas().find((f) => f.selected) ?? null,
    });
  };

  useEffect(() => {
    customFetch({
      route:
        BASE_API_URL_2025 +
        `/2025-asistencias-correctores?centro=${
          selectedFilter.cdc?.value ?? ""
        }&especialidad=${selectedFilter.especialidad?.value ?? ""}&modulo=${
          selectedFilter.modulo?.value ?? ""
        }&fecha=${selectedFilter.fecha?.value ?? ""}&sala=${
          selectedFilter.sala?.value ?? ""
        }&cargo=${selectedFilter.cargo?.value ?? ""}`,
      method: "GET",
      shouldCache: true,
    }).then((data) => {
      setData(mapPieData(data, mappers.asistencias));
    });
  }, [customFetch, selectedFilter]);

  return { selectedFilter, handleFilter, data, clearFilters };
}
