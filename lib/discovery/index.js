var EventEmitter = require('events').EventEmitter;

module.exports = function Discovery(options) {
  var emitter = new EventEmitter();
  var transports = [];
  (options.discovery || ['local']).forEach(function (transport) {
    transport = require('./' + transport);
    transports.push(transport(options.peerId, options.port, options.address));
  });
  emitter.get = function get(id) {
    var result, i = 0;
    do {
      result = transports[i].get(id);
      ++i;
    } while(!result && i<transports.length)
    return result;
  }
  return emitter;
};
