const numFor = new Intl.NumberFormat("de-DE");
export function numberFormatter(num) {
  return numFor.format(num);
}
