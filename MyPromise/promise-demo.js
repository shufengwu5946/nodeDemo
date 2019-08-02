// new Promise((resolve, reject) => {
//   resolve(
//     new Promise((resolve, reject) => {
//       resolve(
//         new Promise((resolve, reject) => {
//           resolve(666);
//         })
//       );
//     })
//   );
// }).then(
//   value => {
//     console.log(value);
//   },
//   error => {
//     console.log(error);
//   }
// );

// new Promise((resolve, reject) => {
//   // setTimeout(() => {
//   resolve(555);
//   // }, 0);
// }).then(value => {
//   console.log(value);
//   return 666;
// })
// .then(value => {
//   console.log(value);
// });

const p1 = new Promise((resolve, reject) => {
  resolve(1);
}).then(value => {
  console.log(1);
  return p1;
});

console.log("after Promise");
