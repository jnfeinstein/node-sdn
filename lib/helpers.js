Buffer.prototype.toByteArray = function () {
  return Array.prototype.slice.call(this, 0);
}

Buffer.prototype.equals = function(otherBuffer) {
  if (this.length != otherBuffer.length) return false;
  for (var i = 0; i < this.length; i++)
    if (this[i] != otherBuffer[i]) return false;
  return true;
};

Buffer.prototype.insert = function(start, size) {
  var parts = [];
  parts.push(this.slice(0, start));
  parts.push(new Buffer(size));
  parts.push(this.slice(start,this.length));
  return Buffer.concat(parts, this.length + size);
};

Buffer.prototype.remove = function(start, size) {
  var parts = [];
  parts.push(this.slice(0, start));
  parts.push(this.slice(start + size,this.length));
  return Buffer.concat(parts, this.length - size);
};

if (!global.zeroFill)
global.zeroFill = function(number, width, base) {
  width -= number.toString(base || 10).length;
  if (width > 0)
    return new Array(width + (/\./.test(number) ? 2 : 1)).join( '0' ) + number.toString(base || 10);
  return number.toString(base || 10) + "";
};

if (!global.callSuper)
global.callSuper = function() {
  var functionName = arguments[0];
  this.constructor.super_.prototype[functionName]
    .apply(this, argsToArray(arguments).slice(1));
};

if (!global.argsToArray)
global.argsToArray = function(args) {
  return Array.prototype.slice.call(args);
};

// Adapted from underscore.js
if (!global.extend)
global.extend = function(obj) {
  argsToArray(arguments).slice(1).forEach(function(source) {
    if (!source) return;
    for (var prop in source)
      obj[prop] = source[prop];
  });
  return obj;
};
