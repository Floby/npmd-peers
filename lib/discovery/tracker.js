var EventEmitter = require('events').EventEmitter;
var natUpnp = require('nat-upnp');
var Tracker = require('node-torrent/lib/tracker');

var trackers = [
  'udp://tracker.openbittorrent.com:80/announce'
];

module.exports = function tracker(peerId, port, address) {
  var emitter = new EventEmitter();
  var peers = {};
  emitter.get = function (id) {
    return peers[id];
  }

  return emitter;
};
