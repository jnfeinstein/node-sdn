require('./lib/requires');

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
