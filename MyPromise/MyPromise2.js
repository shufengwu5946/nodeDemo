const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

class MyPromise {

  constructor(fn){

  }

  //   初始状态为pending
  this.state = PENDING;
  this.value = null;
  this.resolvedCallbacks = [];
  this.rejectedCallbacks = [];

  function resolve(value) {
    if (this.state === PENDING) {
      this.state = RESOLVED;
      this.value = value;
      this.resolvedCallbacks.forEach(cb => cb(this.value));
    }
  }

  function reject(value) {
    if (this.state === PENDING) {
      this.state = REJECTED;
      this.value = value;
      this.rejectedCallbacks.forEach(cb => cb(this.value));
    }
  }

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function(onResolved, onRejected) {
  const that = this;

  onResolved = typeof onResolved === "function" ? onResolved : v => v;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : r => {
          throw r;
        };
  if (that.state === PENDING) {
    that.resolvedCallbacks.push(onResolved);
    that.rejectedCallbacks.push(onRejected);
  }
  if (that.state === RESOLVED) {
    onResolved(that.value);
  }
  if (that.state === REJECTED) {
    onRejected(that.value);
  }
};

module.exports = MyPromise;
