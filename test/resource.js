'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('Koapp:generators/resource', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/resource'))
      .withArguments('name')
      .withOptions({ skipInstall: true, force: true })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'routes/names.js',
      'test/routes/names.js',
      'schemas/name.js',
      'test/schemas/name.js'
    ]);
  });
});
