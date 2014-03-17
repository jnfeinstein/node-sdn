require('./lib/helpers');
var Switch = require('./lib/components/switch');
var Ethernet = require('./lib/devices/ethernet');
var Virtual = require('./lib/devices/virtual');

var s = new Switch(2);
var switch1 = new Switch("eth2", "virtual");
var switch2 = new Switch("virtual", "eth1");

Virtual.connect(switch1.devices[1], switch2.devices[0]);

process.on("SIGINT", function() {
  Ethernet.cleanup();
  process.exit();
});
