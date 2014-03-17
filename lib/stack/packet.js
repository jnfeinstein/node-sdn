var MinPacketSize = 18;

var Packet = function(buffer) {
  if (!buffer) {
    buffer = new Buffer(MinPacketSize);
    buffer.fill(0);
  }
  this.rawPacket = buffer;
  this.parseEthernetHeader();
};

Packet.prototype.parseEthernetHeader = function() {
  this.dstMac = new Mac(this.rawPacket.slice(0, 6));
  this.srcMac = new Mac(this.rawPacket.slice(6, 12))
  this.type = this.rawPacket.readUInt16BE(12);

  if (this.type == 0x8100) {
    // this packet has a vlan tag
    this.vlan = this.rawPacket.readUInt16BE(14) & 0xFFF;
    this.type = this.rawPacket.readUInt16BE(16);
  }
};

Packet.prototype.setSrcMac = function(mac) {
  this.srcMac = mac;
  mac.rawMac.copy(this.rawPacket,6,0,6);
  return this;
};

Packet.prototype.setDstMac = function(mac) {
  this.dstMac = mac;
  mac.rawMac.copy(this.rawPacket,0,0,6);
  return this;
};

Packet.prototype.inspect = function() {
  var parts = [];
  parts.push(['srcMac', this.srcMac.toString()]);
  parts.push(['dstMac', this.dstMac.toString()]);
  parts.push(['type', zeroFill(this.type,4,16)]);
  if (this.vlan) parts.push(['vlan', this.vlan.toString()]);
  return parts.map(function(part) { return part.join('='); }).join(' ');
};

module.exports = Packet;