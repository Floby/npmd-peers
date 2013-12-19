var trycatch = require('trycatch');
var expect = require('chai').expect;

var peers = require('../');

describe('two nodes', function () {
  var p1;
  var p2;

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
    trycatch(function () {
      setTimeout(function () {
        expect(p1.get(p2.id)).to.be.ok;
        expect(p2.get(p1.id)).to.be.ok;
        done();
      }, 100);
    }, done);
  });
})
