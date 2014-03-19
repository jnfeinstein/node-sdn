require('./lib/requires');

var s = new Switch({eth0: 'eth0', eth1: 'eth2'});
s.devices.eth0.addFilter('send', new ChangeVlan({10: null}));
s.devices.eth1.addFilter('send', new ChangeVlan({'-': 10}));
