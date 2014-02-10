var util = require('util')
  , _ = require('lodash')
  , EventEmitter = require('events').EventEmitter
  , zmq = require('zmq')
  , handlers = {};

util.inherits(ZmqEventEmitter, EventEmitter);

module.exports = ZmqEventEmitter;

function ZmqEventEmitter(xsub, xpub) {
  EventEmitter.call(this);

  this.xsub = xsub;
  this.xpub = xpub;
  this.pub = zmq.socket('pub');
  this.pub.connect(xsub);
}

ZmqEventEmitter.prototype.on = function(event, fn) {
  var sub = zmq.socket('sub');

  handlers[event] = handlers[event] || [];
  handlers[event].push(fn);

  sub.subscribe(event);
  sub.on('message', handleEvent);
  sub.connect(this.xpub);
}

ZmqEventEmitter.prototype.emit = function(event, data) {
  this.pub.send(event + ' ' + JSON.stringify(data));
}

function handleEvent(msg) {
  var event = msg.toString().split(' ')[0];
  _.forEach(handlers[event], function(handler) {
    handler(toJson(msg));
  });
}

function toJson(msg) {
  msg = msg.toString()
  msg = msg.substr(msg.indexOf(' ') + 1, msg.length - 1);
  try {
    return JSON.parse(msg);
  } catch(e) {
    return msg;
  }
}