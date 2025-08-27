const numFor = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});
export function numberFormatter(num, fallback = 0) {
  if (typeof num === "string" && num.includes("%")) {
    return num;
  }
  if (num == null || num === "" || isNaN(num)) {
    return fallback;
  }
  return numFor.format(num);
}

export function numberParser(str) {
  if (typeof str === "number") {
    return str;
  }

  return parseFloat(str.replace(/\./g, "").replace(",", "."));
}
