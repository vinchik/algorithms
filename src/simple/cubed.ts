// Find all integer solutions for a,b,c,d that satisfy the equation a^3 + b^3 = c^3 + d^3 in range 1..range

function calc(range: number): number[][][] {
  const power: number = 3;
  const map = {};

  for (let i = 1; i <= range; i++) {
    for (let j = i; j <= range; j++) {
      const sumOfCubes: number = Math.pow(i, power) + Math.pow(j, power);
      map[sumOfCubes] = map[sumOfCubes]
        ? [...map[sumOfCubes], [i, j]]
        : [[i, j]];
    }
  }

  const entries: any = Object.entries(map);

  console.log(entries);

  return entries
    .filter(([value, pairs]) => pairs.length > 1)
    .reduce((acc, item) => {
      acc[item[0]] = item[1];
      return acc;
    }, {});
}

const res100 = calc(100);

console.log('result for 100: ', res100);