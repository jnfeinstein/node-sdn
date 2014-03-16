require('./lib/helpers');
var Switch = require('./lib/switch');
var Ethernet = require('./lib/ethernet');

var switch_ = new Switch("eth2", "eth1");

process.on("SIGINT", function() {
  Ethernet.cleanup();
  process.exit();
});
