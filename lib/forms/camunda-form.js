'use strict';
/* global CamSDK: false */
var $ = require('./dom-lib'),
    VariableManager = require('./variable-manager'),
    // BaseClass = require('./../base-class'),
    InputFieldHandler = require('./controls/input-field-handler');

function CamundaForm(formElement, options) {
  options = options || {};

  if (options.service) {
    this.service = options.service;
  }
  else {
    this.service = new CamSDK(options.serviceConfig || {});
  }

  if (!options.taskId && !options.processDefinitionId && !options.processDefinitionKey) {
    throw new Error('Dude!? how should I deal with that???');
  }

  this.formElement = formElement;

  this.variableManager = new VariableManager({
    service: this.service
  });

  this.formFieldHandlers = options.formFieldHandlers || [
    InputFieldHandler
  ];

  this.fields = [];

  this.initialize();
}

CamundaForm.prototype.initializeHandler = function(FieldHandler) {
  var self = this;
  var selector = FieldHandler.selector;
  $(selector, self.formElement).each(function() {
    self.fields.push(new FieldHandler(this, self.variableManager));
  });
};

CamundaForm.prototype.initialize = function() {
  for(var FieldHandler in this.formFieldHandlers) {
    this.initializeHandler(this.formFieldHandlers[FieldHandler]);
  }

  var vars = this.variableManager.variables;
  this.fetchVariables(function(err, result) {
    if (err) {
      throw err;
    }


    for (var v in result) {
      if (vars[v]) {
        for (var p in result[v]) {
          vars[v][p] = vars[v][p] || result[v][p];
        }
      }
      else {
        vars[v] = result[v];
      }
    }
  });
};

CamundaForm.prototype.fetchVariables = function(done) {
  done = done || function(){};
  var data = {
    names: this.variableManager.variableNames()
  };

  // pass either the taskId, processDefinitionId or processDefinitionKey
  if (this.taskId) {
    data.id = this.taskId;
    this.service.resource('task').formVariables(data, done);
  }
  else {
    data.id = this.processDefinitionId;
    data.key = this.processDefinitionKey;
    this.service.resource('process-definition').formVariables(data, done);
  }
};

CamundaForm.$ = $;

module.exports = CamundaForm;

