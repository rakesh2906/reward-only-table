import namor from "namor";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};
const generateRewards = amount => {
  if (amount < 50) return 0;
  if (amount >= 50 && amount <= 100) return amount - 50;
  if (amount > 100) {
    const rewards2x = (amount - 100) * 2;
    const rewards1x = generateRewards(100);
    return rewards1x + rewards2x;
  }
  return amount;
};
const newPerson = () => {
  const amount = Math.floor(Math.random() * 500);
  return {
    firstName: namor.generate({ words: 1, saltLength: 0, subset: "manly" }),
    lastName: namor.generate({ words: 1, saltLength: 0, subset: "manly" }),
    amount: amount.toFixed(2),
    rewards: generateRewards(amount)
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      };
    });
  };

  return makeDataLevel();
}
