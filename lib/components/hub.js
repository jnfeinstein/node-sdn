var Hub = function() {
  Hub.super_.apply(this, argsToArray(arguments));
  if (Object.keys(this.devices).length < 2)
    throw 'hub requires more than one device';
};

util.inherits(Hub, Component);

Hub.prototype.receive = function(packet, device) {
  this.forEachDevice(function(d) {
    if (device != d) {
      d.send(packet);
    }
  });
};

module.exports = Hub;
