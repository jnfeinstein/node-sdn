var jsMac = [55,55,55,55,55,0];

var Mac = function(buffer) {
  if (!buffer) {
    buffer = new Buffer(jsMac);
    jsMac[5]++;
  }
  this.raw = buffer;
  this.string_ = this.toString();
};

Mac.prototype.toString = function() {
  return this.raw.toByteArray()
          .map(function(i) { return zeroFill(i,2,16); })
          .join(':');
};

Mac.prototype.equals = function(otherMac) {
  return this.raw.equals(otherMac.raw);
};

module.exports = Mac;