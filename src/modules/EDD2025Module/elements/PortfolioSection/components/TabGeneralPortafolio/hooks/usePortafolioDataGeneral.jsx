// import { useEffect, useState } from "react";
// import { useCustomFetch } from "../../../../../../../hooks/useCustomFetch";

// export const usePortafolioDataGeneral = ({ route, keyPath, dataMapper, filtros = {}, rawData = null }) => {
//   const [data, setData] = useState(null);
//   const customFetch = useCustomFetch();

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         if (rawData) {
//           setData(rawData);
//           return;
//         }

//         if (!filtros || Object.keys(filtros).length === 0) return;

//         const body = {};
//         Object.entries(filtros).forEach(([key, value]) => {
//           body[key] = value;
//         });

//         const response = await customFetch({
//           route,
//           options: {
//             method: "POST",
//             body,
//           },
//           shouldCache: false,
//           hasLoadPanel: true,
//         });

//         const nested = keyPath
//           .split(".")
//           .reduce((obj, key) => obj?.[key], response);

//         const mapped = dataMapper(nested);
//         setData(mapped);
//       } catch (error) {
//         // Ya se maneja en customFetch
//       }
//     }

//     fetchData();
//   }, [route, keyPath, dataMapper, JSON.stringify(filtros), rawData]);

//   return { data };
// };

import { useEffect, useState } from "react";
import axios from "../../../../../services/axiosInstance";

export const usePortafolioDataGeneral = (filtros) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = "http://api-docentemas-dev.3htp.cloud:8095/back/public/api2025";

  useEffect(() => {
    if (!filtros || Object.keys(filtros).length === 0) return;

    setLoading(true);
    setError(null);

    const body = new FormData();
    Object.entries(filtros).forEach(([key, value]) => {
      body.append(key, value);
    });

    axios
      .post(`${baseURL}/2025-portafolio-tab-general`, body)
      .then((res) => {
        setData(res.data);
        console.log("Datos portafolio:", res.data);
      })
      .catch((err) => {
        console.error("Error al obtener datos de portafolio:", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [JSON.stringify(filtros)]);

  return { data, loading, error };
};
