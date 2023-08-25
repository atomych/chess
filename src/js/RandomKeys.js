const getKey = () => {
  const SYMBOLS =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

  let result = "";

  for (let i = 0; i < 10; i++) {
    result += SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  }

  return result;
};

export { getKey };
