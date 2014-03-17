require('./lib/requires');

exports.testPortToPort = function(test) {
  var sw = new Switch(2);
  sw.getDevice(1).onSent(function() {
    test.ok(true, 'other port sent packet');
    test.done();
  });
  sw.getDevice(0).receive(new Packet());
};

exports.testSwitchToSwitch = function(test) {
  var sw1 = new Switch(2), sw2 = new Switch(2);
  sw1.getDevice(1).connect(sw2.getDevice(0));
  sw2.getDevice(1).onSent(function(packet) {
    test.ok(true, 'other switch received packet');
    test.done();
  });
  sw1.getDevice(0).receive(new Packet());
};
