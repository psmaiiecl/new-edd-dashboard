import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { getCD, getDif24vs23, getModuloIndices } from "../../../utils/utils";

export function useTab() {
  const customFetch = useCustomFetch();
  const [selectedFilter, setSelectedFilter] = useState({
    grupo: null,
    especialidad: null,
  });
  const [correccionTable, setCorreccionTable] = useState(null);

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
    });
  };

  useEffect(() => {
    customFetch({
      route:
        BASE_API_URL_2025 +
        `/2025-cpf-distribucion-indicadores?grupo=${
          selectedFilter?.grupo?.value ?? ""
        }&especialidad=${selectedFilter?.especialidad?.value ?? ""}`,
      method: "GET",
      shouldCache: true,
    }).then((data) => {
      const modulos = [
        { key: "m1", title: "M1", color: "#c7d8fc" },
        {
          key: "m2",
          title: "M2",
          color: "#fdedcc",
          // note: "Este módulo se compara con M2/2022",
        },
        { key: "m3", title: "M3", color: "#d8e9d3" },
      ];
      const moduloIndices = Object.fromEntries(
        modulos.map((m) => [m.key, getModuloIndices(data, m.key)])
      );
      const cd = {
        2024: {},
        2025: {},
      };
      const dif = {};
      modulos.forEach((m) => {
        const idx = moduloIndices[m.key];
        cd["2024"][m.key] = getCD(data, "2024", m.key, idx);
        cd["2025"][m.key] = getCD(data, "2025", m.key, idx);
        dif[m.key] = getDif24vs23(cd["2025"][m.key], cd["2024"][m.key], idx);
      });

      setCorreccionTable({ modulos, moduloIndices, cd, dif, dataset: data });
    });
  }, [selectedFilter, customFetch]);

  return {
    selectedFilter,
    handleFilter,
    correccionTable,
    cleanFilters,
  };
}
