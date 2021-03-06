'use strict';

describe('The ProcessInstance resource', function() {
  var ProcessInstance;

  it('does not blow when loading', function() {
    expect(function() {
      ProcessInstance = require('./../../../lib/api-client/resources/process-instance');
    }).not.toThrow();
  });


  it('has a `path` static property', function() {
    expect(ProcessInstance.path).toBe('process-instance');
  });


  describe('instance', function() {
    var instance;

    it('does not blow when instanciating', function() {
      expect(function() {
        instance = new ProcessInstance();
      }).not.toThrow();
    });
  });
});
