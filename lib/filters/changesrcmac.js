var ChangeSrcMac = function(mac) {
  this.mac = mac;
};

util.inherits(ChangeSrcMac, Filter);

ChangeSrcMac.prototype.run = function(packet) {
  packet.setSrcMac(this.mac);
};

module.exports = ChangeSrcMac;
