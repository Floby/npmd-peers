var EventEmitter = require('events').EventEmitter;
var package = require('./package');
var uuid = require('uuid');
var polo = require('polo');

module.exports = Peers

function Peers (options, onReady) {
  if(!onReady) {
    onReady = options;
    options = null;
  }
  options = options || {};
  var version = options.version || package.version;

  var peers = {};

  emitter = new EventEmitter();
  emitter.id = 'npmd:' + version + ':' + uuid.v4();
  emitter.get = function (id) {
    return peers[id];
  }

  var npmds = polo({monitor:true});
  npmds.put({
    name: emitter.id,
    port: 8989
  });

  npmds.on('up', function(name, service) {
    peers[name] = service;
  });


  emitter.once('ready', onReady);
  emitter.emit('ready', emitter);
  return emitter;
}
