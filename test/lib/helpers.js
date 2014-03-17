if (!global.doAfter)
global.doAfter = function(ms, callback) {
  setTimeout(function() {
    callback();
  }, ms);
}