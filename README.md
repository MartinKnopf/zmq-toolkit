zmq-toolkit [![Build Status](https://secure.travis-ci.org/Horsed/zmq-toolkit.png)](http://travis-ci.org/Horsed/zmq-toolkit)
===========

Some helpers for simplified use of [zeromq.node](https://github.com/JustinTulloss/zeromq.node).

## Installation

  Look at the supported Node and zmq versions [here](http://travis-ci.org/Horsed/zmq-toolkit).

    $ npm install zmq-toolkit

  To start the broker in its own process:

    $ npm install -g zmq-toolkit
    $ zmqbroker tcp://127.0.0.1:11111 tcp://127.0.0.1:22222

## API

### Broker
  ```js
  // pubsub proxy that binds to the given XSUB and XPUB sockets

  var Broker = require('zmq-toolkit').Broker
    , broker = new Broker()
      .start('tcp://127.0.0.1:11111', 'tcp://127.0.0.1:22222');
  ```

### ZmqEventEmitter
  ```js
  // zeromq based EventEmitter that connects to the zmq broker

  var ZmqEventEmitter = require('zmq-toolkit').ZmqEventEmitter
    , zee = new ZmqEventEmitter()
      .start('tcp://127.0.0.1:11111', 'tcp://127.0.0.1:22222')
      .on('my-event', function(options) {
        console.log(options.foo);
      })
      .on('my-other-event', function(options) {
        console.log(options.foo);
      });

  setTimeout(function() { // need some time to connect sockets
    zee.emit('my-event', {foo: 'bar'});
  }, 100);
  ```

### Connecting socket.io sockets to the zmq broker
  ```js
  // connect socket.io sockets to a zeromq pubsub broker

  var ZmqEventEmitter = require('zmq-toolkit').ZmqEventEmitter
    , zee = new ZmqEventEmitter()
      .start('tcp://127.0.0.1:11111', 'tcp://127.0.0.1:22222');

  io.sockets.on('connection', function (socket) {
    zee.hug(socket);
  });
  ```

### Heartbeat publisher
  ```js
  // periodically emit a ```heartbeat``` event with arbitrary data to the zmq broker

  var Heartbeat = require('zmq-toolkit').Heartbeat
    , heartbeat = new Heartbeat({name: 'my-app'})
      .start('tcp://127.0.0.1:11111', 60000);
  ```