var raw = require('raw-socket');
var sh = require('execSync');
var Mac = require('./mac');
var Packet = require('./packet');

var socketOptions = {
  protocol: raw.Protocol.ETH_P_ALL,
  addressFamily: raw.AddressFamily.Packet
};

var setIpTableRules = function(strEthernetInterface, addRule) {
  var command = "iptables -" + (addRule ? "A" : "D");
  sh.run(command + " INPUT -i " + strEthernetInterface + " -j DROP");
  sh.run(command + " OUTPUT -o " + strEthernetInterface + " -j DROP");
};

var Ethernet = function(strEthInterface) {
  this.interface_ = strEthInterface;
  setIpTableRules(this.interface_, true);

  // need a mac address
  this.mac = new Mac();

  // create socket
  var s = raw.createSocket(socketOptions);
  s.bindToDevice(strEthInterface);
  this.socket_ = s;

  // set up events
  s.on("message", this.recv.bind(this));

  // keep track
  Ethernet.openInterfaces.push(this);
};

Ethernet.prototype.cleanup = function() {
  setIpTableRules(this.interface_, false);
};

Ethernet.prototype.recv = function(buffer) {
  var p = new Packet(buffer);
  p.device = this;
  this.emit('received', p);
};

Ethernet.prototype.send = function(packet) {
  packet.setSrcMac(this.mac);
  this.socket_.send(packet.raw, 0, packet.raw.length, null, this.sent);
};

Ethernet.prototype.sent = function(error, bytes) {

};

Ethernet.cleanup = function() {
  Ethernet.openInterfaces.forEach(function(eth) { eth.cleanup(); });
};

Ethernet.openInterfaces = [];

inheritEventEmitter(Ethernet);
module.exports = Ethernet;
