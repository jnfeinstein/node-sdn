var Device = function() {};

util.inherits(Device, events.EventEmitter);

Device.prototype.connect = function(otherDevice) {
  this.onSent(otherDevice.receive.bind(otherDevice));
};

Device.prototype.onReceived = function(callback) {
  this.on('received', callback);
};

Device.prototype.onSent = function(callback) {
  this.on('sent', callback);
};

Device.connect = function(a,b) {
  a.onSent(b.receive.bind(b));
  b.onSent(a.receive.bind(a));
};

module.exports = Device;
