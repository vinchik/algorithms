// Given a smaller string "small" and a bigger string "big", design an algorithm to find all permutations
// of the shorter string within the longer one. Print the location of each permutation.
interface MapInterface { [key: string]: number; }

function findSubstringWithPermutations(small: string, big: string): string[] {
  const smallMap: MapInterface = {};
  const result = [];

  for (let char of small) {
    smallMap[char] = smallMap[char] ? smallMap[char] + 1 : 1;
  }

  for (let i = 0; i < big.length; i++) {
    const substr: string = big.substring(i, i+small.length);

    const substrMap: MapInterface = { ...smallMap };

    for (let char of substr) {
      if (substrMap[char] === 1) {
        delete substrMap[char];
      } else {
        substrMap[char] --;
      }
    }

    if (!Object.keys(substrMap).length) {
      result.push(substr);
    }
  }

  return result;
}

const result = findSubstringWithPermutations('abbc', 'cbabadcbbabbcbabaabccbabc');

console.log(result);