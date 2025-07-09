
const numFor = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});
export function numberFormatter(num) {
  return numFor.format(num);
}
