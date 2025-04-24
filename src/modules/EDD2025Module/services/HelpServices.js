import { BASE_API_URL_2025 } from "../data/BASE_API_URL";

export async function getZohoCalls(token) {
  const URL =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-llamadas-zoho";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      t: token,
    },
  });

  const data = await response.json();
  return data;
}
