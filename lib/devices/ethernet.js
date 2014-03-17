var raw = require('raw-socket');
var sh = require('execSync');

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
  s.on("message", this.receive.bind(this));

  // keep track
  Ethernet.openInterfaces.push(this);
};

util.inherits(Ethernet, Device);

Ethernet.prototype.cleanup = function() {
  setIpTableRules(this.interface_, false);
};

Ethernet.prototype.receive = function(buffer) {
  var packet = new Packet(buffer);
  packet.device = this;
  callSuper.call(this, 'receive', packet);
};

Ethernet.prototype.preSend = function(packet) {
  if (this.mac.equals(packet.srcMac)) return false;
  packet.setSrcMac(this.mac);
  return true;
};

Ethernet.prototype.send = function(packet) {
  if (!this.preSend(packet)) return;
  var callback = function(error, bytes) {
    if (error) this.emit('error:send', packet, this);
    else callSuper.call(this, 'send', packet);
  };
  this.socket_.send(packet.raw, 0, packet.raw.length, null, callback.bind(this));
};

Ethernet.cleanup = function() {
  Ethernet.openInterfaces.forEach(function(eth) { eth.cleanup(); });
};

Ethernet.openInterfaces = [];

exit.installHandler(function() {
  Ethernet.cleanup();
});

module.exports = Ethernet;
