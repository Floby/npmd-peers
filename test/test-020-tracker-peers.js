var utils = require('./utils');
var trycatch = require('trycatch');
var expect = require('chai').expect;
var publicAddress = require('public-address');

var peers = require('../');

return;
describe('two nodes on the internet', function () {
  var p1;
  var p2;
  var publicIp;

  before(function (done) {
    publicAddress(function (err, data) {
      if(err) return done(err)
      publicIp = data.address;
      done();
    });
  })

  beforeEach(function (done) {
    peers(function (p) {
      p1 = p;
      peers(function (p) {
        p2 = p;
        done();
      })
    })
  });

  it('should find each other', function (done) {
    this.timeout(4000);
    trycatch(function () {
      setTimeout(function () {
        expect(p2.get(p1.id)).to.be.ok;
        done();
      }, 2000);
    }, done);
  });
})

