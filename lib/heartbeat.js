/**
 * Emits heartbeat events with arbitrary data to identify the service.
 */
var zmq = require('zmq');

module.exports = Heartbeat;

function Heartbeat(options) {
  this.options = options;
}

Heartbeat.prototype.start = function(xsub, wait) {
  var options = this.options
    , pub = zmq.socket('pub');

  pub.connect(xsub);

  setInterval(function() {
    pub.send('heartbeat' + (options ? ' ' + JSON.stringify(options) : ''));
  }, wait);

  return this;
}