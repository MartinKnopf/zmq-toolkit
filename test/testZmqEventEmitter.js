var should = require('should')
  , EventEmitter = require('events').EventEmitter
  , WebSocket = require('socket.io').Socket
  , ZmqEventEmitter = require('../lib/zmqEventEmitter')
  , Broker = require('../lib/broker')
  , zmqBroker = new Broker().start('tcp://127.0.0.1:7000', 'tcp://127.0.0.1:7001');


describe('[testZmqEventEmitter.js] ZmqEventEmitter', function() {

  describe('When an event handler is registered', function() {

    it('should return instance for chaining', function() {

      var zee = new ZmqEventEmitter().start('tcp://127.0.0.1:7000', 'tcp://127.0.0.1:7001');
      
      zee.on('bla', function(data) {}).should.eql(zee);
    });
  });

  describe('When a subscribed event is emitted', function() {

    it('should call event handler', function(done) {

      var zee = new ZmqEventEmitter().start('tcp://127.0.0.1:7000', 'tcp://127.0.0.1:7001');
      
      zee.on('bla', function(data) {
        done();
      });

      setTimeout(function() {
        zee.emit('bla');
      }, 100.0);
    });
  });

  describe('Wrapping a socket.io socket', function() {

    it('should replace the socket\'s original emit function', function() {

      var socket = new EventEmitter()
        , emit = socket.emit
        , zee = new ZmqEventEmitter().start('tcp://127.0.0.1:7000', 'tcp://127.0.0.1:7001');

      zee.hug(socket);

      emit.should.not.eql(socket.emit);
    });
  });

  describe('When event on a wrapped socket.io socket is fired', function() {

    it('should forward to zmq broker', function(done) {

      var socket = new EventEmitter()
        , zee = new ZmqEventEmitter().start('tcp://127.0.0.1:7000', 'tcp://127.0.0.1:7001');

      zee.hug(socket);

      zee.on('bar', function() {
        done();
      });

      setTimeout(function() {
        socket.emit('bar');
      }, 100.0);
    });
  });

});