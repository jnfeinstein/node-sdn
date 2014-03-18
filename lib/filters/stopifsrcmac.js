var StopIfSrcMac = function(mac) {
  this.mac = mac;
};

util.inherits(StopIfSrcMac, Filter);

StopIfSrcMac.prototype.run = function(packet) {
  return !this.mac.equals(packet.srcMac);
};

module.exports = StopIfSrcMac;
