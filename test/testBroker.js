var zmq = require('zmq')
  , Broker = require('../lib/broker')
  , zmqBroker = new Broker().start('tcp://127.0.0.1:6000', 'tcp://127.0.0.1:6001')
  , should = require('should');

describe('[testBroker.js] Broker', function() {

  it('should start on default ports', function(done) {
    var zmqBroker = new Broker().start()
      , pub = zmq.socket('pub')
      , sub = zmq.socket('sub');

    sub.subscribe('event');
    sub.on('message', function(msg) {
      done();
    });

    sub.connect('tcp://127.0.0.1:5001');

    pub.connect('tcp://127.0.0.1:5000');

    setTimeout(function() {
      pub.send('event cool stuff');
    }, 100.0);    
  });

  it('should transport event and data', function(done) {
    var zmqBroker = new Broker().start('tcp://127.0.0.1:8000', 'tcp://127.0.0.1:8001')
      , pub = zmq.socket('pub')
      , sub = zmq.socket('sub');

    sub.subscribe('event');
    sub.on('message', function(msg) {
      msg.toString().should.eql('event cool stuff');
      done();
    });

    sub.connect('tcp://127.0.0.1:8001');

    pub.connect('tcp://127.0.0.1:8000');

    setTimeout(function() {
      pub.send('event cool stuff');
    }, 100.0);    
  });

  it('should close proxy sockets', function(done) {
    zmqBroker.close();

    zmq.socket('pub').bind('6001', function() {
      zmq.socket('sub').bind('6000', function() {
        done(); // if we could successfully bind sockets to these ports, they were free in the first place
      });
    });
  });
});