var EventEmitter = require('events').EventEmitter;
var polo = require('polo');
var request = require('request');

module.exports = function (peerId, port) {
  var emitter = new EventEmitter();
  var peers = {};
  emitter.get = function (id) {
    return peers[id];
  }
  emitter.close = function (callback) {
    process.nextTick(callback);
  }

  var npmds = polo({monitor: true});

  npmds.on('up', function(name, service) {
    if(name === peerId) return;
    peers[name] = service;
    emitter.emit('up', name, service);
  });

  npmds.put({
    name: peerId,
    port: port,
  });
  return emitter;

};
