zmq-pubsub [![Build Status](https://secure.travis-ci.org/Horsed/zmq-pubsub.png)](http://travis-ci.org/Horsed/zmq-pubsub)
==========

Brokered pub/sub via **TCP** based on [zeromq](http://zeromq.org/) and [node-zmq](https://github.com/JustinTulloss/zeromq.node) with handling of JSON messages.

## Installation

  **Node.js >=0.10 and zeromq >=4 required**

    $ npm install zmq-pubsub

### example using [node-zeromq](https://github.com/JustinTulloss/zeromq.node)

  Broker:
  ```js
  require('zmq-pubsub').broker()
    .start(11111, 22222);
  ```
  Subscriber:
  ```js
  require('zmq')
    .socket('sub')
    .subscribe('myevent')
    .connect('tcp://127.0.0.1:22222')
    .on('message', function(msg) {
      // handle msg
    });
  ```

  Publisher:
  ```js
  require('zmq')
    .socket('pub')
    .connect('tcp://127.0.0.1:11111');
  ```

## TODO
* publisher, subscriber
* json messages