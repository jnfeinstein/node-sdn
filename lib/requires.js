global.events = require ("events");
global.util = require("util");
global.clone = require('node-v8-clone').clone;
global.exit = require('./exit');

require('./helpers');
global.Packet = require('./stack/packet');
global.Mac = require('./stack/mac');
global.Device = require('./devices/device');
global.Virtual = require('./devices/virtual');
global.Ethernet = require('./devices/ethernet');
global.VirtualEthernet = require('./devices/virtualethernet');
global.Switch = require('./components/switch');