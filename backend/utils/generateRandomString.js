function generateRandomString() {
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const specialChars = '!@#$%^&*(),.?":{}|<>';

  const randomLower = lowerCase[Math.floor(Math.random() * lowerCase.length)];
  const randomUpper = upperCase[Math.floor(Math.random() * upperCase.length)];
  const randomDigit = digits[Math.floor(Math.random() * digits.length)];
  const randomSpecial =
    specialChars[Math.floor(Math.random() * specialChars.length)];

  // Tạo phần còn lại của chuỗi
  const allChars = lowerCase + upperCase + digits + specialChars;
  const length = Math.floor(Math.random() * (24 - 6 + 1)) + 6; // Độ dài ngẫu nhiên từ 6 đến 24
  let randomString = '';

  for (let i = 0; i < length - 4; i++) {
    randomString += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Kết hợp các ký tự đã chọn vào chuỗi
  randomString += randomLower + randomUpper + randomDigit + randomSpecial;

  // Trộn chuỗi để đảm bảo ngẫu nhiên
  randomString = randomString
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');

  return randomString;
}

module.exports = {
  generateRandomString,
};
