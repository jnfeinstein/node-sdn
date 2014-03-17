/*
  This device is primarily for testing, since it operates with a mac addr
*/
var VirtualEthernet = function() {
  this.interface_ = 'virtual-ethernet';
  this.mac = new Mac(); // need a mac address
};

util.inherits(VirtualEthernet, Virtual);

VirtualEthernet.prototype.send = function(packet) {
  packet.setSrcMac(this.mac);
  VirtualEthernet.super_.prototype.send.call(this, packet);
};

module.exports = VirtualEthernet;
