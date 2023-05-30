export const genInitialNumSet = () => {
  const nums = [];
  for (let i = 1; i <= 90; i++) {
    nums.push(i);
  }

  return nums;
};

export const getNextRandomNumber = (maximum: number) => {
  return Math.floor(Math.random() * maximum);
};
