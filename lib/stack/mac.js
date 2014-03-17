var jsMac = [55,55,55,55,55,0];

var Mac = function(buffer) {
  if (!buffer) {
    buffer = new Buffer(jsMac);
    jsMac[5]++;
  }
  this.rawMac = buffer;
  this.string_ = this.toString();
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