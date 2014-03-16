var Mac = require('./mac');

var Packet = function(buffer) {
  this.raw = buffer;
  this.device = null; // to be filled in by an ethernet device
  this.parseEthernetHeader();
};

Packet.prototype.parseEthernetHeader = function() {
  this.dstMac = new Mac(this.raw.slice(0, 6));
  this.srcMac = new Mac(this.raw.slice(6, 12))
  this.type = this.raw.readUInt16BE(12);

  if (this.type == 0x8100) {
    // this packet has a vlan tag
    this.vlan = this.raw.readUInt16BE(14) & 0xFFF;
    this.type = this.raw.readUInt16BE(16);
  }
  else this.vlan = null;
};

Packet.prototype.setSrcMac = function(mac) {
  this.srcMac = mac;
  mac.raw.copy(this.raw,6,0,6);
};

Packet.prototype.setDstMac = function(mac) {
  this.dstMac = mac;
  mac.raw.copy(this.raw,0,0,6);
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