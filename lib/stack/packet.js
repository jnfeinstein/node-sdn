var raw = require('raw-socket');

var MIN_PACKET_SICE = 66;

var Packet = function(buffer) {
  if (!buffer) {
    buffer = new Buffer(MIN_PACKET_SICE);
    buffer.fill(0);
  }
  else if (typeof buffer == 'number') {
    buffer = new Buffer(buffer);
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
  else
    this.vlan = null;
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

Packet.prototype.setType = function(type) {
  this.type = type;
  var typeOffset = this.vlan ? 16 : 12;
  this.rawPacket.writeUInt16BE(this.type, typeOffset);
};

Packet.prototype.setVlan = function(vlan) {
  if (vlan) {
    if (!this.vlan) {
      this.rawPacket = this.rawPacket.insert(12, 4);
      this.rawPacket.writeUInt16BE(0x8100, 12);
    }
    this.vlan = vlan & 0xFFF;
    this.rawPacket.writeUInt16BE(this.vlan, 14);
  }
  else if (vlan === null && this.vlan) {
    this.rawPacket = this.rawPacket.remove(12, 4)
    this.vlan = null;
  }
};

Packet.prototype.writeChecksum = function() {
  var val = raw.createChecksum({buffer: this.rawPacket, offset: 0, length: this.rawPacket.length - 2});
  raw.writeChecksum(this.rawPacket,this.rawPacket.length - 2, val);
};

Packet.prototype.length = function() {
  return this.rawPacket.length;
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
