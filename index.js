require('./lib/helpers');
var Switch = require('./lib/switch');
var Virtual = require('./lib/devices/ethernet');
var Virtual = require('./lib/devices/virtual');

var switch1 = new Switch("eth2", "virtual");
var switch2 = new Switch("virtual", "eth1");

Virtual.connect(switch1.devices[1], switch2.devices[0]);

process.on("SIGINT", function() {
  Ethernet.cleanup();
  process.exit();
});
