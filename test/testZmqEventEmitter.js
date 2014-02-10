var should = require('should')
  , ZmqEventEmitter = require('../lib/zmqEventEmitter')
  , Broker = require('../lib/broker')
  , zmqBroker = new Broker().start('tcp://127.0.0.1:7000', 'tcp://127.0.0.1:7001');

describe('[testZmqEventEmitter.js] ZmqEventEmitter', function() {
  it('should call event handler', function(done) {

    var zee = new ZmqEventEmitter('tcp://127.0.0.1:7000', 'tcp://127.0.0.1:7001');
    
    zee.on('bla', function(data) {
      done();
    });

    setTimeout(function() {
      zee.emit('bla');
    }, 100.0);
  });
});