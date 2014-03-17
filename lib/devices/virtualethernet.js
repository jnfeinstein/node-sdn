/*
  This device is primarily for testing, since it operates with a mac addr
*/
var VirtualEthernet = function() {
  this.interface_ = 'virtual-ethernet';
  this.mac = new Mac(); // need a mac address
};

util.inherits(VirtualEthernet, Device);

VirtualEthernet.prototype.preSend = Ethernet.prototype.preSend;

VirtualEthernet.prototype.send = function(packet) {
  if (!this.preSend(packet)) return;
  callSuper.call(this, 'send', packet);
};

module.exports = VirtualEthernet;
