require('./lib/requires');

/*
  Make sure that the mac address is appropriately
  rewritten when sending
*/
exports.testMacGetsRewritten = function(test) {
  var device1 = new VirtualEthernet(), device2 = new Device();
  device1.connect(device2);
  device2.onReceived(function(packet) {
    test.deepEqual(device1.mac, p.srcMac);
    test.done();
  });
  var p = new Packet();
  test.notDeepEqual(device1.mac, p.srcMac);
  device1.send(p);
};
