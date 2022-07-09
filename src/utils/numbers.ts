export function roundNumber(input: string | number, decimals: number = 4) {
  if (typeof input === "string") input = Number(input);

  return Math.round(input * 10 ** decimals) / 10 ** decimals;
}
