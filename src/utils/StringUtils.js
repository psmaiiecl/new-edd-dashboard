export function extractCTGInfo(str) {
  if (typeof str !== "string") return { region: "", nombre: "" };

  const [region = "", ...rest] = str.split("-");
  const nombreRaw = rest.join("-").trim();

  const nombre = nombreRaw
    .replace(/\bEXT\b/g, "")
    .replace(/\bINT\b/g, "")
    .trim();

  return {
    region: region.trim(),
    nombre: nombre,
  };
}
