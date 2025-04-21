export async function getCorrectionData(token) {
  const URL =
    import.meta.env.VITE_BASE_URL +
    "/public/api2024/2024-correccion_portafolios/resultados/distribucion";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      t: token,
    },
  });

  const data = await response.json();
  return data;
}
