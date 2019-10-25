// Given a string, write a function to check if it is a permutation of a palindrome.

function palindromePermutation(string: string) {
  const map = {};
  const res = [];
  let unpairedUsed = false;

  const dividedWords = string.split(' ');

  for (let char of dividedWords.join('')) {
    const lowerCased = char.toLowerCase();
    map[lowerCased] = map[lowerCased] ? map[lowerCased] + 1 : 1;
  }

  for (let key of Object.keys(map)) {
    if (map[key] % 2) {
      if (unpairedUsed) {
        return false;
      }

      unpairedUsed = true;

      const middle = res.length / 2;
      res.splice(middle, 0, key.repeat(map[key]));

    } else {
      while (map[key]) {
        res.push(key);
        res.unshift(key);
        map[key]-=2;
      }
    }
  }

  return { res: true, variant: res.join('') };
}

const result = palindromePermutation('Tact Coa');

console.log('result: ', result);