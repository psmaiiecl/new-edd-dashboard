import { useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { buildCdCSummaryData } from "../../../utils/utils";

function useTabCuotas() {
  const customFetch = useCustomFetch();
  const [tableData, setTableData] = useState({
    resumen: null,
    filtrado: null,
  });
  const [selectorCentros, setSelectorCentros] = useState([]);
  const [filters, setFilters] = useState({
    centro: null,
    modulo: null,
  });

  const handleFilter = (key, option) => {
    setFilters((prev) => ({
      ...prev,
      [key]: option,
    }));
  };

  useEffect(() => {
    customFetch({
      route: BASE_API_URL_2025 + "/2025-cuotasCdcResumen",
      shouldCache: true,
      method: "GET",
    }).then((data) => {
      const { tableData, centrosFiltros } = buildCdCSummaryData(data);
      setTableData((prevData) => ({
        ...prevData,
        resumen: tableData,
      }));
      setSelectorCentros(centrosFiltros);
    });
  }, [customFetch]);

  useEffect(() => {
    if (!filters.centro) return;
    customFetch({
      route:
        BASE_API_URL_2025 +
        `/2025-cuotas-cdc?centro=${filters.centro.value}${
          filters.modulo?.value ? `&modulo=${filters.modulo.value}` : ""
        }`,
      shouldCache: true,
      method: "GET",
    }).then((data) => {
      console.log("data", data);
      
      setTableData((prevData) => ({
        ...prevData,
        filtrado: data,
      }));
    });
  }, [filters, customFetch]);

  return { tableData, selectorCentros, filters, handleFilter };
}

export default useTabCuotas;
