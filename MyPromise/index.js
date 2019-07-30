const MyPromise = require("./MyPromise3");
new MyPromise((resolve, reject) => {
  // setTimeout(() => {
  resolve("1111111");
  // }, 0);
}).then(
  value => {
    console.log(value);
  },
  error => {
    console.log(error);
  }
);
console.log("after MyPromise");
