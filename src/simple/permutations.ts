// Design an algorithm to print all permutations of a string. For simplicity, assume all characters are unique.

function permutate(str: string): string[] {
  const res: string[] = [str[0]];

  for (let i = 1; i < str.length; i++) {
    const newRes = [];
    const char: string = str[i];

    while (res.length) {
      const substr: string = res.pop();

      for (let j = 0; j <= substr.length; j++) {
        const firstHalf: string = substr.substring(0, j);
        const secondHalf: string = substr.substring(j);
        newRes.push(firstHalf + char + secondHalf);
      }
    }

    res.push(...newRes);
  }

  return res;
}

const res = permutate('abcd');
console.log('Permutations of "abcd" string:');
console.log(res);
console.log('Number of permutations (4!): ', res.length);