zmq-toolkit [![Build Status](https://secure.travis-ci.org/Horsed/zmq-toolkit.png)](http://travis-ci.org/Horsed/zmq-toolkit)
===========

Some helpers for simplified use of [zeromq.node](https://github.com/JustinTulloss/zeromq.node).

## Installation

  Look at the supported Node and zmq versions [here](http://travis-ci.org/Horsed/zmq-toolkit).

    $ npm install zmq-toolkit

  To start the broker in its own process:

    $ npm install -g zmq-toolkit
    $ zmqbroker tcp://127.0.0.1:11111 tcp://127.0.0.1:22222

## Broker
  ```js
  // pubsub proxy that binds to the given XSUB and XPUB sockets

  var Broker = require('zmq-toolkit').Broker
    , broker = new Broker().start('tcp://127.0.0.1:11111', 'tcp://127.0.0.1:22222');
  ```

## ZmqEventEmitter
  ```js
  // zeromq based EventEmitter that connects to Broker

  var ZmqEventEmitter = require('zmq-toolkit').ZmqEventEmitter
    , zee = new ZmqEventEmitter('tcp://127.0.0.1:11111', 'tcp://127.0.0.1:22222');

  zee.on('my-event', function(options) {
    console.log(options.foo);
  });

  setTimeout(function() { // need some time to connect sockets

    zee.emit('my-event', {foo: 'bar'});

  }, 100);
  ```

## Heartbeat publisher
  ```js
  // periodically emit a ```heartbeat``` event 

  var Heartbeat = require('zmq-toolkit').Heartbeat
    , heartbeat = new Heartbeat({name: 'my-app'}).start('tcp://127.0.0.1:11111', 60000);
  ```