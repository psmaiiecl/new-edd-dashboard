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

export async function getFilteredInscriptionData(token, dependency) {
  const url =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-datos-inscripcion?dependencia=" +
    dependency;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      t: token,
    },
  });
  const data = await res.json();
  return data;
}

export async function getExcelDocente(finishLoading) {
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
  finishLoading();
}

export async function getExcelSostenedor(finishLoading) {
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
  finishLoading();
}

export async function getInscriptionDependency(token) {
  const url =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-inscripcion-dependencia";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      t: token,
    },
  });
  const data = await res.json();
  return data;
}

export async function getInscriptionConvocatoria(token) {
  const url =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-inscripcion-convocatoria";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      t: token,
    },
  });
  const data = await res.json();
  return data;
}

export async function getInscriptionRegion(token) {
  const url =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-inscripcion-region";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      t: token,
    },
  });
  const data = await res.json();
  return data;
}
