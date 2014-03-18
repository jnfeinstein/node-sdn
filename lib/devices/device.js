var Device = function() {
  this.interface_ = 'virtual';
  this.filters_ = {};
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
  this.runFilters('receive', packet);
  this.emit('received', packet, this);
};

Device.prototype.addFilter = function(action, filter) {
  if (!this.filters_[action]) this.filters_[action] = [];
  if (this.filters_[action].indexOf(filter) != -1)
    throw 'attempted to add duplicate filter to device';
  this.filters_[action].push(filter);
};

Device.prototype.runFilters = function(action, packet) {
  var self = this;
  if (!this.filters_[action]) return;
  this.filters_[action].forEach(function(filter) {
    if (typeof filter == 'function') filter.call(self, packet);
    else filter.run(packet);
  });
};

Device.prototype.inspect = function() {
  return this.interface_;
};

Device.connect = function(a,b) {
  a.onSent(b.receive.bind(b));
  b.onSent(a.receive.bind(a));
};

module.exports = Device;
