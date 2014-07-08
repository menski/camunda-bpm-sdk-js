'use strict';

var $ = require('dom-lib'),
    VariableManager = require('./variable-manager'),
    HtmlBinding = require('./html-binding'),
    BaseClass = require('./../base-class'),
    InputFieldHandler = require('./controls/input-field-handler');

var CamundaForm = function(formElement, formFieldHandlers) {

  this.formElement = formElement;

  this.variableManager = new VariableManager();

  this.formFieldHandlers = formFieldHandlers || [
    InputFieldHandler
  ];

  this.fields = [];

};

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
};


module.exports = CamundaForm;

