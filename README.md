zmq-toolkit [![Build Status](https://secure.travis-ci.org/Horsed/zmq-toolkit.png)](http://travis-ci.org/Horsed/zmq-toolkit)
===========

Some helpers for simplified use of [zeromq.node](https://github.com/JustinTulloss/zeromq.node).

## Installation

  **Node.js >=0.10 and zeromq >=4 required**

    $ npm install zmq-toolkit

## Examples

  Broker:
  ```js
  // pubsub proxy to connect multiple publishers and subscribers

  var Broker = require('zmq-toolkit').Broker
    , broker = new Broker().start('tcp://127.0.0.1:11111', 'tcp://127.0.0.1:22222');
  ```

  ZmqEventEmitter:
  ```js
  // zeromq based EventEmitter to connect different Node processes via pubsub

  var ZmqEventEmitter = require('zmq-toolkit').ZmqEventEmitter
    , zee = new ZmqEventEmitter('tcp://127.0.0.1:11111', 'tcp://127.0.0.1:22222'); // connect to broker

  zee.on('my-event', function(options) {
    console.log(options.foo);
  });

  setTimeout(function() { // need some time to connect sockets

    zee.emit('my-event', {foo: 'bar'});

  }, 100);
  ```

  Heartbeat publisher:
  ```js
  // periodically emit a ```heartbeat``` event with the given data

  var Heartbeat = require('zmq-toolkit').Heartbeat
    , heartbeat = new Heartbeat({name: 'my-app'}).start('tcp://127.0.0.1:11111', 60000); // connect to a broker's XSUB socket
  ```

  TestBroker:
  ```js
  // pubsub broker for use in async tests

  // TBD
  ```