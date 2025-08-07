import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2024 } from "../../../../../data/BASE_API_URL";
import { mapPieData } from "../../../../../../../utils/ChartMapperFactory";
import { agrupacionesDistRes } from "../../../data/selectorLists";
import { mappers } from "../../../utils/mapSpecs";

export function useTab() {
  const customFetch = useCustomFetch();
  const [selectedFilter, setSelectedFilter] = useState({
    agrupacion: agrupacionesDistRes[0],
  });
  const [correccionChart, setCorreccionChart] = useState(null);

  const handleFilter = (key, option) => {
    setSelectedFilter((prev) => ({
      ...prev,
      [key]: option,
    }));
  };

  useEffect(() => {
    customFetch({
      route:
        BASE_API_URL_2024 +
        "/2024-correccion_portafolios/resultados/distribucion",
      formData: selectedFilter,
      shouldCache: true,
    }).then((data) => {
      const dataTorta = {
        completa: data.completa.cantidad ?? 0,
        incompleta: data.incompleta.cantidad ?? 0,
      };
      setCorreccionChart(mapPieData(dataTorta, mappers.correccion_portafolios));
    });
  }, [selectedFilter, customFetch]);

  return {
    selectedFilter,
    handleFilter,
    correccionChart,
    setCorreccionChart,
  };
}
