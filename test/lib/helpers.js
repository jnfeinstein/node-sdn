if (!global.finishAfter)
global.finishAfter = function(test, ms) {
  setTimeout(function() {
    test.done();
  }, ms);
}