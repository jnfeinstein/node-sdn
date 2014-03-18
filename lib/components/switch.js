var Switch = function() {
  Switch.super_.apply(this, argsToArray(arguments));
  if (Object.keys(this.devices).length < 2)
    throw 'component requires more than one device';
};

util.inherits(Switch, Component);

Switch.prototype.hasDeviceWithMac = function(mac) {
  var result = false;
  this.forEachDevice(function(d){
    if (d.mac && d.mac.equals(mac)) {
      result = true;
      return false;
    }
  });
  return result;
};

Switch.prototype.receive = function(packet, device) {
  if (this.hasDeviceWithMac(packet.srcMac)) return;
  console.log("received: " + packet.inspect() + " " + device.inspect());
  this.forEachDevice(function(d) {
    if (device != d) {
      console.log("sending: " + packet.inspect() + " " + d.inspect());
      d.send(clone(packet, true));
    }
  });
};

module.exports = Switch;
