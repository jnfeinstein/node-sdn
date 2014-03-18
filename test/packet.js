require('./lib/requires');

exports.testChangeType = function(test) {
  var p = new Packet();
  p.setType(0x800);
  test.equal(0x800, p.type);
  test.equal(0x800, p.rawPacket.readUInt16BE(12));
  test.done();
};

exports.testChangeVlan = function(test) {
  var p = new Packet();
  p.setType(0x800);
  p.setVlan(4);
  test.equal(p.vlan, 4);
  test.equal(0x8100, p.rawPacket.readUInt16BE(12));
  test.equal(p.vlan, p.rawPacket.readUInt16BE(14));
  test.equal(0x800, p.rawPacket.readUInt16BE(16));
  test.done();
};
