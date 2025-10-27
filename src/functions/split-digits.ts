// @example splitDigits(1234) = [1, 2, 3, 4]
export function splitDigits(n: number, digitsCount = 2): number[] {
  return String(n)
    .padStart(digitsCount, '0')
    .split('')
    .map(n => parseInt(n, 10));
}