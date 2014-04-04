var raw = require('raw-socket');
var sh = require('execSync');

var socketOptions = {
  protocol: raw.Protocol.ETH_P_ALL,
  addressFamily: raw.AddressFamily.Packet
};

var setIpTableRules = function(strEthDevice, addRule) {
  var command = "iptables -" + (addRule ? "A" : "D");
  sh.run(command + " INPUT -i " + strEthDevice + " -j DROP");
  sh.run(command + " OUTPUT -o " + strEthDevice + " -j DROP");
};

var setPromiscuous = function(strEthDevice, enabled) {
  sh.run('ifconfig ' + strEthDevice + ' ' + (enabled ? '' : '-') + 'promisc');
};

var Ethernet = function(strEthDevice) {
  Ethernet.super_.call(this, strEthDevice);
  setIpTableRules(this.device, true);
  setPromiscuous(this.device, true);

  // need a mac address
  this.mac = new Mac();

  // create socket
  var s = raw.createSocket(socketOptions);
  s.bindToDevice(strEthDevice);
  this.socket_ = s;

  // set up events
  s.on("message", this.receive.bind(this));

  // set up filters
  this.addFilter('send', new ChangeSrcMac(this.mac));

  // keep track
  Ethernet.devices.push(this);
};

util.inherits(Ethernet, Device);

Ethernet.prototype.cleanup = function() {
  setIpTableRules(this.device, false);
  setPromiscuous(this.device, false);
};

Ethernet.prototype.receive = function(buffer) {
  var packet = new Packet(buffer);
  packet.device = this;
  callSuper.call(this, 'receive', packet);
};

Ethernet.prototype.send = function(packet) {
  if (!this.runFilters('send', packet)) return;
  var callback = function(error, bytes) {
    if (error) this.emit('error:send', packet, this);
    else this.emit('sent', packet, this);
  };
  this.socket_.send(packet.rawPacket, 0, packet.rawPacket.length, null, callback.bind(this));
};

Ethernet.prototype.onClose = function(callback) {
  this.socket_.on('close', callback);
};

Ethernet.prototype.onError = function(callback) {
  this.socket_.on('error', callback);
};

Ethernet.cleanup = function() {
  Ethernet.devices.forEach(function(eth) { eth.cleanup(); });
};

Ethernet.devices = [];

exit.installHandler(function() {
  Ethernet.cleanup();
});

module.exports = Ethernet;
