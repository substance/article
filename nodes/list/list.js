"use strict";

var _ = require("underscore");
var Document = require("substance-document");

var List = function(node, document) {
  Document.Composite.call(this, node, document);
};

List.type = {
  "parent": "content",
  "properties": {
    "items": ["array", "paragraph"],
    "ordered": "boolean"
  }
};

List.properties = {
  mergeableWith: ["paragraph", "heading"],
  preventEmpty: false,
  splitInto: 'paragraph',
  allowedAnnotations: ["emphasis", "strong", "idea", "question", "error"]
};

List.Prototype = function() {

  this.getNodes = function() {
    return _.clone(this.items);
  };

  this.insertOperation = function(/*charPos, text*/) {
    return null;
  };

  this.deleteOperation = function(/*startChar, endChar*/) {
    return null;
  };

  this.getItems = function() {
    return _.map(this.properties.items, function(id) {
      return this.document.get(id);
    }, this);
  };
};

List.Prototype.prototype = Document.Composite.prototype;
List.prototype = new List.Prototype();
List.prototype.constructor = List;

Document.Node.defineProperties(List.prototype, ["items", "ordered"]);

module.exports = List;
