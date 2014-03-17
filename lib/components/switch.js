var Switch = function() {
  var self = this;
  this.devices = {};
  if (arguments.length == 1) {
    var arg = arguments[0];
    if (typeof arg == 'number')
      for (var idx = 0; idx < arg; idx++)
        this.devices[idx] = new Device();
    else if (typeof arg == 'object') {
      for (var name in arg)
        this.devices[name] = this.makeDevice_(arg);
    }
  }
  else {
    for (var idx in arguments) {
      var arg = arguments[idx];
      if (typeof arg == 'object')
        this.devices[idx] = arg;
      else if (typeof arg == 'string')
        this.devices[idx] = this.makeDevice_(arg);
    }
  }

  this.forEachDevice(function(device) {
    device.onReceived(self.receive.bind(self));
  });

  if (Object.keys(this.devices).length < 2)
    throw 'switch requires more than one device';
};

Switch.prototype.makeDevice_ = function(arg) {
  if (arg == 'virtual') return new Device();
  else return new Ethernet(arg);
};

Switch.prototype.forEachDevice = function(callback) {
  for (var deviceName in this.devices) {
    var device = this.devices[deviceName];
    callback(device, deviceName);
  }
};

Switch.prototype.getDevice = function(name) {
  return this.devices[name];
};

Switch.prototype.receive = function(packet, device) {
  this.forEachDevice(function(d) {
    if (device != d) d.send(clone(packet, true));
  });
};

module.exports = Switch;
