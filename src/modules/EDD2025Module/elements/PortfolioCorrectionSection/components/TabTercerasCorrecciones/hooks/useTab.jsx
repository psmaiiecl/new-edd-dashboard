import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2024 } from "../../../../../data/BASE_API_URL";

export function useTab() {
  const customFetch = useCustomFetch();
  const [selectedFilter, setSelectedFilter] = useState({
    grupo_trabajo: "",
    especialidad: "",
    tipo_portafolio: "",
  });
  const [correccionTable, setCorreccionTable] = useState([]);

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
        "/2024-correccion_portafolios/monitoreo/calibracion_terceras",
      formData: selectedFilter,
      shouldCache: true,
    }).then((data) => {
        setCorreccionTable(data?.datos || []);
    });
  }, [selectedFilter, customFetch]);

  return {
    selectedFilter,
    handleFilter,
    correccionTable
  };
}
