var Component = function() {
  this.devices = {};

  var deviceArgs = {};
  if (arguments.length == 1) {
    var arg = arguments[0];
    if (typeof arg == 'number')
      for (var idx = 0; idx < arg; idx++)
        deviceArgs[idx] = 'virtual';
    else if (typeof arg == 'object')
      deviceArgs = arg;
    else if (Array.isArray(arg))
      for (var idx = 0; idx < arg.length; idx++)
        deviceArgs[idx] = arg[idx];
  }
  else
    deviceArgs = arguments;

  for (var name in deviceArgs)
    this.addDevice(deviceArgs[name], name);
};

util.inherits(Component, events.EventEmitter);

Component.prototype.addDevice = function(arg, name) {
  if (!name) name = Object.keys(this.devices).length;

  if (this.devices[name])
    throw 'component already has device named "' + name + '"';

  var device;
  if (typeof arg == 'object')
    device = arg;
  else if (arg == 'virtual-ethernet')
    device = new VirtualEthernet();
  else if (arg == 'virtual')
    device = new Device();
  else
    device = new Ethernet(arg);

  if (this.receive)
    device.onReceived(this.receive.bind(this));

  this.devices[name] = device;
  return device;
};

Component.prototype.removeDevice = function(name) {
  if (!this.devices[name]) throw 'component does not have device named "' + name + '"';
  return this.devices[name].removeAllListeners();
};

Component.prototype.getDevice = function(name) {
  return this.devices[name];
};

Component.prototype.forEachDevice = function(callback) {
  for (var deviceName in this.devices) {
    var device = this.devices[deviceName];
    if (callback(device, deviceName) === false)
      break;
  }
};

module.exports = Component;
