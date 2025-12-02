import { useContext, useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { mapPieData } from "../../../../../../../utils/ChartMapperFactory";
import { mappers } from "../../../utils/mapSpecs";
import { SelectorItems } from "../../../data/SelectorItems";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { AuthContext } from "../../../../../../../context/AuthContext";

function useTabPrecapacitacion() {
  const customFetch = useCustomFetch();
  const { getPayload } = useContext(AuthContext);
  const currentCdC = getPayload()?.centro
    ? SelectorItems.cdc.find((cdc) => cdc.label === getPayload()?.centro)
    : null;
  const [selectedFilter, setSelectedFilter] = useState({
    cdc: currentCdC,
    especialidad: null,
    modulo: SelectorItems.modulos[0],
  });

  const [chartData, setChartData] = useState({
    correctores: null,
    supervisores: null,
  });

  const handleFilter = (key, option) => {
    setSelectedFilter((prev) => ({
      ...prev,
      [key]: option,
    }));
  };

  useEffect(() => {
    customFetch({
      route:
        BASE_API_URL_2025 +
        `/2025-precapacitacion?centro=${
          selectedFilter.cdc?.value ?? ""
        }&especialidad=${selectedFilter.especialidad?.value ?? ""}&modulo=${
          selectedFilter.modulo?.value ?? ""
        }`,
      method: "GET",
      shouldCache: true,
    }).then((data) => {
      const correctores = mapPieData(data.corrector, mappers.correctores);
      const supervisores = mapPieData(data.supervisor, mappers.supervisores);
      setChartData({ correctores, supervisores });
    });
  }, [customFetch, selectedFilter]);

  return { selectedFilter, handleFilter, chartData };
}

export default useTabPrecapacitacion;
