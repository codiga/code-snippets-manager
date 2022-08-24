export function formatNumber(num: number) {
  if (Math.abs(num) < 1000) return num;
  return `${Math.sign(num) * (Math.round(Math.abs(num) / 100) / 10)}k`;
}
