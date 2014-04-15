var util = require('util')
  , _ = require('lodash')
  , EventEmitter = require('events').EventEmitter
  , zmq = require('zmq')
  , WebSocket = require('socket.io').Socket;


util.inherits(ZmqEventEmitter, EventEmitter);
module.exports = ZmqEventEmitter;


function ZmqEventEmitter() {
  EventEmitter.call(this);
}


/**
 * Init ZEE and connect publish socket to the zmq broker.
 */
ZmqEventEmitter.prototype.start = function(xsub, xpub) {
  this.xsub = xsub;
  this.xpub = xpub;
  this.pub = zmq.socket('pub');
  this.pub.connect(xsub);
  this.handlers = {};
  return this;
}


/**
 * Registers given handler for given event.
 */
ZmqEventEmitter.prototype.on = function(event, fn) {
  cacheEventHandler(this.handlers, event, fn);
  createSubSocket(this.xpub, this.handlers, event, fn);
  return this;
}


/**
 * Emits event to the zmq broker.
 */
ZmqEventEmitter.prototype.emit = function(event, data) {
  this.pub.send(event + ' ' + JSON.stringify(data));
}


/**
 * Wraps the given socket.io websocket's emit and on functions so that it will emit events to the zmq broker and handle events coming from the zmq broker.
 */
ZmqEventEmitter.prototype.hug = function(webSocket) {
  var self = this
    , emit = webSocket.emit
    , on = webSocket.on;
  webSocket.emit = function(event, data) {
    self.pub.send(event + ' ' + JSON.stringify(data));
    emit.apply(webSocket, arguments);
  };
  webSocket.on = function(event, fn) {
    self.pub.on(event, fn);
    on.apply(webSocket, arguments);
  };
}


function cacheEventHandler(handlers, event, fn) {
  handlers[event] = handlers[event] || [];
  handlers[event].push(fn);
}


function createSubSocket(xpub, handlers, event, fn) {
  var sub = zmq.socket('sub');
  sub.subscribe(event);
  sub.on('message', function(msg) { handleEvent(handlers, msg); });
  sub.connect(xpub);
}


function handleEvent(handlers, msg) {
  var event = msg.toString().split(' ')[0];
  _.forEach(handlers[event], function(handler) {
    handler(toJson(msg));
  });
}


function toJson(msg) {
  msg = msg.toString();
  var seperatorIdx = msg.indexOf(' ');
  
  if(seperatorIdx < 0) return undefined;

  msg = msg.substr(seperatorIdx + 1, msg.length - 1);
  try {
    return JSON.parse(msg);
  } catch(e) {
    return msg;
  }
}