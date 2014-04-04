
var MAPPING_NO_VLAN = '-';
var MAPPING_ALL_VLANS = '*';

var ChangeVlan = function() {
  var mappings;
  if (arguments.length == 1)
    mappings = arguments[0];
  else if (arguments.length == 2) {
    mappings = {};
    mappings[arguments[0]] = arguments[1];
  }

  // convert any arrays into single entries
  for (var key in mappings) {
    if (Array.isArray(key)) {
      var mapping = mappings[key];
      key.forEach(function(val) { mappings[val] = mapping; });
      delete mappings[key];
    }
  }
  this.mappings = mappings;

  if (Object.keys(this.mappings).length > 1 && this.mappings[MAPPING_ALL_VLANS])
    throw 'cannot map all vlans and specific vlans simultaneously';
};

util.inherits(ChangeVlan, Filter);

ChangeVlan.prototype.run = function(packet) {

  var mapping;
  if (packet.vlan)
    mapping = this.mappings[MAPPING_ALL_VLANS] || this.mappings[packet.vlan];
  else
    mapping = this.mappings[MAPPING_NO_VLAN];

  if (mapping == MAPPING_NO_VLAN)
    mapping = null;
  packet.setVlan(mapping);

  return true;
};


ChangeVlan.MAPPING_NO_VLAN = MAPPING_NO_VLAN
ChangeVlan.MAPPING_ALL_VLANS = MAPPING_ALL_VLANS;
module.exports = ChangeVlan;
