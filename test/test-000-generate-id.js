var expect = require('chai').expect;

var peers = require('../');

describe("one node's id", function () {
  it('should match the pattern npmd:version:uuid', function (done) {
     peers(function (p) {
      expect(p.id).to.match(/^npmd:0.0.0:[a-f0-9]+(-[a-f0-9]+)+$/);
      done();
    });
  });
});