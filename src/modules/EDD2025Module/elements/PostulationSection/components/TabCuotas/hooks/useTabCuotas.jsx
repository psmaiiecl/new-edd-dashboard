import { useContext, useEffect, useState } from "react";
import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";
import { BASE_API_URL_2025 } from "../../../../../data/BASE_API_URL";
import { buildCdCSummaryData } from "../../../utils/utils";
import { AuthContext } from "../../../../../../../context/AuthContext";

function useTabCuotas() {
  const customFetch = useCustomFetch();
  const { getPayload } = useContext(AuthContext);  
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
    const centro = getPayload()?.centro ?? null;
    const cond = centro ? `?centro=${centro}` : "";
    customFetch({
      route: BASE_API_URL_2025 + "/2025-cuotasCdcResumen" + cond,
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
  }, [customFetch, getPayload]);

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
      setTableData((prevData) => ({
        ...prevData,
        filtrado: data,
      }));
    });
  }, [filters, customFetch]);

  return { tableData, selectorCentros, filters, handleFilter };
}

export default useTabCuotas;
