import { BASE_API_URL_2025 } from "../data/BASE_API_URL";

export async function getPortafolioData(token) {
  const url =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-portafolio-avance-portafolio";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      t: token,
    },
  });
  const data = await res.json();
  return data;
}
