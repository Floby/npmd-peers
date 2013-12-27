var EventEmitter = require('events').EventEmitter;

module.exports = function Discovery(options) {
  var emitter = new EventEmitter();
  var transports = [];
  (options.strategies || ['local']).forEach(function (transport) {
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
  emitter.close = function close(callback) {
    var waiting = 0;
    var error = null;
    for (var i = 0; i < transports.length; ++i) {
      waiting++;
      transports[i].close(onClose);
    }
    function onClose (err) {
      error = error || err;
      if(--waiting === 0) {
        callback(error);
      }
    }
  }
  return emitter;
};
