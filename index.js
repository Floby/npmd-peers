var uuid = require('uuid');


module.exports = Peers

function Peers (callback) {
  callback({
    id: 'npmd:0.0.0:' + uuid.v4()
  });
}
