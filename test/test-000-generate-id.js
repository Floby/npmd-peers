var utils = require('./utils');
var expect = require('chai').expect;
var peers = require('../');
var trycatch = require('trycatch');

describe("one node's id", function () {
  it('should match the pattern npmd:version:uuid', function (done) {
    trycatch(function () {
      peers(function (p) {
        expect(p.id).to.match(/^npmd:0.0.0:[a-f0-9]+(-[a-f0-9]+)+$/);
        done();
      });
    }, done);
  });
  it('should use the semver provided in the options', function (done) {
    trycatch(function () {
      peers({version: '1.0.1'}, function (p) {
        expect(p.id).to.match(/^npmd:1.0.1:[a-f0-9]+(-[a-f0-9]+)+$/);
        done();
      });
    }, done)
  });
});
