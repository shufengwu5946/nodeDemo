new Promise((resolve, reject) => {
  resolve("1111111");
}).then(
  value => {
    console.log(value);
  },
  error => {
    console.log(error);
  }
);

console.log("after Promise");
