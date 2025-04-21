import { BASE_API_URL_2024 } from "../data/BASE_API_URL";

export async function getCorrectionData(token) {
  const URL =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2024 +
    "/2024-correccion_portafolios/resultados/distribucion";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      t: token,
    },
  });

  const data = await response.json();
  return data;
}
