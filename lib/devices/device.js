var Device = function() {
  this.interface_ = 'virtual';
};

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

Device.prototype.send = function(packet) {
  this.emit('sent', packet, this);
};

Device.prototype.receive = function(packet) {
  this.emit('received', packet, this);
};

Device.prototype.inspect = function() {
  return this.interface_;
};

Device.connect = function(a,b) {
  a.onSent(b.receive.bind(b));
  b.onSent(a.receive.bind(a));
};

module.exports = Device;
