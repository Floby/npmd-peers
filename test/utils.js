var torrentlog4js = require('../node_modules/node-torrent/node_modules/log4js');
torrentlog4js.setGlobalLogLevel('FATAL');

module.exports = {
  createEmptyDb: function (callback) {
    callback()
  },
  clearDb: function (db, callback) {
    callback();
  }
}
