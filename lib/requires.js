global.events = require ("events");
global.util = require("util");
global.exit = require('./exit');

require('./helpers');
global.Packet = require('./stack/packet');
global.Mac = require('./stack/mac');

global.Filter = require('./filters/filter');
global.ChangeSrcMac = require('./filters/changesrcmac');
global.StopIfSrcMac = require('./filters/stopifsrcmac');
global.ChangeVlan = require('./filters/changevlan');

global.Device = require('./devices/device');
global.Ethernet = require('./devices/ethernet');
global.VirtualEthernet = require('./devices/virtualethernet');

global.Component = require('./components/component');
global.Wire = require('./components/wire');
global.Hub = require('./components/hub');
