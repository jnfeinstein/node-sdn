var Virtual = function() {
  this.interface_ = 'virtual';
};

util.inherits(Virtual, Device);

Virtual.prototype.send = function(packet) {
  this.emit('sent', packet, this);
};

Virtual.prototype.receive = function(packet) {
  this.emit('received', packet, this);
};

module.exports = Virtual;
