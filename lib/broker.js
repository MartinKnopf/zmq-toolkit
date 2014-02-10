var zmq = require('zmq');

module.exports = Broker;

function Broker() {
  this.xsub = zmq.socket('xsub');
  this.xpub = zmq.socket('xpub');
  var self = this;

  this.xsub.on('message', function(msg) {
    self.xpub.send(msg);
  });

  this.xpub.on('message', function(msg) {
    self.xsub.send(msg);
  });
};

Broker.prototype.start = function(xsub, xpub) {
  this.xsub.bindSync(xsub || 'tcp://127.0.0.1:5000');
  this.xpub.bindSync(xpub || 'tcp://127.0.0.1:5001');
  
  return this;
}

Broker.prototype.close = function() {
  this.xsub.close();
  this.xpub.close();
  return this;
}