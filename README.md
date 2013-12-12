zmq-pubsub
==========

Brokered pub/sub based on [zeromq](http://zeromq.org/) and [node-zmq](https://github.com/JustinTulloss/zeromq.node) with handling of JSON messages.

## Installation

  **Node.js >=0.10 and zeromq >=4 required**

    $ npm install zmq-pubsub

### example using [node-zeromq](https://github.com/JustinTulloss/zeromq.node)

  Broker:
  ```js
  require('zmq-pubsub').broker()
    .start(11111, 22222); // The default ports are 5000 for XSUB and 5001 for XPUB. They both are **TCP** ports!
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
* publisher, subsciber
* json messages