export async function getRecordingData(token) {
  const URL =
    import.meta.env.VITE_BASE_URL +
    "/public/api2024/2024-grabaciones-general-docentes";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      t: token,
    },
  });

  const data = await response.json();
  return data;
}
