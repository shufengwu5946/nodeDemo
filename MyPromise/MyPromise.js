const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

function MyPromise(fn) {
  console.log(1);

  const that = this;
  //   初始状态为pending
  that.state = PENDING;
  that.value = null;
  that.resolvedCallbacks = [];
  that.rejectedCallbacks = [];

  function resolve(value) {
    console.log(2);

    if (that.state === PENDING) {
      console.log(3);

      that.state = RESOLVED;
      that.value = value;
      that.resolvedCallbacks.forEach(cb => cb(that.value));
    }
  }

  function reject(value) {
    console.log(4);
    if (that.state === PENDING) {
      console.log(5);

      that.state = REJECTED;
      that.value = value;
      that.rejectedCallbacks.forEach(cb => cb(that.value));
    }
  }

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = (onResolved, onRejected) => {
  const that = this;
  console.log(that);

  onResolved = typeof onResolved === "function" ? onResolved : v => v;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : r => {
          throw r;
        };
  if (that.state === PENDING) {
    console.log(6);
    that.resolvedCallbacks.push(onResolved);
    that.rejectedCallbacks.push(onRejected);
  }
  if (that.state === RESOLVED) {
    console.log(7);
    onResolved(that.value);
  }
  if (that.state === REJECTED) {
    console.log(8);
    onRejected(that.value);
  }
};

module.exports = MyPromise;
