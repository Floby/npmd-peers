var net = require('net');
var EventEmitter = require('events').EventEmitter;
var package = require('./package');
var uuid = require('uuid');
var polo = require('polo');
var Tracker = require('node-torrent/lib/tracker');
var Torrent = require('node-torrent/lib/torrent');
var Discovery = require('./lib/discovery');

module.exports = Peers

function Peers (options, onReady) {
  if(!onReady) {
    onReady = options || function () {};
    options = null;
  }
  options = options || {};
  var emitter = new EventEmitter();
  var version = options.version || package.version;
  var peerId = 'npmd:' + version + ':' + uuid.v4();
  emitter.id = peerId;

  options.peerId = peerId;
  options.port = 8989;
  var discovery = new Discovery(options);

  emitter.get = function (id) {
    return discovery.get(id);
  }

  emitter.close = function (callback) {
    discovery.close(callback);
  }

  //var tracker = new Tracker('udp://tracker.openbittorrent.com:80/announce');
  //var clientId = (function () {var id = new Buffer(20); id.write('-npmd00-'); return id})();
  //var npmdFakeTorrent = {
    //clientId: clientId,
    //infoHash: new Buffer('6c6d89fe99d8d25f20aaeb3c17beb408dca98841', 'hex'),
    //clientPort: 61873
  //};
  //tracker.setTorrent(npmdFakeTorrent);
  //tracker.start(function (peerId, ip, port) {
    //console.log('got peer', ip, port);
  //})

  emitter.once('ready', onReady);
  emitter.emit('ready', emitter);
  return emitter;
}
