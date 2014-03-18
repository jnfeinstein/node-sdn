require('./lib/requires');

var switch1 = new Switch("eth1", "virtual-ethernet");
var switch2 = new Switch("virtual", "virtual-ethernet");
switch2.getDevice(0).addFilter('receive', new ChangeVlan({
  '-': 5
}));

switch1.getDevice(1).connect(switch2.getDevice(0));
