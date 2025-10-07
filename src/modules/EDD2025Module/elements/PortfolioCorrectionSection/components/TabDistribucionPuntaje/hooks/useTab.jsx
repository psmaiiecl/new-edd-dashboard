import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2024 } from "../../../../../data/BASE_API_URL";
import { getCD, getDif24vs23, getModuloIndices } from "../../../utils/utils";

export function useTab() {
  const customFetch = useCustomFetch();
  const [selectedFilter, setSelectedFilter] = useState({
    grupo_trabajo: "",
    especialidad: "",
  });
  const [correccionTable, setCorreccionTable] = useState(null);

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
        "/2024-correccion_portafolios/monitoreo/calibracion_indicadores",
      formData: selectedFilter,
      shouldCache: true,
    }).then((data) => {
      const modulos = [
        { key: "m1", title: "M1" },
        { key: "m2", title: "M2*", note: "Este módulo se compara con M2/2022" },
        { key: "m3", title: "M3" },
      ];
      const moduloIndices = Object.fromEntries(
        modulos.map((m) => [m.key, getModuloIndices(data, m.key)])
      );
      const cd = {
        2023: {},
        2024: {},
      };
      const dif = {};
      modulos.forEach((m) => {
        const idx = moduloIndices[m.key];
        cd["2023"][m.key] = getCD(data, "2023", m.key, idx);
        cd["2024"][m.key] = getCD(data, "2024", m.key, idx);
        dif[m.key] = getDif24vs23(cd["2024"][m.key], cd["2023"][m.key], idx);
      });
      console.log("tabledasta", {
        modulos,
        moduloIndices,
        cd,
        dif,
        dataset: data,
      });

      setCorreccionTable({ modulos, moduloIndices, cd, dif, dataset: data });
    });
  }, [selectedFilter, customFetch]);

  return {
    selectedFilter,
    handleFilter,
    correccionTable,
  };
}
