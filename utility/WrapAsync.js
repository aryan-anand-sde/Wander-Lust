// Can be used to wrap async functions to catch errors and pass them to next()
function WrapAsync(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default WrapAsync;
