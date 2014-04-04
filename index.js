require('./lib/requires');

/*
var s = new Switch({eth1: 'eth1', eth3: 'eth3'});
s.devices.eth3.addFilter('send', new ChangeVlan({'-': 10}));
s.devices.eth1.addFilter('send', new ChangeVlan({10: '-'}));
*/
var v = new VlanBridge({'-': 10, 10: '-'}, 'eth1', 'eth3');