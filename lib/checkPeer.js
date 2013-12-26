var superagent = require('superagent');

module.exports = function checkPeer(peerId, port, host, callback) {
  superagent('http://' + host + ':port')
    .get('/info')
    .end(function (err, body) {
      console.log('message')
    });
};

