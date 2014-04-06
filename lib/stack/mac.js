var jsMac = [0x1A,0x87,0x91,0x44,0xD6,0xDC];

var Mac = function(buffer) {
  if (!buffer) {
    buffer = new Buffer(jsMac);
    jsMac[5]++;
  }
  this.rawMac = buffer;
};

Mac.prototype.toString = function() {
  return this.rawMac.toByteArray()
          .map(function(i) { return zeroFill(i,2,16); })
          .join(':');
};

Mac.prototype.equals = function(otherMac) {
  return this.rawMac.equals(otherMac.rawMac);
};

module.exports = Mac;
