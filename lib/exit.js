var handlers = [];

module.exports = {
  installHandler: function(handler, context) {
    handlers.push([handler, context]);
  }
};

process.on("SIGINT", function() {
  handlers.forEach(function(handlerDetails) {
    handlerDetails[0].call(handlerDetails[1]);
  });
  process.exit();
});

process.on("exit", function(code) {
  console.log('exitting with code ' + code);
});
