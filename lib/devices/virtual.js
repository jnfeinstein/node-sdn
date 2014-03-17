var Packet = require('../stack/packet');

var Virtual = function() {
  this.interface_ = 'virtual';
};

Virtual.prototype.send = function(packet) {
  this.emit('sent', packet, this);
};

Virtual.prototype.receive = function(packet) {
  this.emit('received', packet, this);
};

Virtual.connect = function(a,b) {
  a.on('sent', b.receive.bind(b));
  b.on('sent', a.receive.bind(a));
};

inheritEventEmitter(Virtual);
module.exports = Virtual;
