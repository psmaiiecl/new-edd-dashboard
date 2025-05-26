import { BASE_API_URL_2025 } from "../../../data/BASE_API_URL";

export async function getInscripcionRegion() {
  const url =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-inscripcion-region";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      t: localStorage.getItem("token"),
      "Cross-Domain": "true",
    },
  });
  const data = await res.json();
  return data;
}
