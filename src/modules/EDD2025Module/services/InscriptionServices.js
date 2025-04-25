import { BASE_API_URL_2025 } from "../data/BASE_API_URL";

export async function getInscriptionData(token) {
  const URL =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-datos-inscripcion";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      t: token,
    },
  });

  const data = await response.json();
  return data;
}

export async function getExcelDocente() {
  const url =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-inscripcion-descarga-excel";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      t: localStorage.getItem("token"),
      "Cross-Domain": "true",
    },
  });

  if (!res.ok) {
    throw new Error("Error al descargar el archivo");
  }

  const blob = await res.blob();
  const urlBlob = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = urlBlob;
  a.download = "inscripcion-docentes.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();

  window.URL.revokeObjectURL(urlBlob);
}

export async function getExcelSostenedor() {
  const url =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-inscripcion-sostenedor-descarga-excel";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      t: localStorage.getItem("token"),
      "Cross-Domain": "true",
    },
  });
  if (!res.ok) {
    throw new Error("Error al descargar el archivo");
  }

  const blob = await res.blob();
  const urlBlob = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = urlBlob;
  a.download = "inscripcion-sostenedores.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();

  window.URL.revokeObjectURL(urlBlob);
}