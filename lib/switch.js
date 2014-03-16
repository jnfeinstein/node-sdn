var Ethernet = require('./ethernet');

var Switch = function() {
  if (arguments < 2) throw "switch requires at least two devices";
  this.devices = [];
  for (var idx in arguments)
    this.devices.push(this.setupEthernetDevice(arguments[idx]));
} ;

Switch.prototype.setupEthernetDevice = function(device) {
  var ethernet = new Ethernet(device);
  ethernet.on('received', this.received.bind(this));
  return ethernet;
};

Switch.prototype.received = function(packet) {
  var self = this;
  this.devices.forEach(function(device) {
    if (self.shouldDeviceSendPacket(device, packet)) device.send(packet);
  });
};

Switch.prototype.shouldDeviceSendPacket = function(device, packet) {
  if (device == packet.device) return false;
  if (device.mac.equals(packet.srcMac)) return false;
  return true;
}

module.exports = Switch;
