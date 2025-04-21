const numFor = new Intl.NumberFormat("de-DE");
export function NF(num) {
  return numFor.format(num);
}
