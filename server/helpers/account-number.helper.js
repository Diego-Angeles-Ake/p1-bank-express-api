// 6 digit account number
const genAccNum = () => {
  const accountNumber = Math.floor(100000 + Math.random() * 900000);
  return accountNumber;
};

module.exports = { genAccNum };
