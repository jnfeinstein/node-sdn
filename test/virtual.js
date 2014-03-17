require('./lib/requires');

exports.testDeviceConnection = function(test) {
  var v1 = new Virtual(), v2 = new Virtual();
  v1.connect(v2);
  v2.onReceived(function() {
    test.ok(true, 'other port received packet');
    test.done();
  });
  v1.send(new Packet());
};
