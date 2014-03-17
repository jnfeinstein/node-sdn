require('./lib/requires');

var s = new Switch(2);
var switch1 = new Switch("eth2", "virtual");
var switch2 = new Switch("virtual", "eth1");

Device.connect(switch1.devices[1], switch2.devices[0]);
