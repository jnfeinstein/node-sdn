var Device = function(device) {
  if (!device) device = 'virtual';
  this.device = device;
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
  if (this.runFilters('send', packet))
    this.emit('sent', packet, this);
};

Device.prototype.receive = function(packet) {
  if (this.runFilters('receive', packet))
    this.emit('received', packet, this);
};

Device.prototype.addFilter = function(action, filter) {
  if (!this.filters_[action]) this.filters_[action] = [];
  if (this.filters_[action].indexOf(filter) != -1)
    throw 'attempted to add duplicate filter to device';
  this.filters_[action].push(filter);
};

Device.prototype.runFilters = function(action, packet) {
  var filters = this.filters_[action];
  if (!filters) return true;
  for (var i = 0; i < filters.length; i++) {
    var filter = filters[i];
    if (typeof filter == 'function' && filter.call(this, packet) === false)
      return false;
    else if (filter.run(packet) === false)
      return false;
  }
  return true;
};

Device.prototype.inspect = function() {
  return this.device;
};

Device.connect = function(a,b) {
  a.onSent(b.receive.bind(b));
  b.onSent(a.receive.bind(a));
};

module.exports = Device;
