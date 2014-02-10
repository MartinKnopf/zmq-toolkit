/**
 * Emits heartbeat events with a service id.
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
    pub.send('heartbeat ' + JSON.stringify(options));
  }, wait);
}