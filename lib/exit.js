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
