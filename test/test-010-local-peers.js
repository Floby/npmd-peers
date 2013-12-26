var utils = require('./utils');
var trycatch = require('trycatch');
var expect = require('chai').expect;

var peers = require('../');

describe('two nodes on the same local network', function () {
  var p1;
  var p2;
  var options = {
    strategies: ['local']
  }

  beforeEach(function (done) {
    peers(options, function (p) {
      p1 = p;
      peers(options, function (p) {
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
      }, 20);
    }, done);
  });
})
