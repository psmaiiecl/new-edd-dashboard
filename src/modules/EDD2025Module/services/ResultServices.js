import { BASE_API_URL_2025 } from "../data/BASE_API_URL";

export async function getResultData(token) {
  const url =
    import.meta.env.VITE_BASE_URL +
    BASE_API_URL_2025 +
    "/2025-informes-resultados";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      t: token,
    },
  });

  const data = await res.json();
  return data;
}

// export async function getExcelIndividuales(finishLoading) {
//   const url =
//     import.meta.env.VITE_BASE_URL +
//     BASE_API_URL_2025 +
//     "/2025-descarga-individuales-excel";
//   const res = await fetch(url, {
//     method: "POST",
//     headers: {
//       t: localStorage.getItem("token"),
//       "Cross-Domain": "true",
//     },
//   });

//   if (!res.ok) {
//     throw new Error("Error al descargar el archivo");
//   }

//   const blob = await res.blob();
//   const urlBlob = window.URL.createObjectURL(blob);

//   const a = document.createElement("a");
//   a.href = urlBlob;
//   a.download = "informe_individuales.csv";
//   document.body.appendChild(a);
//   a.click();
//   a.remove();

//   window.URL.revokeObjectURL(urlBlob);
//   finishLoading();
// }

// export async function  getExcelDirector(finishLoading) {
//   const url =
//     import.meta.env.VITE_BASE_URL +
//     BASE_API_URL_2025 +
//     "/2025-informe-director-excel";
//   const res = await fetch(url, {
//     method: "POST",
//     headers: {
//       t: localStorage.getItem("token"),
//       "Cross-Domain": "true",
//     },
//   });
//   if (!res.ok) {
//     throw new Error("Error al descargar el archivo");
//   }

//   const blob = await res.blob();
//   const urlBlob = window.URL.createObjectURL(blob);

//   const a = document.createElement("a");
//   a.href = urlBlob;
//   a.download = "informes-director.csv";
//   document.body.appendChild(a);
//   a.click();
//   a.remove();

//   window.URL.revokeObjectURL(urlBlob);
//   finishLoading();
// }
// export async function getExcelSostenedor(finishLoading) {
//   const url =
//     import.meta.env.VITE_BASE_URL +
//     BASE_API_URL_2025 +
//     "/2025-informe-sostenedor-excel";
//   const res = await fetch(url, {
//     method: "POST",
//     headers: {
//       t: localStorage.getItem("token"),
//       "Cross-Domain": "true",
//     },
//   });
//   if (!res.ok) {
//     throw new Error("Error al descargar el archivo");
//   }

//   const blob = await res.blob();
//   const urlBlob = window.URL.createObjectURL(blob);

//   const a = document.createElement("a");
//   a.href = urlBlob;
//   a.download = "informes-sostenedores.csv";
//   document.body.appendChild(a);
//   a.click();
//   a.remove();

//   window.URL.revokeObjectURL(urlBlob);
//   finishLoading();
// }