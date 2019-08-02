/**
 * 增加链式调用then
 */
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";
class MyPromise {
  constructor(fn) {
    this.state = PENDING;
    this.resolveValue = null;
    this.rejectValue = null;
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];
    this.resolve = value => {
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = RESOLVED;
          this.resolveValue = value;
          this.resolveCallbacks.forEach(cb => cb(this.resolveValue));
        }
      }, 0);
    };
    this.reject = value => {
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = REJECTED;
          this.rejectValue = value;
          this.rejectCallbacks.forEach(cb => cb(this.rejectValue));
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
    let promise;
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
    } else if (this.state === RESOLVED) {
      onResolved(this.resolve);
    } else if (this.state === REJECTED) {
      onRejected(this.rejectValue);
    }
  }
}

module.exports = MyPromise;
