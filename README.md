zmq-pubsub
==========

Publisher, subscriber and broker based on [zeromq](http://zeromq.org/) and [node-zmq](https://github.com/JustinTulloss/zeromq.node) with handling of JSON messages.

## Installation

Node.js >=0.10 and zeromq >=4 required

Install via npm: ```npm install brokowski```

## Use as a zeromq XPUB/XSUB proxy

Include brokowski in your app:
```
var brokowski = require('brokowski').zmq();
```

Start brokowski as a zeromq XPUB/XSUB proxy on **127.0.0.1**:
```
brokowski.start(/*xsub port*/ 11111, /*xpub port*/ 22222);
```

The default ports are 5000 for XSUB and 5001 for XPUB. They both are **TCP** ports!

### example using [node-zeromq](https://github.com/JustinTulloss/zeromq.node)

Brokowski:
```
require('brokowski').zmq()
  .start(11111, 22222);
```

Subscriber:
```
require('zmq')
  .socket('sub')
  .subscribe('myevent')
  .connect('tcp://127.0.0.1:22222')
  .on('message', function(msg) {
    // handle msg
  });
```

Publisher:
```
require('zmq')
  .socket('pub')
  .connect('tcp://127.0.0.1:11111');
```

## TODO
* publisher, subsciber
* json messages