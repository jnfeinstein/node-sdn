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

/*
  Make sure that the device wont send a packet
  with itself as the src mac
*/
exports.testWontSendIfSrc = function(test) {
  var v = new VirtualEthernet(), sent = false;

  v.onSent(function() { sent = true; });
  doAfter(500, function() {
    test.ok(!sent);
    test.done();
  });
  v.send(new Packet().setSrcMac(v.mac));
};
