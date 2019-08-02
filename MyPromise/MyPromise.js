/**
 * 最简
 */
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

function MyPromise(fn) {
  const that = this;
  //   初始状态为pending
  that.state = PENDING;
  that.value = null;
  that.resolvedCallbacks = [];
  that.rejectedCallbacks = [];

  function resolve(value) {
    // if (value instanceof MyPromise) {
    //   return value.then(resolve, reject);
    // }
    setTimeout(() => {
      if (that.state === PENDING) {
        console.log("RESOLVED");

        that.state = RESOLVED;
        that.value = value;
        that.resolvedCallbacks.forEach(cb => cb(that.value));
      }
    }, 0);
  }

  function reject(value) {
    setTimeout(() => {
      if (that.state === PENDING) {
        that.state = REJECTED;
        that.value = value;
        that.rejectedCallbacks.forEach(cb => cb(that.value));
      }
    }, 0);
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
    console.log("that.state === PENDING");
    return (promise2 = new MyPromise((resolve, reject) => {
      that.resolvedCallbacks.push(() => {
        try {
          console.log("that.value " + that.value);

          const x = onResolved(that.value);
          console.log("that.resolvedCallbacks.push");
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });

      that.rejectedCallbacks.push(() => {
        try {
          const x = onRejected(that.value);
          console.log("that.rejectedCallbacks.push");
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });
    }));
  }

  if (that.state === RESOLVED) {
    console.log("that.state === RESOLVED");
    return (promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onResolved(that.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    }));
  }
  if (that.state === REJECTED) {
    onRejected(that.value);
  }
};

function resolutionProcedure(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("Error"));
  }

  if (x instanceof MyPromise) {
    console.log("x instanceof MyPromise");
    x.then(function(value) {
      resolutionProcedure(promise2, value, resolve, reject);
    }, reject);
  }

  let called = false;
  console.log("x instanceof MyPromise after");
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolutionProcedure(promise2, y, resolve, reject);
          },
          e => {
            if (called) return;
            called = true;
            reject(e);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

module.exports = MyPromise;
