import { useEffect, useState, useContext } from "react";
import axios from "../../../../../services/axiosInstance";
import { AuthContext } from "../../../../../../../context/AuthContext";

export const usePortafolioFetch = ({ keyPath = null, dataMapper = null, filtros = {}, rawData = null }) => {
  const [data, setData] = useState(null);
  const { getToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (rawData) {
          setData(rawData);
          return;
        }

        if (!filtros || Object.keys(filtros).length === 0) return;

        const token = await getToken();

        const formData = new FormData();
        Object.entries(filtros).forEach(([key, value]) => {
          formData.append(key, value);
        });

        //CORREGIDO EL POST DEL AXIOS
        const response = await axios.post("/back/public/api2025/2025-portafolio-tab-general", formData, {
          headers: { t: token },
        });

        const responseData = response?.data;
		
		//console.log(responseData)
		
        if (!responseData) {
          console.error("❌ Respuesta vacía:", response);
          return;
        }

        if (keyPath && dataMapper) {
          const nestedData = keyPath
            .split(".")
            .reduce((obj, key) => obj?.[key], responseData);

          if (!nestedData) {
            console.warn(`⚠️ No se encontró keyPath: ${keyPath}`);
          }

          setData(dataMapper(nestedData));
        } 
		else {
          setData(responseData);
        }
      } catch (error) {
        console.error("❌ Error en fetch portafolio:", error);
      }
    };

    fetchData();
  }, [keyPath, dataMapper, JSON.stringify(filtros), rawData]);

  return { data };
};
