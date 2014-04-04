var Wire = function() {
  Wire.super_.apply(this, argsToArray(arguments));


  if (this.numDevices() != 2)
    throw 'wire must have exactly two devices';

  var deviceNames = Object.keys(this.devices);
  var zero = this.devices[deviceNames[0]];
  var one = this.devices[deviceNames[1]];

  Device.join(zero, one);
};

util.inherits(Wire, Component);

module.exports = Wire;
