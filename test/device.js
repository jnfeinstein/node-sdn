require('./lib/requires');

exports.testDeviceConnection = function(test) {
  var device1 = new Device(), device2 = new Device();
  device1.connect(device2);
  device2.onReceived(function() {
    test.ok(true, 'other port received packet');
    test.done();
  });
  device1.send(new Packet());
};

exports.testFilteredDevice = function(test) {
  var device = new Device();
  var newMac = new Mac();
  var changeSrcMac = new ChangeSrcMac(newMac);
  var packet = new Packet();
  device.addFilter('receive', changeSrcMac);
  device.onReceived(function(packet) {
    test.deepEqual(newMac, packet.srcMac);
    test.done();
  });
  device.receive(packet);
};
