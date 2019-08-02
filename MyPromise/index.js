const MyPromise = require("./MyPromise");
new MyPromise((resolve, reject) => {
  resolve(
    555
    // new MyPromise((resolve, reject) => {
    //   resolve(555);
    // })
  );
})
  .then()
  .then(value => {
    console.log(value);
    return new MyPromise((resolve, reject) => {
      resolve(666);
    });
  })
  .then(value => {
    console.log(value);
  });
console.log("after MyPromise");
