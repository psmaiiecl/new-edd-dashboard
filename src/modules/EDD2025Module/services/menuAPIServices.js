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

export async function getAgendamientoData(token) {
  const URL =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-agendamiento-grabaciones-tab-general";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      t: token,
    },
  });

  const data = await response.json();
  return data;
}

export async function getGrabacionesData(token) {
  const URL =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-grabaciones-tab-general";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      t: token,
    },
  });

  const data = await response.json();
  return data;
}

export async function getProcesamientoData(token) {
  const URL =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-procesamiento-tab-general";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      t: token,
    },
  });

  const data = await response.json();
  return data;
}

