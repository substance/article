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

  this.getLength = function() {
    var l = 0;
    var items = this.items;
    for (var i = 0; i < items.length; i++) {
      l += items[i].length;
    }
    return l;
  };

  this.mapRange = function(startChar, endChar) {
    var result = [];
    var pos = 0;
    var l;
    var items = this.items;
    for (var i = 0; i < items.length; i++) {
      l = items[i].length;

      if (startChar < pos + l) {
        var res = items[i].mapRange(startChar-pos, endChar-pos);
        if (_.isArray(res)) {
          result.push.apply(result, res);
        } else if (res) {
          result.push(res);
        }
      }
      pos += l;
    }

    return result;
  };

};

List.Prototype.prototype = Node.prototype;
List.prototype = new List.Prototype();
List.prototype.constructor = List;

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
