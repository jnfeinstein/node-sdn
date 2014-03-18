global.events = require ("events");
global.util = require("util");
global.clone = require('node-v8-clone').clone;
global.exit = require('./exit');

require('./helpers');
global.Packet = require('./stack/packet');
global.Mac = require('./stack/mac');

global.Filter = require('./filters/filter');
global.ChangeSrcMac = require('./filters/changesrcmac');

global.Device = require('./devices/device');
global.Ethernet = require('./devices/ethernet');
global.VirtualEthernet = require('./devices/virtualethernet');

global.Component = require('./components/component');
global.Switch = require('./components/switch');
