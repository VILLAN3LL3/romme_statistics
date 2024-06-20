export function calculatePercentage(num1: number, num2: number): number {
  if (num2 === 0) {
    throw new Error("Cannot divide by zero");
  }
  return roundTo2Digits((num1 / num2) * 100);
}

export function roundTo2Digits(num: number): number {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}
