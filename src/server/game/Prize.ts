export function Prize(round: number) {
  const prize = [
    1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500, 1000,
  ];
  if (round < 0 || round > prize.length) throw new Error("Invalid round");

  return prize[round] * 1000;
}
