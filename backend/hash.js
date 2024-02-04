function hashFunction(input) {
  if (input === undefined || input === null) {
    throw new Error("Input cannot be undefined or null");
  }

  let hash = "";
  const chars = input.split("");

  for (let i = 0; i < chars.length; i++) {
    const asciiValue = chars[i].charCodeAt(0);
    const newHash = ((asciiValue * 31) % Math.pow(2, 31)) - 1;
    hash = hash ^ newHash;
  }

  return hash.toString(16);
}

module.exports = hashFunction;
