import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2024 } from "../../../../../data/BASE_API_URL";
import { mapPieData } from "../../../../../../../utils/ChartMapperFactory";
import { mappers } from "../../../utils/mapSpecs";

function useTabPrecapacitacion() {
  const customFetch = useCustomFetch();
  const [selectedFilter, setSelectedFilter] = useState({
    cdc: null,
    especialidad: null,
    modulo: null,
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
    // customFetch({
    //   route: BASE_API_URL_2024 + "/2024-precapacitacion/-1/-1/-1",
    //   method: "GET",
    //   shouldCache: true,
    // }).then((data) => {
    //   const correctores = mapPieData(data.corrector, mappers.correctores);
    //   const supervisores = mapPieData(data.supervisor, mappers.supervisores);
    //   setChartData({correctores, supervisores});
    // });
    const data = {
      corrector: {
        no_iniciada: 0,
        en_unidad_1: 0,
        en_unidad_2: 0,
        en_unidad_3: 0,
        en_unidad_4: 0,
        terminada: 0,
        total_seleccionados: 0,
      },
      supervisor: {
        no_iniciada: 0,
        en_unidad_1: 0,
        en_unidad_2: 0,
        en_unidad_3: 0,
        en_unidad_4: 0,
        terminada: 0,
        total_seleccionados: 0,
      },
    };
    const correctores = mapPieData(data.corrector, mappers.correctores);
    const supervisores = mapPieData(data.supervisor, mappers.supervisores);
    setChartData({ correctores, supervisores });
  }, [customFetch]);

  return { selectedFilter, handleFilter, chartData };
}

export default useTabPrecapacitacion;
