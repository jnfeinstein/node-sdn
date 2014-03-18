require('./lib/requires');

var switch1 = new Switch("eth1", "virtual-ethernet");
var switch2 = new Switch("virtual", "virtual-ethernet");

switch1.getDevice(1).connect(switch2.getDevice(0));
