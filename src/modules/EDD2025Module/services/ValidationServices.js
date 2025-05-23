import { BASE_API_URL_2025 } from "../data/BASE_API_URL";

export async function getGeneralValidation(
  token,
  filters = {
    convocatoria: { value: "" },
    estado: { value: "" },
    cambio: { value: "" },
    suspension: { value: "" },
  }
) {
  const body = new FormData();
  body.append("convocatoria", filters.convocatoria.value);
  body.append("estado", filters.estado.value);
  body.append("nivel", filters.cambio.value);
  body.append("suspension", filters.suspension.value);
  const URL =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-validacion-general";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      t: token,
    },
    body: body,
  });

  const data = await response.json();
  return data;
}

export async function getValidationParticipationStatus(token) {
  const URL =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-validacion?endpoint=estado-participacion";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      t: token,
    },
  });

  const data = await response.json();
  return data;
}

export async function getValidacionVistaDependencia(token) {
  const URL =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-validacion?endpoint=vista-dependencia";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      t: token,
    },
  });

  const data = await response.json();
  return data;
}

export async function getValidacionCambioNivelVistaDependencia(token) {
  const URL =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-validacion?endpoint=cambio-nivel-vista-dependencia";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      t: token,
    },
  });

  const data = await response.json();
  return data;
}

export async function getValidacionSolicitaSuspenderVistaDependencia(token) {
  const URL =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-validacion?endpoint=solicita-suspender-vista-dependencia";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      t: token,
    },
  });

  const data = await response.json();
  return data;
}

export async function getValidacionVistaRegion(token) {
  const URL =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-validacion?endpoint=vista-region";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      t: token,
    },
  });

  const data = await response.json();
  return data;
}

export async function getValidacionCambioNivelVistaRegion(token) {
  const URL =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-validacion?endpoint=cambio-nivel-vista-region";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      t: token,
    },
  });

  const data = await response.json();
  return data;
}

export async function getValidacionSolicitaSuspenderVistaRegion(token) {
  const URL =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-validacion?endpoint=solicita-suspender-vista-region";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      t: token,
    },
  });

  const data = await response.json();
  return data;
}

export async function getValidacionVistaConvocatoria(token) {
  const URL =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-validacion?endpoint=vista-convocatoria";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      t: token,
    },
  });

  const data = await response.json();
  return data;
}

export async function getValidacionCambioNivelVistaConvocatoria(token) {
  const URL =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-validacion?endpoint=cambio-nivel-vista-convocatoria";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      t: token,
    },
  });

  const data = await response.json();
  return data;
}

export async function getValidacionSolicitaSuspenderVistaConvocatoria(token) {
  const URL =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-validacion?endpoint=solicita-suspender-vista-convocatoria";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      t: token,
    },
  });

  const data = await response.json();
  return data;
}

export async function getExcelDocente(finishLoading) {
  const url =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-validacion-descarga-excel";
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
  a.download = "validacion-docentes.csv";
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
    "/2025-validacion-descarga-excel-sostenedor";
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
  a.download = "validacion-sostenedores.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();

  window.URL.revokeObjectURL(urlBlob);
  finishLoading();
}
