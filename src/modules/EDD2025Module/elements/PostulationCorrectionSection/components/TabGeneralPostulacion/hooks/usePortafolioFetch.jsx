import { useEffect, useState, useContext } from "react";
import axios from "../../../../../services/axiosInstance";
import { AuthContext } from "../../../../../../../context/AuthContext";

export const usePostulacionFetch = ({
  keyPath = null,
  dataMapper = null,
  filtros = {},
  rawData = null,
}) => {
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
        // const response = await axios.post(
        //   "/back/public/api2025/2025-portafolio-tab-general",
        //   formData,
        //   {
        //     headers: { t: token },
        //   }
        // );

        // const responseData = response?.data;
        const responseData = null;

        //console.log(responseData)

        // if (!responseData) {
        //   console.error("❌ Respuesta vacía:", response);
        //   return;
        // }

        //if (keyPath && dataMapper) {
        if (keyPath && dataMapper &&responseData) {
          const nestedData = keyPath
            .split(".")
            .reduce((obj, key) => obj?.[key], responseData);

          if (!nestedData) {
            console.warn(`⚠️ No se encontró keyPath: ${keyPath}`);
          }

          setData(dataMapper(nestedData));
        } else {
          setData(responseData);
        }
      } catch (error) {
        console.error("❌ Error en fetch portafolio:", error);
      }
    };

    fetchData();
  //}, [keyPath, dataMapper, JSON.stringify(filtros), rawData]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  return { data };
};
