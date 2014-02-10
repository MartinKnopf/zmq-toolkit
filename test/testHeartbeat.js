var should = require('should')
  , zmq = require('zmq')
  , Heartbeat = require('../lib/heartbeat')
  , Broker = require('../lib/broker');

describe('[testHeartbeat.js] Heartbeat', function() {

  it('should emit heartbeat event', function(done) {
    var broker = new Broker().start('tcp://127.0.0.1:9000', 'tcp://127.0.0.1:9001')
      ,  sub = zmq.socket('sub');
    sub.subscribe('heartbeat');
    sub.on('message', function(msg) {
      done();
      broker.close();
    });
    sub.connect('tcp://127.0.0.1:9001');

    var heartbeat = new Heartbeat({name: 'my-app'}).start('tcp://127.0.0.1:9000', 1);
  });

  it('should emit heartbeat event with JSON data', function(done) {
    var broker = new Broker().start('tcp://127.0.0.1:9100', 'tcp://127.0.0.1:9101')
      , sub = zmq.socket('sub');
    sub.subscribe('heartbeat');
    sub.on('message', function(msg) {
      toJson(msg).name.should.eql('my-appooo');
      done();
      broker.close();
    });
    sub.connect('tcp://127.0.0.1:9101');

    var heartbeat = new Heartbeat({name: 'my-appooo'}).start('tcp://127.0.0.1:9100', 1);
  });

  it('should emit heartbeat event with string data', function(done) {
    var broker = new Broker().start('tcp://127.0.0.1:9200', 'tcp://127.0.0.1:9201')
      ,  sub = zmq.socket('sub');
    sub.subscribe('heartbeat');
    sub.on('message', function(msg) {
      toJson(msg).should.eql('my-app');
      done();
      broker.close();
    });
    sub.connect('tcp://127.0.0.1:9201');

    var heartbeat = new Heartbeat('my-app').start('tcp://127.0.0.1:9200', 1);
  });
});

function toJson(msg) {
  msg = msg.toString()
  msg = msg.substr(msg.indexOf(' ') + 1, msg.length - 1);
  try {
    return JSON.parse(msg);
  } catch(e) {
    return msg;
  }
}