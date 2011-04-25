function Clock(options) {
  this.total_time = 0.0;
  this.init_time = 0.0;
};

Clock.prototype.restart = function() {
  this.init_time = new Date();
};

Clock.prototype.stop  = function() {
  this.total_time += new Date().valueOf() - this.init_time.valueOf();
};

Clock.prototype.reset = function() {
  this.total_time = 0.0;
  this.init_time = 0.0;
};

exports.Clock = Clock;
