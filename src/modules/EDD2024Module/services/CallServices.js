import { BASE_API_URL_2024 } from "../data/BASE_API_URL";

export async function getCallData(token) {
  const URL =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2024 +
    "/datos-json?etiqueta=2024-llamadas-resumen-reporte";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      t: token,
    },
  });

  const data = await response.json();
  return data;
}
