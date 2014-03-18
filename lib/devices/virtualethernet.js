/*
  This device is primarily for testing, since it operates with a mac addr
*/
var VirtualEthernet = function() {
  VirtualEthernet.super_.call(this, 'virtual-ethernet');
  this.mac = new Mac(); // need a mac address
  this.addFilter('send', new StopIfSrcMac(this.mac));
  this.addFilter('send', new ChangeSrcMac(this.mac));
};

util.inherits(VirtualEthernet, Device);

module.exports = VirtualEthernet;
