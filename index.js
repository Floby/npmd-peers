var uuid = require('uuid');
var package = require('./package');


module.exports = Peers

function Peers (options, onReady) {
  if(!onReady) {
    onReady = options;
    options = null;
  }
  options = options || {};
  var version = options.version || package.version;
  onReady({
    id: 'npmd:' + version + ':' + uuid.v4()
  });
}
