require('./lib/requires');

/*
  Make sure that the mac address is appropriately
  rewritten when sending
*/
exports.testMacGetsRewritten = function(test) {
  var v1 = new VirtualEthernet(), v2 = new Virtual();
  v1.connect(v2);
  v2.onReceived(function(packet) {
    test.deepEqual(v1.mac, packet.srcMac);
    test.done();
  });
  var p = new Packet();
  test.notDeepEqual(v1.mac, p.srcMac);
  v1.send(p);
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