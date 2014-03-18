var Filter = function() {};

Filter.prototype.run = function(packet) {
  return true;
};

module.exports = Filter;