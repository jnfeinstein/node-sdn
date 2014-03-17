var Ethernet = require('./devices/ethernet');
var Virtual = require('./devices/virtual');

var Switch = function() {
  var self = this;
  this.devices = {};
  if (arguments.length == 1) {
    var arg = arguments[0];
    if (typeof arg == 'number')
      for (var i = 0; i < arguments[0]; i++)
        this.devices[idx] = new Virtual();
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
    device.on('received', self.receive.bind(self));
  });

  if (Object.keys(this.devices).length < 2)
    throw 'switch requires more than one device';
};

Switch.prototype.makeDevice_ = function(arg) {
  if (arg == 'virtual') return new Virtual();
  else return new Ethernet(arg);
};

Switch.prototype.forEachDevice = function(callback) {
  for (var deviceName in this.devices) {
    var device = this.devices[deviceName];
    callback(device, deviceName);
  }
};

Switch.prototype.receive = function(packet, device) {
  this.forEachDevice(function(d) {
    if (device != d) d.send(packet);
  });
};

module.exports = Switch;
