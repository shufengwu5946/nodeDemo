/**
 * 增加链式调用then
 */
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";
class MyPromise {
  constructor(fn) {
    this.state = PENDING;
    this.value = null;
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];
    this.resolve = value => {
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = RESOLVED;
          this.value = value;
          this.resolveCallbacks.forEach(cb => cb(this.value));
        }
      }, 0);
    };
    this.reject = value => {
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = REJECTED;
          this.value = value;
          this.rejectCallbacks.forEach(cb => cb(this.value));
        }
      }, 0);
    };
    try {
      fn(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  then(onResolved, onRejected) {
    onResolved = typeof onResolved === "function" ? onResolved : v => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : v => {
            throw v;
          };
    if (this.state === PENDING) {
      this.resolveCallbacks.push(onResolved);
      this.rejectCallbacks.push(onRejected);
    }
    if (this.state === RESOLVED) {
      onResolved(this.value);
    }

    if (this.state === REJECTED) {
      onRejected(this.value);
    }
  }
}

module.exports = MyPromise;
