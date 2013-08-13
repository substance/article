"use strict";

var Node = require("../node");
var _ = require("underscore");

var List = function(node, document) {
  Node.call(this, node, document);
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

};

List.Prototype.prototype = Node.prototype;
List.prototype = new List.Prototype();

Object.defineProperties(List.prototype, {
  level: {
    get: function () {
      return this.properties.level;
    }
  },
  items: {
    get: function () {
      return _.map(this.properties.items, function(i) {
        return this.document.get(i);
      }, this);
    }
  },
  content: {
    get: function () {
      return "just to prevent stuff from breaking";
    }
  },
  length: {
    get: function () {
      return _.reduce(this.items, function(memo, i) {
        return memo + i.content.length;
      }, 0);
    }
  }
});

module.exports = List;
