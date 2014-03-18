require('./lib/requires');

var e1 = new Ethernet('eth1');
var e2 = new Ethernet('eth1');

e1.onReceived(e2.send.bind(e2));

e1.addFilter('receive', function(packet) {
  if (packet.vlan) return false;
  return true;
});
e2.addFilter('send', new ChangeVlan({'-': 12}));