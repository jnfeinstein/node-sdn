Buffer.prototype.toByteArray = function () {
  return Array.prototype.slice.call(this, 0);
}

Buffer.prototype.equals = function(otherBuffer) {
  if (this.length != otherBuffer.length) return false;
  for (var i = 0; i < this.length; i++)
    if (this[i] != otherBuffer[i]) return false;
  return true;
};

if (!global.zeroFill)
global.zeroFill = function(number, width, base) {
  width -= number.toString(base || 10).length;
  if (width > 0)
    return new Array(width + (/\./.test(number) ? 2 : 1)).join( '0' ) + number.toString(base || 10);
  return number.toString(base || 10) + "";
};
