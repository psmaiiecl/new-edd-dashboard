import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { mapPieData } from "../../../../../../../utils/ChartMapperFactory";
import { agrupacionesDistRes } from "../../../data/selectorLists";
import { mappers } from "../../../utils/mapSpecs";
import { formatDataForTable } from "../../../utils/utils";

export function useTab() {
  const customFetch = useCustomFetch();
  const [selectedFilter, setSelectedFilter] = useState({
    agrupacion: agrupacionesDistRes[0],
  });
  const [data, setData] = useState({
    chart: null,
    table: null,
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
        `/2025-cpf-distribucion-resultados?agrupacion=${selectedFilter.agrupacion?.value ?? ''}`,
      method: "GET",
      shouldCache: true,
    }).then((data) => {
      //console.log(data);
      const dataTorta = {
        completa: data.completa.cantidad ?? 0,
        incompleta: data.incompleta.cantidad ?? 0,
      };
      
      setData({
        chart: mapPieData(dataTorta, mappers.correccion_portafolios),
        table: formatDataForTable(data?.tabla),
      });
    });
  }, [selectedFilter, customFetch]);

  return {
    selectedFilter,
    handleFilter,
    data,
  };
}
