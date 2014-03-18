var Switch = function() {
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

  if (Object.keys(this.devices).length < 2)
    throw 'switch requires more than one device';
};

Switch.prototype.addDevice = function(arg, name) {
  if (!name) name = this.devices.length;

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

  device.onReceived(this.receive.bind(this));

  this.devices[name] = device;
  return device;
};

Switch.prototype.forEachDevice = function(callback) {
  for (var deviceName in this.devices) {
    var device = this.devices[deviceName];
    if (callback(device, deviceName) === false)
      break;
  }
};

Switch.prototype.getDevice = function(name) {
  return this.devices[name];
};

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
