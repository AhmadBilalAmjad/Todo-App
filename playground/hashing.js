// const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");

const data = {
  id: 10
};

const token = jwt.sign(data, "123xyz");
console.log(token);

const decoded = jwt.verify(token, "123xyz");
console.log(decoded);
// const value = "Value";
// console.log(`Value: ${value}`);

// const hashedValue = SHA256(value).toString();
// console.log(`Hashed Value: ${hashedValue}`);

// const data = {
//   id: 4
// };

// const token = {
//   data,
//   hash: SHA256(data + "secret").toString()
// };

// // token.data.id = 5;
// // token.hash = SHA256(token.data).toString();

// const resultHash = SHA256(token.data + "secret").toString();

// if (token.hash === resultHash) {
//   console.log("Data was not changed");
// } else {
//   console.log("Data was changed");
// }
