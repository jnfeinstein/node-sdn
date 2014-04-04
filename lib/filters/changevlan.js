
var MAPPING_NO_VLAN = '-';
var MAPPING_ALL_VLANS = '*';

var ChangeVlan = function(mappings) {
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
  if (packet.vlan) {
    if (this.mappings[MAPPING_ALL_VLANS])
      packet.setVlan(this.mappings[MAPPING_ALL_VLANS]);
    else if (this.mappings[packet.vlan]) {
      if (this.mappings[packet.vlan] == MAPPING_NO_VLAN)
        packet.setVlan(null);
      else
        packet.setVlan(this.mappings[packet.vlan]);
    }
  }
  else if (this.mappings[MAPPING_NO_VLAN])
    packet.setVlan(this.mappings[MAPPING_NO_VLAN]);

  return true;
};


ChangeVlan.MAPPING_NO_VLAN = MAPPING_NO_VLAN
ChangeVlan.MAPPING_ALL_VLANS = MAPPING_ALL_VLANS;
module.exports = ChangeVlan;
